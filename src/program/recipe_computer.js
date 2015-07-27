angular.module('legendarySearch.recipeComputer', [
	'supplyCrateApp.gw2api',
	'legendarySearch.recipeFinder',
	'legendarySearch.costComputer'
])

.service('RecipeComputer', [
	        "$q", "GW2API", "RecipeFinder", "CostComputer",
	function($q,   GW2API,   RecipeFinder,   CostComputer) {
		return {
			getRecipe: function(itemId) {
				// get out implicit recipes
				var recipe = CostComputer.costs[itemId];
				// get out api recipes, if we have no other recipe
				if(!recipe) {
					return RecipeFinder
						.getFromOutput(itemId)
						.then(function(recipeIds) {
							if(recipeIds.length == 0) {
								return $q.reject("No recipe found for itemId = " + itemId);
							}
							var recipeId = recipeIds[0];
							return GW2API.getRecipe(recipeId);
						})
						.then(function(recipe) {
							var ingredients = recipe.ingredients;
							if(jQuery.inArray("LearnedFromItem", recipe.flags || []) != -1) {
								var recipeItemId = CostComputer.recipeItemIds[recipe.output_item_id];
								if(!recipeItemId) {
									return $q.reject("No recipe item id registered for output item id = " + recipe.output_item_id);
								} else {
									ingredients = ingredients.slice(0);
									ingredients.push({
										item_id: recipeItemId,
										count: 1
									});
								}
							}
							return jQuery.map(ingredients, function(entry) {
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

;