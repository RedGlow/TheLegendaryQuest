angular.module('legendarySearch.bankService', [
	'legendarySearch.runningRequests'
])

.service('BankService', [
	        "$q", "$http", "RunningRequests",
	function($q,   $http,   RunningRequests) {
		return {
			getFullBankContent: function(apiKey) {
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
				RunningRequests.startRequest();
				return $http
					.get("https://api.guildwars2.com/v2/tokeninfo?access_token=" + apiKey)
					.then(function(response) {
						RunningRequests.endRequest();
						var tokenInfo = response.data;
						var promises = [];
						// add inventories
						if(jQuery.inArray("inventories", tokenInfo.permissions) != -1) {
							RunningRequests.startRequest();
							var bankContent = $http
								.get("https://api.guildwars2.com/v2/account/bank?access_token=" + apiKey)
								.then(addResults)["finally"](RunningRequests.finallyEndRequest);
								RunningRequests.startRequest();
							var materialContent = $http
								.get("https://api.guildwars2.com/v2/account/materials?access_token=" + apiKey)
								.then(addResults)["finally"](RunningRequests.finallyEndRequest);
							promises.push(bankContent);
							promises.push(materialContent);
						} else {
							errors["inventories"] = true;
						}
						// add characters inventory
						if(jQuery.inArray("characters", tokenInfo.permissions) != -1 &&
							jQuery.inArray("inventories", tokenInfo.permissions) != -1) {
							RunningRequests.startRequest();
							var charactersBagsPromise = $http
								.get("https://api.guildwars2.com/v2/characters?access_token=" + apiKey)["finally"](RunningRequests.finallyEndRequest)
								.then(function(response) {
									var characters = response.data;
									return $q.all(jQuery.map(characters, function(character) {
										RunningRequests.startRequest();
										return $http
											.get("https://api.guildwars2.com/v2/characters/" + character + "/inventory?access_token=" + apiKey)["finally"](RunningRequests.finallyEndRequest);
									}));
								}, RunningRequests.failEndRequest).then(function(characterContents) {
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
							errors["characters"] = true;
						}
						return $q.all(promises);
					})["finally"](RunningRequests.finallyEndRequest)
					.then(function() {
						return {
							items: idToAmount,
							errors: errors
						};
					});
					;
			}
		};
	}
])

;