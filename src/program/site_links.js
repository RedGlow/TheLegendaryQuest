angular.module('legendarySearch.siteLinks', [
	'redglow.gw2api'
])

.directive('siteLinks',
	function() {
		return {
			restrict: 'E',
			templateUrl: 'site-links.html',
			scope: {
				itemId: '='
			},
			controller: function($scope, GW2API) {
				$scope.$watch('itemId', function() {
					if(!$scope.itemId) {
						return;
					}
					$scope.gw2SpidyLink = "http://www.gw2spidy.com/item/" + $scope.itemId;
					$scope.gw2ShiniesLink = "http://www.gw2shinies.com/item/" + $scope.itemId;
					GW2API.getItem(parseInt($scope.itemId)).then(function(item) {
						$scope.gw2WikiLink = "http://wiki.guildwars2.com/wiki/" + item.name.replace(/ /g, "_");
					});
				});
			}
		};
	}
)

;