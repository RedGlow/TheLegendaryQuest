angular.module('legendarySearch.item', [
	'legendarySearch.recipeSynthesizer'
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
		controller: function($scope, RecipeSynthesizer) {
			$scope.$watch('itemId', function() {
				if(!$scope.itemId) { return; }
				RecipeSynthesizer.getItem(parseInt($scope.itemId)).then(function(item) {
					$scope.item = item;
				});
			});
		}
	}
})

