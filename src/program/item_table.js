angular.module('legendarySearch.itemTable', [
	'ngAnimate',
	'supplyCrateApp.gw2api',
	'legendarySearch.recipeCompanion',
	'legendarySearch.costItem',
	'legendarySearch.siteLinks'
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

.animation('.recipe-container', function() {
	return {
		addClass: function(element, className, done) {
			element.animate({
				height: 0
			}, done);
		},
		removeClass: function(element, className, done) {
			element.animate({
				height: element.find('.recipe').height()
			}, function() {
				element.css('height', 'auto');
				if(!!done) { done(); }
			});
		}
	};
})

;