angular.module('legendarySearch', [
	'supplyCrateApp.gw2api',
	'supplyCrateApp.price-directive'
])

.service('CostComputer', function() {
	return {
		costs: {
			19626: [ // gift of fortune
				{ type: 'item', id: 19675, amount: 77 },
				{ type: 'item', id: 19721, amount: 250 },
				{ type: 'item', id: 19673 },
				{ type: 'item', id: 19672 }
			],
			19662: [ // gift of howler
				{ type: 'item', id: 19622 },
				{ type: 'item', id: 19640},
				{ type: 'item', id: 19676, amount: 100},
				{ type: 'item', id: 24618}
			],
			19667: [ // gift of thorns
				{ type: 'currency', id: 'deadly_bloom', amount: 500 }
			],
			19672: [ // gift of might
				{ type: 'item', id: 24357, amount: 250 },
				{ type: 'item', id: 24289, amount: 250 },
				{ type: 'item', id: 24351, amount: 250 },
				{ type: 'item', id: 24358, amount: 250 }
			],
			19673: [ // gift of magic
				{ type: 'item', id: 24295, amount: 250 },
				{ type: 'item', id: 24283, amount: 250 },
				{ type: 'item', id: 24300, amount: 250 },
				{ type: 'item', id: 24277, amount: 250 }
			],
			19674: [ // gift of mastery
				{ type: 'item', id: 20797 },
				{ type: 'item', id: 19925, amount: 250},
				{ type: 'item', id: 19677},
				{ type: 'item', id: 19678}
			],
			19675: [ // mystic clover
				{ type: 'item', id: 19925},
				{ type: 'item', id: 19976},
				{ type: 'item', id: 19721},
				{ type: 'item', id: 20796, amount: 2},
			],
			19676: [ // icy runestone
				{type: 'currency', id: 'copper', amount: 10000}
			],
			19678: [ // gift of battle
				{type: 'currency', id: 'badge_of_honor', amount: 500}
			],
			19925: [ // obsidian shard
				{type: 'currency', id: 'karma', amount: 2100}
			],
			20796: [ // philosopher's stone
				{type: 'currency', id: 'spirit_shard', amount: 0.1}
			],
			20797: [ // bloodstone shard
				{type: 'currency', id: 'spirit_shard', amount: 200}
			],
			19623: [ // gift of energy
				{type: 'item', id: 24274, amount: 250},
				{type: 'item', id: 24275, amount: 250},
				{type: 'item', id: 24276, amount: 250},
				{type: 'item', id: 24277, amount: 250},
			],
			19621: [ // gift of metal
				{type: 'item', id: 19686, amount: 250},
				{type: 'item', id: 19681, amount: 250},
				{type: 'item', id: 19684, amount: 250},
				{type: 'item', id: 19685, amount: 250},
			],
			19622: [ // gift of wood
				{type: 'item', id: 19714, amount: 250},
				{type: 'item', id: 19711, amount: 250},
				{type: 'item', id: 19709, amount: 250},
				{type: 'item', id: 19712, amount: 250},
			],
			19638: [ // gift of color
				{type: 'item', id: 19669, amount: 1},
				{type: 'item', id: 20323, amount: 100},
				{type: 'item', id: 24277, amount: 250},
				{type: 'item', id: 24522, amount: 100}
			],
			19639: [ // gift of lightning
				{type: 'item', id: 19664, amount: 1},
				{type: 'item', id: 19685, amount: 250},
				{type: 'item', id: 19746, amount: 250},
				{type: 'item', id: 24305, amount: 100}
			],
			19628: [ // unicorn statue
				{type: 'item', id: 19667, amount: 1},
				{type: 'item', id: 19685, amount: 250},
				{type: 'item', id: 24512, amount: 100},
				{type: 'item', id: 24522, amount: 100}
			],
			19629: [ // gift of history
				{type: 'item', id: 19664, amount: 1},
				{type: 'item', id: 19737, amount: 250},
				{type: 'item', id: 24277, amount: 250},
				{type: 'item', id: 24310, amount: 100}
			],
			19669: [ // gift of zhaitan
				{type: 'currency', id: 'shard_of_zhaitan', amount: 500}
			],
			19664: [
				{type: 'currency', id: 'ascalonian_tear', amount: 500}
			],
			19654: [ // gift of the bifrost
				{type: 'item', id: 19623, amount: 1},
				{type: 'item', id: 19638, amount: 1},
				{type: 'item', id: 19676, amount: 100},
				{type: 'item', id: 24572, amount: 1},
			],
			19655: [ // gift of bolt
				{type: 'item', id: 19621, amount: 1},
				{type: 'item', id: 19639, amount: 1},
				{type: 'item', id: 19676, amount: 100},
				{type: 'item', id: 24554, amount: 1},
			],
			19660: [ // gift of the dreamer
				{type: 'item', id: 19622, amount: 1},
				{type: 'item', id: 19628, amount: 1},
				{type: 'item', id: 19676, amount: 100},
				{type: 'item', id: 24571, amount: 1},
			],
			19653: [ // gift of the flameseeker prophecies
				{type: 'item', id: 19621, amount: 1},
				{type: 'item', id: 19629, amount: 1},
				{type: 'item', id: 19676, amount: 100},
				{type: 'item', id: 24601, amount: 1},
			],
			30702: [ // howler
				{type: 'item', id: 29184},
				{type: 'item', id: 19662},
				{type: 'item', id: 19626},
				{type: 'item', id: 19674}
			],
			30698: [ // the bifrost
				{type: 'item', id: 29180},
				{type: 'item', id: 19654},
				{type: 'item', id: 19626},
				{type: 'item', id: 19674},
			],
			30699: [ // bolt
				{type: 'item', id: 29181},
				{type: 'item', id: 19655},
				{type: 'item', id: 19626},
				{type: 'item', id: 19674},
			],
			30686: [ // the dreamer
				{type: 'item', id: 29178},
				{type: 'item', id: 19660},
				{type: 'item', id: 19626},
				{type: 'item', id: 19674},
			],
			30696: [ // the flameseeker prophecies
				{type: 'item', id: 29177},
				{type: 'item', id: 19653},
				{type: 'item', id: 19626},
				{type: 'item', id: 19674},
			]
		},
		legendaryIds: [
			30702,
			30698,
			30699,
			30686,
			30696
		]
	};
})

