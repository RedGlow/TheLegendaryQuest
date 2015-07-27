angular.module('legendarySearch.recipeFinder', [
])

/**
 * A service to find recipe ids.
 */
.service('RecipeFinder', [
	        "$q", "$http",
	function($q,   $http) {
		var cache = {};
		return {
			/**
			 * Get the recipe id from its output.
			 *
			 * @param {int} id - The output id we are looking recipe(s) of.
			 * @param {promise<int[]>} - A promise containing the ids of all the known recipes producing the given output.
			 */
			getFromOutput: function(id) {
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

;