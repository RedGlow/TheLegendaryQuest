angular.module('legendarySearch.costs', [
	'supplyCrateApp.gw2api'
])

.directive('costs', [
	        "$q", "GW2API",
	function($q,   GW2API) {
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
				function fill(itemTree, itemCosts, currencyCosts, copperCosts) {
					if(itemTree.cost !== null & !!itemTree.itemId) {
						// cache the copper costs for later consumption
						copperCosts[itemTree.itemId] = itemTree.cost;
					}
					var neededAmount = itemTree.remainingNeededAmount;
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
							fill(ingredient, itemCosts, currencyCosts, copperCosts);
						});
					}
				}
				function splitItems(itemCosts, unbuyableItemCosts, buyableItemCosts, copperCosts) {
					var total = 0;
					jQuery.each(itemCosts, function(id, amount) {
						if(copperCosts[id] !== undefined) {
							buyableItemCosts[id] = Math.ceil(itemCosts[id]);
							total += copperCosts[id] * buyableItemCosts[id];
						} else {
							unbuyableItemCosts[id] = itemCosts[id];
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
					fill($scope.itemTree, itemCosts, currencyCosts, copperCosts);
					totalCost = splitItems(itemCosts, unbuyableItemCosts, buyableItemCosts, copperCosts);
					$scope.totalCost = Math.round(totalCost);
					$scope.buyableItemCosts = jQuery.isEmptyObject(buyableItemCosts) ? null : buyableItemCosts;
					$scope.unbuyableItemCosts = jQuery.isEmptyObject(unbuyableItemCosts) ? null : unbuyableItemCosts;
					$scope.currencyCosts = jQuery.isEmptyObject(currencyCosts) ? null : currencyCosts;
				}
				$scope.$watch('itemTree', reload, true);
			}
		};
	}
])

;