.service('GW2APIFinder', [
	        "$q", "$http",
	function($q,   $http) {
		var cache = {};
		return {
			getRecipeFromOutput: function(id) {
				if(!!cache[id]) {
					return $q.when(cache[id]);
				}
				var url = "https://api.guildwars2.com/v2/recipes/search?output=" + id;
				return $http.get(url).then(function(response) {
					cache[id] = response.data;
					return cache[id];
				});
			}
		};
	}
])

.service('RecipeComputer', [
	        "$q", "GW2API", "GW2APIFinder", "CostComputer",
	function($q,   GW2API,   GW2APIFinder,   CostComputer) {
		return {
			getRecipe: function(itemId) {
				// get out implicit recipes
				var recipe = CostComputer.costs[itemId];
				// get out api recipes, if we have no other recipe
				if(!recipe) {
					return GW2APIFinder
						.getRecipeFromOutput(itemId)
						.then(function(recipeIds) {
							if(recipeIds.length == 0) {
								return $q.reject("No recipe found");
							}
							var recipeId = recipeIds[0];
							return GW2API.getRecipe(recipeId);
						})
						.then(function(recipe) {
							return jQuery.map(recipe.ingredients, function(entry) {
								return {
									type: 'item',
									id: entry.item_id,
									amount: entry.count
								};
							});
						});
				} else {
					return $q.when(recipe);
				}
			}
		};
	}
])

.service('BankService', [
	        "$q", "$http",
	function($q,   $http) {
		return {
			getFullBankContent: function(apiKey) {
				var bankContent = $http.get("https://api.guildwars2.com/v2/account/bank?access_token=" + apiKey);
				var materialContent = $http.get("https://api.guildwars2.com/v2/account/materials?access_token=" + apiKey);
				return $q.all([bankContent, materialContent])
					.then(function(responses) {
						var idToAmount = {};
						jQuery.each(responses, function(j, response) {
							var data = response.data;
							jQuery.each(data, function(i, entry) {
								if(entry === null) { return; }
								if(!idToAmount[entry.id]) {
									idToAmount[entry.id] = 0;
								}
								idToAmount[entry.id] += entry.count;
							});
						});
						return idToAmount;
					});
			}
		};
	}
])

