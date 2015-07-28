angular.module('legendarySearch.itemTable', [
	'supplyCrateApp.gw2api',
	'legendarySearch.recipeCompanion'
])

.directive('itemTable', [
	        "$templateCache", "$compile", "GW2API",
	function($templateCache,   $compile,   GW2API) {
		return {
			restrict: 'E',
			scope: {
				itemTree: '=',
				buyImmediately: '=',
				showPercentage: '='
			},
			controller: function($scope, RecipeCompanion) {
				$scope.$watch('itemTree.itemId', function() {
					if(!$scope.itemTree.itemId) { return; }
					RecipeCompanion.getSynthesizedItem(parseInt($scope.itemTree.itemId)).then(function(item) {
						$scope.item = item;
					});
				});
			},
			link: function(scope, element, attrs) {
				var content = $templateCache.get('item-table-directive.html');
				scope.open = false;
				scope.toggle = function($event) {
					scope.open = !scope.open;
					$event.preventDefault();
				};
				if(!!scope.itemTree) {
					element.append(content);
					$compile(element.contents())(scope.$new());
				}
			}
		};
	}
])

;