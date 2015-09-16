angular.module('legendarySearch.disciplinesTable', [
	'redglow.gw2api',
	'legendarySearch.costItem'
])

.directive('disciplinesTable',
	function() {
		return {
			restrict: 'E',
			templateUrl: 'program/disciplines_table.html',
			scope: {
				itemTree: '=',
				apiKey: '='
			},
			controller: function($scope, $q, GW2API) {
				// data we need
				neededCrafters = null;
				characters = null;
				// watch the API key in order to load the data
				$scope.$watch('apiKey', function() {
					if(!$scope.apiKey) {
						characters = null;
						return;
					}
					var apiKey = $scope.apiKey;
					GW2API.getCharacters(apiKey).then(function(characterNames) {
						return $q.all(jQuery.map(characterNames, function(characterName) {
							return GW2API.getCharacter(characterName, apiKey);
						}));
					}).then(function(result) {
						characters = result;
					});
				});
				// watch the item tree
				$scope.$watch('itemTree.crafters', function() {
					if(!$scope.itemTree) {
						neededCrafters = null;
						return;
					}
					neededCrafters = $scope.itemTree.crafters;
				});
				// watch the data we need in order to compute a result
				$scope.$watch(function() {
					return neededCrafters;
				}, update, true);
				$scope.$watch(function() {
					return characters;
				}, update, true);
				// updater function
				function update() {
					if(!neededCrafters) {
						$scope.craftProblems = null;
						return;
					}
					// get the best character for each profession
					var professionals = {};
					if(!!characters) {
						jQuery.each(characters, function(i, character) {
							jQuery.each(character.crafting, function(j, craft) {
								var discipline = craft.discipline;
								var myEntry = {
									rating: Math.max(0, craft.rating),
									name: character.name
								};
								if(myEntry.rating === 0) {
									return;
								}
								if(!professionals[discipline] ||
									professionals[discipline].rating < myEntry.rating) {
									professionals[craft.discipline] = myEntry;
								}
							});
						});
						console.debug("professionals:", professionals);
					}
					// check for each crafter if we have what is needed
					var craftProblems = [];
					jQuery.each(neededCrafters, function(i, neededCrafter) {
						// look for the best match
						var bestMatch = null;
						jQuery.each(neededCrafter.disciplines, function(j, discipline) {
							if(professionals[discipline] &&
								(bestMatch === null || professionals[discipline].rating >= bestMatch.rating)) {
								bestMatch = {
									discipline: discipline,
									rating: professionals[discipline].rating,
									name: professionals[discipline].name,
								};
							}
						});
						// fill crafts
						if(bestMatch === null) {
							craftProblems.push({
								itemId: neededCrafter.itemId,
								disciplines: neededCrafter.disciplines,
								rating: neededCrafter.rating,
								characterName: null,
								characterDiscipline: null,
								characterRating: null,
								level: !characters ? '' : 'danger'
							});
						} else {
							craftProblems.push({
								itemId: neededCrafter.itemId,
								disciplines: [bestMatch.discipline],
								rating: neededCrafter.rating,
								characterName: bestMatch.name,
								characterDiscipline: bestMatch.discipline,
								characterRating: bestMatch.rating,
								level: !characters ? '' : (bestMatch.rating < neededCrafter.rating ? 'warning' : 'success')
							});
						}
					});
					var levelsList = ['', 'success', 'warning', 'danger'];
					craftProblems.sort(function(a, b) {
						var result = levelsList.indexOf(b.level) - levelsList.indexOf(a.level);
						if(result === 0) {
							result = b.itemId - a.itemId;
						}
						return result;
					});
					console.debug("craftProblems:", craftProblems);
					$scope.hasCharacters = !!characters;
					$scope.craftProblems = craftProblems;
				}
			}
		};
	}
)

;