.service('FullRecipeComputer', [
	        "$q", "GW2API", "RecipeComputer",
	function($q,   GW2API,   RecipeComputer) {
		return {
			getRecipeTree: function(rootItemId, bankContent, buyImmediately) {
				// default dict operations: increment amount, get a value
				function add(dict, key, value) {
					if(!dict[key]) {
						dict[key] = 0;
					}
					dict[key] += value;
				}
				function get(dict, key) {
					if(!dict[key]) {
						dict[key] = 0;
					}
					return dict[key];
				}
				
				// local bankContent copy
				bankContent = jQuery.extend({}, bankContent);
				function getRecipe(itemId, amount) {
					// check what we can get from the bank
					var ownedAmount = Math.min(amount, get(bankContent, itemId));
					bankContent[itemId] -= ownedAmount;
					if(ownedAmount == amount) {
						// we already own enough
						return $q.when({
							itemId: itemId,
							amount: amount,
							ownedAmount: ownedAmount,
							cost: null,
							ingredients: []
						});
					}
					// get the recipe promise for this element
					var recipePromise = RecipeComputer
						.getRecipe(itemId)
						.then(function(result) { return result; },
							function(error) { return null; });
					// get the cost promise of this element
					var costPromise = GW2API
						.getListing(itemId)
						.then(function(result) { return result; },
							function(error) { return {id: itemId, buys: [], sells: []}; });
					// run them
					return $q.all([recipePromise, costPromise]).then(function(results) {
						var recipeResult = results[0],
							listing = results[1];
						// analyze the cost
						var cost = null;
						if(buyImmediately && listing.sells.length > 0) {
							cost = listing.sells[0].unit_price;
						} else if(!buyImmediately && listing.buys.length > 0) {
							cost = listing.buys[0].unit_price;
						}
						// analyze the recipe
						var ingredientsPromises;
						if(recipeResult !== null) {
							//recipeResult = []; // DEBUG
							ingredientsPromises = $q.all(jQuery.map(recipeResult, function(ingredient) {
								var iid = ingredient.id,
									iamount = ingredient.amount || 1;
								if(ingredient.type === 'item') {
									return getRecipe(parseInt(iid), iamount);
								} else {
									return $q.when({
										currencyId: ingredient.id,
										amount: iamount,
										ownedAmount: 0, // TODO: wait for wallet api
										cost: null,
										ingredients: []
									});
								}
							}));
						} else {
							ingredientsPromises = $q.when(null);
						}
						// return the analysis result
						return $q.all([ingredientsPromises, $q.when(cost)]);
					}).then(function(results) {
						var ingredientsResults = results[0],
							costResult = results[1];
						// check if it's worth crafting through the ingredients
						var ingredientsCost = 0;
						if(ingredientsResults !== null) {
							jQuery.each(ingredientsResults, function(i, ingredient) {
								if(ingredient.cost === null) {
									ingredientsCost = null;
									return false;
								}
								ingredientsCost += ingredient.cost;
							});
						}
						if(ingredientsResults === null || (ingredientsCost !== null && costResult !== null && ingredientsCost > costResult)) {
							// not worth it: let's skip ingredients
							return {
								itemId: itemId,
								amount: amount,
								ownedAmount: ownedAmount,
								cost: costResult,
								ingredients: []
							};
						} else {
							// worth it: keep them
							return {
								itemId: itemId,
								amount: amount,
								ownedAmount: ownedAmount,
								cost: costResult,
								ingredients: ingredientsResults
							};
						}
					});
				}
				return getRecipe(rootItemId, 1);
			}
		};
	}
])

.directive('item', function() {
	return {
		restrict: 'E',
		templateUrl: 'item.html',
		scope: {
			itemId: '=',
			amount: '=',
			buyImmediately: '='
		},
		controller: function($scope, GW2API) {
			$scope.$watch('itemId', function() {
				if(!$scope.itemId) { return; }
				GW2API.getItem(parseInt($scope.itemId)).then(function(item) {
					$scope.item = item;
				});
			});
		}
	}
})

.directive('itemTable', [
	        "$templateCache", "$compile", "GW2API",
	function($templateCache,   $compile,   GW2API) {
		return {
			restrict: 'E',
			scope: {
				itemTree: '=',
				buyImmediately: '='
			},
			link: function(scope, element, attrs) {
				var content = $templateCache.get('item-table-directive.html');
				scope.open = false;
				scope.toggle = function($event) {
					scope.open = !scope.open;
					$event.preventDefault();
				}
				if(!!scope.itemTree) {
					element.append(content);
					$compile(element.contents())(scope.$new());
				}
			}
		};
	}
])

.directive('convertToBoolean', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return val == "true" ? true : val == "false" ? false : null;
            });
            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
})

