angular.module('legendarySearch.costItem', [
	'supplyCrateApp.gw2api'
])

.directive('costItem',
	function() {
		return {
			restrict: 'E',
			templateUrl: 'cost-item.html',
			scope: {
				amount: '=',
				itemId: '='
			},
			controller: function($scope, GW2API) {
				$scope.$watch('itemId', function() {
					if(!$scope.itemId) {
						return;
					}
					GW2API.getItem(parseInt($scope.itemId)).then(function(item) {
						$scope.item = item;
					});
				});
			}
		};
	}
)

;