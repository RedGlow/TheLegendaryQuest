angular.module('legendarySearch.bank', [
	'redglow.gw2api'
])

/**
 * A service to access bank (and inventories) contents.
 */
.service('Bank', [
	        "$q", "GW2API",
	function($q,   GW2API) {
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
					if(!response) { return; }
					var data = !!response.data ? response.data : response;
					jQuery.each(data, function(i, entry) {
						if(entry === null) { return; }
						if(!entry.id) { return; }
						if(!idToAmount[entry.id]) {
							idToAmount[entry.id] = 0;
						}
						var count = entry.count === undefined ? 1 : entry.count;
						idToAmount[entry.id] += count;
					});
				}
				var errors = {
					"inventories": false,
					"characters": false
				};
				// check capabilities of the token
				return GW2API.getTokenInfo(apiKey)
					.then(function(tokenInfo) {
						var promises = [];
						// add inventories
						if(jQuery.inArray("inventories", tokenInfo.permissions) != -1) {
							var bankContent = GW2API.getBank(apiKey).then(addResults);
							var materialContent = GW2API.getMaterials(apiKey).then(addResults);
							promises.push(bankContent);
							promises.push(materialContent);
						} else {
							errors.inventories = true;
						}
						// add characters inventory
						if(jQuery.inArray("characters", tokenInfo.permissions) != -1 &&
							jQuery.inArray("inventories", tokenInfo.permissions) != -1) {
							var charactersBagsPromise = GW2API
								.getCharacters(apiKey)
								.then(function(characters) {
									return $q.all(jQuery.map(characters, function(character) {
										return GW2API.getCharacter(character, apiKey);
									}));
								}).then(function(characterContents) {
									jQuery.each(characterContents, function(i, characterContent) {
										addResults(characterContent.equipment);
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
					})
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