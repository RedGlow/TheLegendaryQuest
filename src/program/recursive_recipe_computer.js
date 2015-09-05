angular.module('legendarySearch.recursiveRecipeComputer', [
	'redglow.gw2api',
	'legendarySearch.recipeCompanion'
])

/**
 * A service that produce all the costs for a recipe, recursively resolving the
 * costs of ingredients and producing a tree of recipes.
 * This service is the central service of the whole program, and uses the recipe and
 * listings functions in order to produce the data used by the interface.
 */
.service('RecursiveRecipeComputer', [
	        "$q", "GW2API", "RecipeCompanion",
	function($q,   GW2API,   RecipeCompanion) {
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

		// sort the total costs, remove unneeded trading post costs, and
		// compute rounded percentages.
		function perfectNode(node) {
			node.totalCosts.sort(function(c1, c2) {
				function getValue(c) {
					if(!!c.itemId) {
						return [1, c.itemId];
					} else if(c.currencyId !== 'copper') {
						return [2, c.currencyId];
					} else {
						return [3];
					}
				}
				var v1 = getValue(c1),
					v2 = getValue(c2);
				return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
			});
			jQuery.each(node.totalCosts, function(i, cost) {
				cost.amount = Math.ceil(cost.amount);
			});
			if(node.totalCosts.length === 0) {
				// we don't need anything more for this node, so skip it
				node.tradingPostCost = null;
			}
			var consideredCraftingItemIds = [];
			for(var i = 0; i < node.crafters.length; i++) {
				var itemId = node.crafters[i].itemId;
				if(consideredCraftingItemIds.indexOf(itemId) == -1) {
					consideredCraftingItemIds.push(itemId);
				} else {
					node.crafters.splice(i, 1);
					i--;
				}
			}
			node.roundedPercentage = Math.round(node.percentage * 100);
			return node;
		}

		return {
			// ownedAmount: the amount of this item in the bank we could use for this node
			// unitaryRecipeAmount: the amount needed to produce one of these items using the recipe
			// remainingNeededAmount: the amount still needed to complete the amount needed for this node
			/**
			 * Gets the recipe tree for an item.
			 * @param {int} rootItemId - The item id of the root of the recipe tree.
			 * @param {{id: amount}} bankContent - A map between item ids and the amount of such
			 *   items in the bank / material storage / character inventories.
			 * @param {boolean} buyImmediately - Whether the ingredients will be immediately
			 *   bought or not.
			 * @returns {recipeItem} - The root of the recipe tree. Each entry has various keys.
			 *   itemId: the id of the item; unitaryRecipeAmount: the amount needed to produce
			 *   one of the parent items using the recipe; ownedAmount: the amount of this item
			 *   in the bank we could use for this node; remainingNeededAmount: the amount still
			 *   needed to complete the amount needed for this node; tradingPostCost: the cost of this item
			 *   in the TP according to the given buy strategy; ingredients: a list of recipeItem
			 *   used to create this item (leaves of this node in the tree); totalCosts: a list of objects
			 *   representing the total cost of this branch; each object contains either a key "itemId" (the
			 *   ingredient is an item) or "currencyId" (the ingredient is a currency) and a key "amount"
			 *   (the quantity); percentage: a number (between 0 and 1) representing how much of this node
			 *   has been completed, also considering the ingredients.
			 */
			getRecipeTree: function(rootItemId, bankContent, buyImmediately) {
				// local bankContent copy
				bankContent = jQuery.extend({}, bankContent);
				function getRecipe(itemId, unitaryRecipeAmount, remainingNeededAmount, isRootNode) {
					// check what we can get from the bank
					var ownedAmount = Math.min(remainingNeededAmount, get(bankContent, itemId));
					bankContent[itemId] -= ownedAmount;
					remainingNeededAmount -= ownedAmount;
					if(remainingNeededAmount === 0) {
						// we already own enough
						return $q.when(perfectNode({
							itemId: itemId,
							unitaryRecipeAmount: unitaryRecipeAmount,
							remainingNeededAmount: remainingNeededAmount,
							ownedAmount: ownedAmount,
							tradingPostCost: null,
							ingredients: [],
							totalCosts: [],
							percentage: 1,
							crafters: [],
							recipeItemIds: []
						}));
					}
					// get the recipe promise for this element
					var recipePromise = RecipeCompanion
						.getRecipeFromOutputId(itemId)
						.then(function(result) { return result; },
							function(error) { return null; });
					// get the cost promise of this element
					var tradingPostCostPromise = GW2API
						.getListing(itemId)
						.then(function(result) { return result; },
							function(error) {
								if(!!error.text && error.text == "no such id") {
									return {id: itemId, buys: [], sells: []};
								} else {
									return $q.reject(error);
								}
							});
					// run them
					return $q.all([recipePromise, tradingPostCostPromise]).then(function(results) {
						var recipeResult = results[0],
							listing = results[1];
						// analyze the tradingPostCost
						var tradingPostCost = null;
						if(buyImmediately && listing.sells.length > 0) {
							tradingPostCost = listing.sells[0].unit_price;
						} else if(!buyImmediately && listing.buys.length > 0) {
							tradingPostCost = listing.buys[0].unit_price;
						}
						// analyze the recipe
						var ingredientsPromises,
							crafter,
							recipeItemId;
						if(recipeResult !== null) {
							crafter = recipeResult.crafter;
							recipeItemId = recipeResult.recipeItemId;
							ingredientsPromises = $q.all(jQuery.map(recipeResult.ingredients, function(ingredient) {
								var iid = ingredient.id,
									iamount = ingredient.amount || 1,
									iRemainingNeededAmount = iamount * remainingNeededAmount;
								if(ingredient.type === 'item') {
									return getRecipe(parseInt(iid), iamount, iRemainingNeededAmount, false);
								} else {
									return $q.when(perfectNode({
										currencyId: ingredient.id,
										unitaryRecipeAmount: iamount,
										remainingNeededAmount: iRemainingNeededAmount,
										ownedAmount: 0, // TODO: wait for wallet api
										tradingPostCost: null,
										ingredients: [],
										totalCosts: [{
											amount: iRemainingNeededAmount,
											currencyId: ingredient.id
										}],
										percentage: 0, // TODO: wait for wallet api
										crafters: [],
										recipeItemIds: []
									}));
								}
							}));
						} else {
							crafter = null;
							recipeItemId = null;
							ingredientsPromises = $q.when(null);
						}
						// return the analysis result
						return $q.all([ingredientsPromises, $q.when(tradingPostCost), $q.when(crafter), $q.when(recipeItemId)]);
					}).then(function(results) {
						// sum all recipe item ids
						var recipeItemIds = [];
						if(!!results[3]) {
							recipeItemIds.push(results[3]);
						}
						var ingredientsResults = results[0];
						if(!!ingredientsResults) {
							jQuery.each(ingredientsResults, function(i, ingredient) {
								Array.prototype.push.apply(recipeItemIds, ingredient.recipeItemIds);
							});
						}
						recipeItemIds = recipeItemIds.filter(function(value, index, arr) {
							return arr.indexOf(value) == index;
						});
						results[3] = recipeItemIds;
						// add recipe item ids to the recipe, if root node
						if(isRootNode) {
							return $q.all(jQuery.map(recipeItemIds, function(recipeItemId) {
								return getRecipe(recipeItemId, 1, 1);
							})).then(function(recipeNodes) {
								console.debug("Extending", results[0], "with", recipeNodes);
								Array.prototype.push.apply(results[0], recipeNodes);
								return results;
							});
						} else {
							// not the root node: return the result directly
							return results;
						}
					}).then(function(results) {
						var ingredientsResults = results[0],
							tradingPostCostResult = results[1],
							crafters = [],
							recipeItemIds = results[3];
						if(!!results[2]) {
							var crafter = results[2];
							crafter.itemId = itemId;
							crafters.push(crafter);
						}
						// compute the summed up total costs and completion percentage
						var totalCosts = [];
						var percentage = ownedAmount / (ownedAmount + remainingNeededAmount);
						if(!!ingredientsResults) {
							// total costs
							var totalCostsCurrencyMap = {},
								totalCostsItemMap = {};
							jQuery.each(ingredientsResults, function(i, ingredient) {
								Array.prototype.push.apply(crafters, ingredient.crafters);
								jQuery.each(ingredient.totalCosts, function(j, cost) {
									if(!!cost.currencyId) {
										add(totalCostsCurrencyMap, cost.currencyId, cost.amount);
									} else {
										add(totalCostsItemMap, cost.itemId, cost.amount);
									}
								});
							});
							jQuery.each(totalCostsCurrencyMap, function(currencyId, amount) {
								totalCosts.push({currencyId: currencyId, amount: amount});
							});
							jQuery.each(totalCostsItemMap, function(itemId, amount) {
								totalCosts.push({itemId: itemId, amount: amount});
							});
							// check if it's *actually* convenient to use the recipe
							if(totalCosts.length == 1 &&
								!!totalCosts[0].currencyId &&
								totalCosts[0].currencyId === 'copper' &&
								!!tradingPostCostResult &&
								totalCosts[0].amount > tradingPostCostResult * remainingNeededAmount) {
								console.debug("More convenient to buy", itemId,
									"for", tradingPostCostResult, "*", remainingNeededAmount,
									"=", tradingPostCostResult * remainingNeededAmount,
									"rather than using the recipe", ingredientsResults,
									"for", totalCosts[0].amount, "copper");
								ingredientsResults = null;
								totalCosts = [{
									currencyId: 'copper',
									amount: tradingPostCostResult * remainingNeededAmount
								}];
							} else {
								// percentage
								var remainingPercentage = 1 - percentage;
								jQuery.each(ingredientsResults, function(i, ingredient) {
									percentage += ingredient.percentage * remainingPercentage / ingredientsResults.length;
								});
							}
						} else {
							// total costs
							if(tradingPostCostResult !== null) {
								// no recipe for the element: buy it on the TP
								totalCosts = [{
									currencyId: 'copper',
									amount: tradingPostCostResult * remainingNeededAmount
								}];
							} else {
								// no recipe for the element and no listing on the TP:
								// just mark that you have to acquire it somehow
								totalCosts = [{
									itemId: itemId,
									amount: remainingNeededAmount
								}];
							}
						}
						// return the result
						return perfectNode({
							itemId: itemId,
							unitaryRecipeAmount: unitaryRecipeAmount,
							remainingNeededAmount: remainingNeededAmount,
							ownedAmount: ownedAmount,
							tradingPostCost: tradingPostCostResult,
							ingredients: ingredientsResults,
							totalCosts: totalCosts,
							crafters: crafters,
							recipeItemIds: recipeItemIds,
							percentage: percentage
						});
					});
				}
				// get the base node, declaring we want one and still need one.
				return getRecipe(rootItemId, 1, 1, true);
				// add the recipe to the ingredients of the root
				/*.then(function(rootNode) {
					return $q.all(jQuery.map(rootNode.recipeItemIds, function(recipeItemId) {
						return getRecipe(recipeItemId, 1, 1);
					})).then(function(recipeIngredients) {
						console.debug("Extending root node ingredients", rootNode.ingredients, "with recipe ingredients", recipeIngredients);
						Array.prototype.push.apply(rootNode.ingredients, recipeIngredients);
						return rootNode;
					});
				});*/
			}
		};
	}
])

;