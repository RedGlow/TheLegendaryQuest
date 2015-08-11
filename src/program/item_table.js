angular.module('legendarySearch.itemTable', [
	'ngAnimate',
	'redglow.gw2api',
	'legendarySearch.recipeCompanion',
	'legendarySearch.costItem',
	'legendarySearch.siteLinks'
])

/*
the visibilityLevel / visible mechanism works as such:
	- when visible becomes true ("this node can be seen", which means that the parent node is open), visibilityLevel is set to 2
	- non-visible nodes get a visibilityLevel = parent's visibilityLevel - 1 (minimum: 0).
	- only nodes with visibilityLevel >= 0 gets rendered.
this allows to always have rendered only the visible nodes and their direct children nodes. These are thus ready to be open-animated
without waiting for node creation/insertion.
the actual changes in model are always made at the end of the animations to avoid stuttering.
*/
.directive('itemTable', [
	        "$templateCache", "$compile", "$timeout", "GW2API",
	function($templateCache,   $compile,   $timeout,   GW2API) {
		var content = null;
		return {
			restrict: 'E',
			scope: {
				itemTree: '=',
				buyImmediately: '=',
				showPercentage: '=',
				visible: '=',
				visibilityLevel: '='
			},
			controller: function($scope, RecipeCompanion) {
				$scope.$watch('itemTree.itemId', function() {
					if(!$scope.itemTree.itemId) { return; }
					RecipeCompanion.getSynthesizedItem(parseInt($scope.itemTree.itemId)).then(function(item) {
						$scope.item = item;
					});
				});
				$scope.$watch('visibilityLevel', function() {
					if($scope.visibilityLevel === 0 || !!$scope.visibilityLevel) {
						$scope.childVisibilityLevel = Math.max(0, $scope.visibilityLevel - 1);
					}
				});
				$scope.$watch('visible', function() {
					if($scope.visible) {
						$scope.visibilityLevel = 2;
					}
				});
			},
			link: function(scope, element, attrs) {
				// get template for lazy binding
				if(content === null) {
					content = $templateCache.get('item-table-directive.html');
				}
				// manage open/closed recipe
				scope.open = false;
				scope.toggle = function($event) {
					var newOpen = !scope.open;
					var recipeContainer = element.closestChild('.recipe-container');
					if(newOpen) {
						var h = recipeContainer.find('.recipe').height();
						recipeContainer.animate({
							height: h
						}, function() {
							recipeContainer.css('height', 'auto');
							scope.$apply(function() { scope.open = newOpen; });
						});
					} else {
						recipeContainer.animate({
							height: 0
						}, function() {
							scope.$apply(function() { scope.open = newOpen; });
						});
					}
					$event.preventDefault();
				};
				// manage compilation when we are visible or children of visible nodes
				var compiled = false;
				scope.$watch('visibilityLevel', function() {
					if(scope.visibilityLevel !== 0 && !scope.visibilityLevel) {
						return;
					}
					if(scope.visibilityLevel > 0 && !compiled) {
						element.append(content);
						$compile(element.contents())(scope.$new());
						compiled = true;
					}
				});
			}
		};
	}
])

/*.animation('.recipe-container', function() {
	return {
		addClass: function(element, className, done) {
			if(className == 'hidden-block') {
				element.animate({
					height: 0
				}, done);
			}
		},
		removeClass: function(element, className, done) {
			if(className == 'hidden-block') {
				element.animate({
					height: element.find('.recipe').height()
				}, function() {
					element.css('height', 'auto');
					if(!!done) { done(); }
				});
			}
		}
	};
})*/

;