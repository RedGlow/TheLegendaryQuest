angular.module('legendarySearch.main', [
	'legendarySearch',
	'supplyCrateApp.gw2api',
	'legendarySearch.bank',
	'legendarySearch.fullRecipeComputer',
	'legendarySearch.runningRequests',
	'legendarySearch.costComputer',
	'supplyCrateApp.price-directive',
	'legendarySearch.item',
	'legendarySearch.itemTable',
	'legendarySearch.convertToBoolean',
	'legendarySearch.costs'
])

.controller('Main', [
	        "$scope", "$q", "GW2API", "CostComputer", "Bank", "FullRecipeComputer", "RunningRequests",
	function($scope,   $q,   GW2API,   CostComputer,   Bank,   FullRecipeComputer,   RunningRequests) {
		// initialize legendary list
		var availableLegendariesIds = CostComputer.legendaryIds;
		$q.all(jQuery.map(availableLegendariesIds, function(legendaryId) {
			return GW2API.getItem(legendaryId).then(function(legendary) {
				return {name: legendary.name, id: legendary.id};
			})
		})).then(function(availableLegendaries) {
			availableLegendaries.sort(function(l1, l2) {
				return l1.name.localeCompare(l2.name);
			});
			$scope.availableLegendaries = availableLegendaries;
		});
		$scope.selectedLegendary = null;
		
		// initialize TP management
		$scope.buyImmediately = true;
		
		// bank management
		$scope.apiKeyTemp = "";
		$scope.$watch('apiKey', function() {
			$scope.bankContentErrors = null;
			if(!$scope.apiKey) { return; }
			Bank.getFullContent($scope.apiKey).then(function(data) {
				$scope.bankContent = data.items;
				$scope.bankContentErrors = data.errors;
				console.debug("$scope.bankContent =", $scope.bankContent);
				console.debug("$scope.bankContentErrors =", $scope.bankContentErrors);
			}, function(response) {
				$scope.bankContent = {};
				$scope.bankContentErrors = {
					accessError: response.data.text
				};
			})
		});
		
		// load cost tree
		function reloadTree() {
			if(!$scope.selectedLegendary || $scope.buyImmediately === null) {
				return;
			}
			FullRecipeComputer
				.getRecipeTree($scope.selectedLegendary, $scope.bankContent || {}, $scope.buyImmediately)
				.then(function(data) {
					$scope.costTree = data;
				}, function(error) {
					alert("Cost tree error:", error);
				});
		}
		$scope.$watch('bankContent', reloadTree);
		$scope.$watch('selectedLegendary', reloadTree);
		$scope.$watch('buyImmediately', reloadTree);
		
		// num running requests
		$scope.$watch(function() {
			return RunningRequests.get();
		}, function(newValue) {
			$scope.numRunningRequests = newValue;
		});
	}
])