.directive('costs', [
	        "$q", "GW2API", "RecipeComputer",
	function($q,   GW2API,   RecipeComputer) {
		return {
			restrict: 'E',
			scope: {
				itemTree: '='
			},
			templateUrl: 'costs-directive.html',
			controller: function($scope) {
				function add(dict, key, amount) {
					if(!dict[key]) {
						dict[key] = 0;
					}
					dict[key] += amount;
				}
				function fill(itemTree, amountMultiplier, itemCosts, currencyCosts, copperCosts) {
					if(itemTree.cost !== null & !!itemTree.itemId) {
						copperCosts[itemTree.itemId] = itemTree.cost;
					}
					var neededAmount = amountMultiplier * (itemTree.amount - itemTree.ownedAmount);
					if(neededAmount == 0) {
						return;
					}
					if(!itemTree.ingredients || itemTree.ingredients.length == 0) {
						if(!!itemTree.itemId) {
							add(itemCosts, itemTree.itemId, neededAmount);
						} else {
							add(currencyCosts, itemTree.currencyId, neededAmount);
						}
					} else {
						jQuery.each(itemTree.ingredients, function(i, ingredient) {
							fill(ingredient, neededAmount, itemCosts, currencyCosts, copperCosts);
						});
					}
				}
				function splitItems(itemCosts, unbuyableItemCosts, buyableItemCosts, copperCosts) {
					var total = 0;
					jQuery.each(itemCosts, function(id, amount) {
						if(copperCosts[id] !== undefined) {
							buyableItemCosts[id] = itemCosts[id];
							total += copperCosts[id] * itemCosts[id];
						} else {
							unbuyableItemCosts[id] = itemCosts[id]
						}
					});
					return total;
				}
				function reload() {
					var itemCosts = {},
						currencyCosts = {},
						copperCosts = {},
						unbuyableItemCosts = {},
						buyableItemCosts = {},
						totalCost;
					fill($scope.itemTree, 1, itemCosts, currencyCosts, copperCosts);
					totalCost = splitItems(itemCosts, unbuyableItemCosts, buyableItemCosts, copperCosts);
					$scope.totalCost = totalCost;
					$scope.buyableItemCosts = jQuery.isEmptyObject(buyableItemCosts) ? null : buyableItemCosts;
					$scope.unbuyableItemCosts = jQuery.isEmptyObject(unbuyableItemCosts) ? null : unbuyableItemCosts;
					$scope.currencyCosts = jQuery.isEmptyObject(currencyCosts) ? null : currencyCosts;
				}
				$scope.$watch('itemTree', reload, true);
			}
		};
	}
])

.controller('ls.Map', [
	        "$scope", "$q", "GW2API", "CostComputer", "BankService", "FullRecipeComputer",
	function($scope,   $q,   GW2API,   CostComputer,   BankService,   FullRecipeComputer) {
		// initialize legendary list
		var availableLegendariesIds = CostComputer.legendaryIds;
		$q.all(jQuery.map(availableLegendariesIds, function(legendaryId) {
			return GW2API.getItem(legendaryId).then(function(legendary) {
				return {name: legendary.name, id: legendary.id};
			})
		})).then(function(availableLegendaries) {
			$scope.availableLegendaries = availableLegendaries;
		});
		$scope.selectedLegendary = null;
		
		// initialize TP management
		$scope.buyImmediately = true;
		
		// bank management
		$scope.apiKeyTemp = "";
		$scope.$watch('apiKey', function() {
			if(!$scope.apiKey) { return; }
			BankService.getFullBankContent($scope.apiKey).then(function(bankContent) {
				$scope.bankContent = bankContent;
			})
		});
		
		// load cost tree
		function reloadTree() {
			if(!$scope.selectedLegendary || $scope.buyImmediately === null) {
				return;
			}
			FullRecipeComputer
				.getRecipeTree($scope.selectedLegendary, $scope.bankContent || {}, $scope.buyImmediately)
				.then(function(data) {
					$scope.costTree = data;
				}, function(error) {
					alert("Cost tree error:", error);
				});
		}
		$scope.$watch('bankContent', reloadTree);
		$scope.$watch('selectedLegendary', reloadTree);
		$scope.$watch('buyImmediately', reloadTree);
		
		// num running requests
		$scope.$watch(function() {
			return GW2API.getNumRunningRequests();
		}, function(newValue) {
			$scope.numRunningRequests = newValue;
		});
	}
])

;