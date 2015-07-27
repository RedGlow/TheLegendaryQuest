angular.module('legendarySearch.recipeCompanion', [
	'supplyCrateApp.gw2api'
])

/**
 * A service that implements the missing functions in GW2 recipe API and the GW2API module.
 */
.service('RecipeCompanion', function($q, $http, GW2API) {
	var mysticForgeRecipes = {
		9615: [ // recipe: gift of metal
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9616: [ // recipe: gift of ice
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9617: [ // recipe: gift of wood
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9618: [ // recipe: gift of energy
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9621: [ // recipe: gift of nature
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9622: [ // recipe: unicorn statue
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9623: [ // recipe: gift of history
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9624: [ // recipe: gift of music
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9625: [ // recipe: gift of darkness
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9626: [ // recipe: gift of light
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9627: [ // recipe: vial of quicksilver
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9628: [ // recipe: gift of entertainment
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9629: [ // recipe: gift of stealth
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9630: [ // recipe: gift of weather
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9631: [ // recipe: liquid flame
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9632: [ // recipe: gift of color
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9633: [ // recipe: gift of lightning
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9634: [ // recipe: wolf statue
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9635: [ // recipe: shark statue
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9636: [ // recipe: eel statue
			{type: 'currency', id: 'copper', amount: 100000}
		],
		9637: [ // recipe: gift of water
			{type: 'currency', id: 'copper', amount: 100000}
		],
		19625: [ // gift of frostfang
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19624, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24555, amount: 1},
		],
		19626: [ // gift of fortune
			{ type: 'item', id: 19675, amount: 77 },
			{ type: 'item', id: 19721, amount: 250 },
			{ type: 'item', id: 19673 },
			{ type: 'item', id: 19672 }
		],
		19644: [ // gift of kudzu
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19627, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24865, amount: 1}
		],
		19645: [ // gift of incinerator
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19634, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24548, amount: 1},
		],
		19646: [ // gift of the minstrel
			{type: 'item', id: 19623, amount: 1},
			{type: 'item', id: 19630, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24607, amount: 1},
		],
		19647: [ // gift of sunrise
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24562, amount: 1},
		],
		19648: [ // gift of twilight
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19631, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24570, amount: 1},
		],
		19649: [ // gift of the juggernaut
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19633, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24584, amount: 1},
		],
		19650: [ // gift of the moot
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19635, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24607, amount: 1},
		],
		19651: [ // gift of quip
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19635, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24592, amount: 1},
		],
		19652: [ // gift of meteorlogicus
			{type: 'item', id: 19623, amount: 1},
			{type: 'item', id: 19637, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24554, amount: 1},
		],
		19653: [ // gift of the flameseeker prophecies
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19629, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24601, amount: 1},
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
		19656: [ // gift of rodgort
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19634, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24548, amount: 1},
		],
		19657: [ // gift of Kamohoali'i Kotaki
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19641, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24612, amount: 1},
		],
		19658: [ // gift of kraitkin
			{type: 'item', id: 19623, amount: 1},
			{type: 'item', id: 19642, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24632, amount: 1},
		],
		19659: [ // gift of frenzy
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19643, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24561, amount: 1},
		],
		19660: [ // gift of the dreamer
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19628, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24571, amount: 1},
		],
		19661: [ // gift of the predator
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19636, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24615, amount: 1},
		],
		19662: [ // gift of howler
			{ type: 'item', id: 19622},
			{ type: 'item', id: 19640},
			{ type: 'item', id: 19676, amount: 100},
			{ type: 'item', id: 24618}
		],
		19664: [ // gift of Ascalon
			{type: 'currency', id: 'ascalonian_tear', amount: 500}
		],
		19665: [ // gift of the nobleman
			{type: 'currency', id: 'seal_of_beetletun', amount: 500}
		],
		19666: [ // gift of the forgeman
			{type: 'currency', id: 'manifesto_of_the_moletariate', amount: 500}
		],
		19667: [ // gift of thorns
			{ type: 'currency', id: 'deadly_bloom', amount: 500 }
		],
		19668: [ // gift of baelfire
			{ type: 'currency', id: 'flame_legion_charr_carving', amount: 500 }
		],
		19669: [ // gift of zhaitan
			{type: 'currency', id: 'shard_of_zhaitan', amount: 500}
		],
		19670: [ // gift of sanctuary
			{type: 'currency', id: 'symbol_of_koda', amount: 500}
		],
		19671: [ // gift of knowledge
			{type: 'currency', id: 'knowledge_crystal', amount: 500}
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
		19676: [ // icy runestone
			{type: 'currency', id: 'copper', amount: 10000}
		],
		19678: [ // gift of battle
			{type: 'currency', id: 'badge_of_honor', amount: 500}
		],
		19675: [ // mystic clover
			{ type: 'item', id: 19925, amount: 3.3},
			{ type: 'item', id: 19976, amount: 3.3},
			{ type: 'item', id: 19721, amount: 3.3},
			{ type: 'item', id: 20796, amount: 6.6},
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
		30684: [ // frostfang
			{type: 'item', id: 29166},
			{type: 'item', id: 19625},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30685: [ // kudzu
			{type: 'item', id: 29172},
			{type: 'item', id: 19644},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30686: [ // the dreamer
			{type: 'item', id: 29178},
			{type: 'item', id: 19660},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30687: [ // incinerator
			{type: 'item', id: 29167},
			{type: 'item', id: 19645},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30688: [ // the minstrel
			{type: 'item', id: 29168},
			{type: 'item', id: 19646},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30689: [ // eternity
			{type: 'item', id: 30703},
			{type: 'item', id: 30704},
			{type: 'item', id: 24277, amount: 5},
			{type: 'item', id: 20796, amount: 10},
		],
		30693: [ // quip
			{type: 'item', id: 29174},
			{type: 'item', id: 19651},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30696: [ // the flameseeker prophecies
			{type: 'item', id: 29177},
			{type: 'item', id: 19653},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30697: [ // frenzy
			{type: 'item', id: 29179},
			{type: 'item', id: 19659},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30702: [ // howler
			{type: 'item', id: 29184},
			{type: 'item', id: 19662},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674}
		],
		30690: [ // juggernaut
			{type: 'item', id: 29170},
			{type: 'item', id: 19649},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30691: [ // Kamohoali'i Kotaki
			{type: 'item', id: 29171},
			{type: 'item', id: 19657},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30692: [ // the moot
			{type: 'item', id: 29173},
			{type: 'item', id: 19650},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30694: [ // the predator
			{type: 'item', id: 29175},
			{type: 'item', id: 19661},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],	
		30695: [ // meteorlogicus
			{type: 'item', id: 29176},
			{type: 'item', id: 19652},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
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
		30700: [ // rodgort
			{type: 'item', id: 29182},
			{type: 'item', id: 19656},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30701: [ // kraitkin
			{type: 'item', id: 29183},
			{type: 'item', id: 19658},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30703: [ // sunrise
			{type: 'item', id: 29169},
			{type: 'item', id: 19647},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30704: [ // twilight
			{type: 'item', id: 29185},
			{type: 'item', id: 19648},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		]
	};
	
	var recipeItemIds = {
		19621: 9615,
		19622: 9617,
		19623: 9618,
		19624: 9616,
		19627: 9621,
		19628: 9622,
		19629: 9623,
		19630: 9624,
		19631: 9625,
		19632: 9626,
		19633: 9627,
		19634: 9631,
		19635: 9628,
		19636: 9629,
		19637: 9630,
		19638: 9632,
		19639: 9633,
		19640: 9634,
		19641: 9635,
		19642: 9636,
		19643: 9637
	};
	
	var legendaryIds = [
		30702,
		30698,
		30699,
		30686,
		30696,
		30697,
		30684,
		30687,
		30690,
		30685,
		30701,
		30691,
		30695,
		30688,
		30692,
		30694,
		30693,
		30700,
		30703,
		30704,
		30689
	];

	/* recipe item ids not present in the API for some reason */
	var brokenItems = {
		9616: "Gift of Ice",
		9622: "Unicorn Statue",
		9623: "Gift of History",
		9624: "Gift of Music",
		9628: "Gift of Entertainment",
		9630: "Gift of Weather",
		9632: "Gift of Color",
		9634: "Wolf Statue",
		9635: "Shark Statue",
	};
	
	/* object used to create the replacement for the broken recipe items */
	var baseRecipe = {
		"name": "Recipe: ",
		"description": "Synthesized recipe",
		"type": "Consumable",
		"level": 0,
		"rarity": "Legendary",
		"vendor_value": 12500,
		"game_types": [
			"Dungeon",
			"Pve",
			"Wvw"
		],
		"flags": [
			"AccountBound",
			"NoSalvage",
			"AccountBindOnUse"
		],
		"restrictions": [
		],
		"id": 9636,
		"icon": "https://render.guildwars2.com/file/3D423F6758A5265FF1195303529B32E239C6B0BF/849385.png",
		"details": {
			"type": "Unlock",
			"unlock_type": "CraftingRecipe",
			"recipe_id": 1715
		}
	};
	
	var cache = {};
	
	return {
		/**
		 * Get the item ids of all the legendary weapons.
		 * @returns {[int]} - The ids of all the legendary weapons.
		 */
		getLegendaryIds: function() {
			return legendaryIds;
		},
		/**
		 * Get an item, even when the GW2 API is broken in respect to recipe items.
		 *
		 * @param {int} itemId - The ID of the item to return.
		 * @returns {promise<item>} - The item.
		 */
		getSynthesizedItem: function(itemId) {
			var brokenItem = brokenItems[itemId];
			if(!!brokenItem) {
				var newItem = jQuery.extend(true, {}, baseRecipe);
				newItem.name = newItem.name + brokenItem;
				return $q.when(newItem);
			} else {
				return GW2API.getItem(itemId);
			}
		},
		
		/**
		 * Get a recipe, considering also the mystic forge ones and possibly synthesizing recipe item ids
		 * when the API is missing elements.
		 * @param {int} itemId - The output item id.
		 * @returns {promise<recipe>} - A recipe item.
		 */
		getRecipeFromOutputId: function(itemId) {
			function apiGetRecipeFromOutputId(id) {
				if(!!cache[id]) {
					return $q.when(cache[id]);
				}
				var url = "https://api.guildwars2.com/v2/recipes/search?output=" + id;
				return $http.get(url).then(function(response) {
					cache[id] = response.data;
					return cache[id];
				});
			}
			// get out implicit recipes
			var recipe = mysticForgeRecipes[itemId];
			// get out api recipes, if we have no other recipe
			if(!!recipe) {
				return $q.when(recipe);
			} else {
				return apiGetRecipeFromOutputId(itemId)
					.then(function(recipeIds) {
						if(recipeIds.length === 0) {
							return $q.reject("No recipe found for itemId = " + itemId);
						}
						var recipeId = recipeIds[0];
						return GW2API.getRecipe(recipeId);
					})
					.then(function(recipe) {
						var ingredients = recipe.ingredients;
						if(jQuery.inArray("LearnedFromItem", recipe.flags || []) != -1) {
							var recipeItemId = recipeItemIds[recipe.output_item_id];
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
			}
		}
	};
})

;