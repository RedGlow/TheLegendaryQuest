angular.module('legendarySearch.apiFinder', [
])

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

;