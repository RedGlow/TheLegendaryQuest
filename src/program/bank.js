angular.module('legendarySearch.bank', [
	'legendarySearch.runningRequests'
])

/**
 * A service to access bank (and inventories) contents.
 */
.service('Bank', [
	        "$q", "$http", "RunningRequests",
	function($q,   $http,   RunningRequests) {
		return {
			/**
			 * Get the contents of bank and character inventories.
			 *
			 * @param {string} apiKey - The API key to access bank and character inventories.
			 * @returns {promise<{items, errors}>} - A promise containing an object with two keys: "items" is a map
			 *   between item ids and amount of those items, "errors" is a flag map ("characters": whether there have
			 *   been errors accessing the characters; "inventories": whether there have been errors accessing the
			 *   bank/material/inventories).
			 */
			getFullContent: function(apiKey) {
				var idToAmount = {};
				function addResults(response) {
					var data = !!response.data ? response.data : response;
					jQuery.each(data, function(i, entry) {
						if(entry === null) { return; }
						if(!idToAmount[entry.id]) {
							idToAmount[entry.id] = 0;
						}
						idToAmount[entry.id] += entry.count;
					});
				}
				var errors = {
					"inventories": false,
					"characters": false
				};
				// check capabilities of the token
				return RunningRequests.wrap($http
					.get("https://api.guildwars2.com/v2/tokeninfo?access_token=" + apiKey)
					.then(function(response) {
						var tokenInfo = response.data;
						var promises = [];
						// add inventories
						if(jQuery.inArray("inventories", tokenInfo.permissions) != -1) {
							var bankContent = RunningRequests.wrap($http
								.get("https://api.guildwars2.com/v2/account/bank?access_token=" + apiKey)
								.then(addResults));
							var materialContent = RunningRequests.wrap($http
								.get("https://api.guildwars2.com/v2/account/materials?access_token=" + apiKey)
								.then(addResults));
							promises.push(bankContent);
							promises.push(materialContent);
						} else {
							errors.inventories = true;
						}
						// add characters inventory
						if(jQuery.inArray("characters", tokenInfo.permissions) != -1 &&
							jQuery.inArray("inventories", tokenInfo.permissions) != -1) {
							var charactersBagsPromise = RunningRequests.wrap($http
								.get("https://api.guildwars2.com/v2/characters?access_token=" + apiKey)
								.then(function(response) {
									var characters = response.data;
									return $q.all(jQuery.map(characters, function(character) {
										return RunningRequests.wrap($http
											.get("https://api.guildwars2.com/v2/characters/" + character + "/inventory?access_token=" + apiKey));
									}));
								})).then(function(characterContents) {
									jQuery.each(characterContents, function(i, response) {
										var characterContent = response.data;
										jQuery.each(characterContent.bags, function(j, characterBag) {
											if(!!characterBag) {
												addResults(characterBag.inventory);
											}
										});
									});
								});
							promises.push(charactersBagsPromise);
						} else {
							errors.characters = true;
						}
						return $q.all(promises);
					}))
					.then(function() {
						return {
							items: idToAmount,
							errors: errors
						};
					})
					;
			}
		};
	}
])

;