angular.module('legendarySearch.fullRecipeComputer', [
	'supplyCrateApp.gw2api',
	'legendarySearch.recipeCompanion'
])

.service('FullRecipeComputer', [
	        "$q", "GW2API", "RecipeCompanion",
	function($q,   GW2API,   RecipeCompanion) {
		return {
			// ownedAmount: the amount of this item in the bank we could use for this node
			// unitaryRecipeAmount: the amount needed to produce one of these items using the recipe
			// remainingNeededAmount: the amount still needed to complete the amount needed for this node
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
				function getRecipe(itemId, unitaryRecipeAmount, remainingNeededAmount) {
					// check what we can get from the bank
					var ownedAmount = Math.min(remainingNeededAmount, get(bankContent, itemId));
					bankContent[itemId] -= ownedAmount;
					remainingNeededAmount -= ownedAmount;
					if(remainingNeededAmount == 0) {
						// we already own enough
						return $q.when({
							itemId: itemId,
							unitaryRecipeAmount: unitaryRecipeAmount,
							remainingNeededAmount: remainingNeededAmount,
							ownedAmount: ownedAmount,
							cost: null,
							ingredients: []
						});
					}
					// get the recipe promise for this element
					var recipePromise = RecipeCompanion
						.getRecipeFromOutputId(itemId)
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
							ingredientsPromises = $q.all(jQuery.map(recipeResult, function(ingredient) {
								var iid = ingredient.id,
									iamount = ingredient.amount || 1,
									iRemainingNeededAmount = iamount * remainingNeededAmount;
								if(ingredient.type === 'item') {
									return getRecipe(parseInt(iid), iamount, iRemainingNeededAmount);
								} else {
									return $q.when({
										currencyId: ingredient.id,
										unitaryRecipeAmount: iamount,
										remainingNeededAmount: iRemainingNeededAmount,
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
						var returnValue = {
							itemId: itemId,
							unitaryRecipeAmount: unitaryRecipeAmount,
							remainingNeededAmount: remainingNeededAmount,
							ownedAmount: ownedAmount,
							cost: costResult
						};
						if(ingredientsResults === null || (ingredientsCost !== null && costResult !== null && ingredientsCost > costResult)) {
							// not worth it: let's skip ingredients
							returnValue.ingredients = [];
						} else {
							// worth it: keep them
							returnValue.ingredients = ingredientsResults;
						}
						return returnValue;
					});
				}
				return getRecipe(rootItemId, 1, 1);
			}
		};
	}
])

;