angular.module('legendarySearch.item', [
	'legendarySearch.recipeCompanion'
])

.directive('item', function() {
	return {
		restrict: 'E',
		templateUrl: 'item.html',
		scope: {
			itemId: '=',
			amount: '=',
			buyImmediately: '='
		},
		controller: function($scope, RecipeCompanion) {
			$scope.$watch('itemId', function() {
				if(!$scope.itemId) { return; }
				RecipeCompanion.getSynthesizedItem(parseInt($scope.itemId)).then(function(item) {
					$scope.item = item;
				});
			});
		}
	};
})

;