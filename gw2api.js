angular.module('supplyCrateApp.gw2api', [
    'supplyCrateApp.now'
])

.config(['$logProvider', function($logProvider) {
    $logProvider.debugEnabled(true);
}])

.provider('GW2API', function() {
    var provider = this;
    // items entries last one day by default
    provider.itemsEntrySecondsDuration = 60 * 60 * 24;
    // recipes last long too
    provider.recipesEntrySecondsDuration = 60 * 60 * 24;
    // listings last for a much shorter time
    provider.listingsEntrySecondsDuration = 60;
    // timeout delay
    provider.timeoutDelay = 250;


    this.$get = function($q, $http, $log, $timeout, Now) {
        /**
         * This structure holds the data about the different kind of requests we can
         * make to the GW2 API, its endpoints, the enqueued requests, and the
         * caching system.
         * The top-level structure is the following:
         * { <key>: <data> }
         * Where <key> is either "items" (requests to get items data) and "listings"
         * (requests to get listings).
         * Each entry (<data>) has these entries:
         * - queue: an associative array {<ID> : <deferreds>} between IDs to resolve
         *       and an array of "deferred" which must be called when the entry is
         *       ready.
         * - queued: same as queue, but entries get moved in here once the request
         *      to the API has already been performed, but before the results have
         *      arrived. this change is useful to add new requests in this second
         *      queue if they are asked in the between time but correspond to some
         *      entry already present.
         * - timerIsStarted: whether a timer has already been started. this timer
         *      will process all the queued entries with a single call once started
         *      off.
         * - endpoint: the endpoint to send a request for the data. static.
         * - entrySecondsDuration: duration of a cache entry. static.
         * - cache: an associative array structured like this:
         *      { <ID>:
         *          { "value": <value>,
         *            "timestamp": <timestamp>,
         *            "isRejection": <whether this was a reject or not> }
         *      }
         *      Where <ID> is the ID of the entry, <value> is the cached entry, and
         *      <timestamp> is a Date object produced at the moment of the entry
         *      creation.
         */
        function produceRequestsEntry(entrySecondsDuration, endpoint) {
            return {
                queue: {},
                queued: {},
                cache: {},
                entrySecondsDuration: entrySecondsDuration,
                timerIsStarted: false,
                endpoint: endpoint
            };
        }
		var numRunningRequests = 0;
        var requests = {
            items: produceRequestsEntry(
                provider.itemsEntrySecondsDuration,
                "https://api.guildwars2.com/v2/items"),
            listings: produceRequestsEntry(
                provider.listingsEntrySecondsDuration,
                "https://api.guildwars2.com/v2/commerce/listings"),
            recipes: produceRequestsEntry(
                provider.recipesEntrySecondsDuration,
                "https://api.guildwars2.com/v2/recipes"),
        };

        function runRequests(key) {
            // timer has been resolved
            var request = requests[key];
            request.timerIsStarted = false;

            // move requests from "queue" to "queued", and clean "queue"
            var queueIds = Object.keys(request.queue);
            for(var i = 0; i < queueIds.length; i++) {
                var id = queueIds[i];
                var deferreds = request.queue[id];
                request.queued[id] = [];
                Array.prototype.push.apply(request.queued[id], deferreds);
            }
            request.queue = {};

            // launch http get
            var ids = queueIds.join(",");
            var url = request.endpoint + "?ids=" + ids;
            $http
                .get(url)
                .then(function(response) {
                    // send results to the registered promises
                    var data = response.data;
                    var now = Now.value();
                    // first add caches, then process the promises. this is done in
                    // order to avoid that the answer to the promise asks for an
                    // item which we got right now, and a new call is enqueued
                    // because its entry wasn't yet added to the cache
                    var i, item, id;
                    for(i = 0; i < data.length; i++) {
                        item = data[i];
                        id = item.id;
                        request.cache[id] = {
                            timestamp: now,
                            value: item,
							isRejection: false
                        };
                    }
                    for(i = 0; i < data.length; i++) {
                        item = data[i];
                        id = item.id;
                        var queueRow = request.queued[id];
                        for(var j = 0; j < queueRow.length; j++) {
                            queueRow[j].resolve(item);
							numRunningRequests--;
                        }
                        delete request.queued[id];
						for(var k = 0; k < ids.length; k++) {
							var queueId = queueIds[k];
							if(queueId == id) {
								break;
							}
						}
						queueIds.splice(k, 1);
                    }
					for(i = 0; i < queueIds.length; i++) {
						var queueId = queueIds[i];
						var queueRow = request.queued[queueId];
						var returnValue = {
							"text": "all ids provided are invalid"
						};
						request.cache[queueId] = {
							timestamp: now,
							value: returnValue,
							isRejection: true
						};
                        for(var j = 0; j < queueRow.length; j++) {
                            queueRow[j].reject(returnValue);
							numRunningRequests--;
                        }
                        delete request.queued[queueId];
					}
                }, function(err) {
					// all values are invalid
                    var now = Now.value();
					for(var i = 0; i < queueIds.length; i++) {
						var queueId = queueIds[i];
						var queueRow = request.queued[queueId];
						var returnValue = {
							"text": "all ids provided are invalid"
						};
						request.cache[queueId] = {
							timestamp: now,
							value: returnValue,
							isRejection: true
						};
                        for(var j = 0; j < queueRow.length; j++) {
                            queueRow[j].reject(returnValue);
							numRunningRequests--;
                        }
                        delete request.queued[queueId];
					}
				});
        }

        function isInt(value) {
            return !isNaN(value) &&
                parseInt(Number(value)) === value &&
                !isNaN(parseInt(value, 10));
        }

        function enqueue(key, id) {
            // check input
            if(!isInt(id)) {
                return $q.reject("Not an id:", id);
            }
            id = parseInt(id);

            // check cache
            var request = requests[key];
            var cacheEntry = request.cache[id];
            if(cacheEntry !== undefined) {
                // we have a cache entry: check if it's not too old
                var cacheDate = cacheEntry.timestamp;
                var delta = ((Now.value()) - cacheDate) / 1000;
                if(delta <= request.entrySecondsDuration) {
                    // not too old: we can return it
					if(!cacheEntry.isRejection) {
						return $q.when(cacheEntry.value);
					} else {
						return $q.reject(cacheEntry.value);
					}
                } else {
                    // remove the entry to clean up some space
                    delete request.cache[id];
                }
            }

            // cache entry not present / too old: continue
            var deferred = $q.defer();
			numRunningRequests++;

            // check if the call is already queued
            var queuedEntry = request.queued[id];
            if(queuedEntry !== undefined) {
                // yes: just add this deferred for when the http call returns
                queuedEntry.push(deferred);
            } else {
                // no: add to the queue
                // create the queue for this ID if not already present
                if(request.queue[id] === undefined) {
                    request.queue[id] = [];
                }

                // add our deferred
                request.queue[id].push(deferred);

                // if the timer hasn't already started, do it now
                if(!request.timerIsStarted) {
                    $timeout(function() { runRequests(key); }, provider.timeoutDelay);
                    request.timerIsStarted = true;
                }
            }

            // return the promise that will be satisfied upon resolution
            return deferred.promise;
        }

        return {
            getItem: function(id) {
                return enqueue('items', id);
            },
            getListing: function(id) {
                return enqueue('listings', id);
            },
            getRecipe: function(id) {
                return enqueue('recipes', id);
            },
			getNumRunningRequests: function() {
				return numRunningRequests;
			}
        };
    };

    return this;
})

;
