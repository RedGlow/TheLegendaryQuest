angular.module('legendarySearch.recipeSynthesizer', [
	'supplyCrateApp.gw2api'
])

.service("RecipeSynthesizer", [
	        "$q", "GW2API",
	function($q,   GW2API) {
		var brokenItems = {
			9616: "Gift of Ice",
			9622: "Unicorn Statue",
			9623: "Gift of History",
			9624: "Gift of Music",
			9630: "Gift of Weather",
			9632: "Gift of Color",
			9634: "Wolf Statue",
			9635: "Shark Statue",
		};
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
		return {
			getItem: function(itemId) {
				var brokenItem = brokenItems[itemId];
				if(!!brokenItem) {
					var newItem = jQuery.extend(true, {}, baseRecipe);
					newItem.name = newItem.name + brokenItem;
					return $q.when(newItem);
				} else {
					return GW2API.getItem(itemId);
				}
			}
		};
	}
])

;