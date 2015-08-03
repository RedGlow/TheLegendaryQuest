angular.module('legendarySearch.main', [
	'ngStorage',
	'ui.bootstrap',
	'legendarySearch',
	'supplyCrateApp.gw2api',
	'legendarySearch.bank',
	'legendarySearch.recipeCompanion',
	'legendarySearch.recursiveRecipeComputer',
	'legendarySearch.runningRequests',
	'supplyCrateApp.price',
	'legendarySearch.itemTable',
	'legendarySearch.convertToBoolean'
])

.controller('Main', [
	        "$scope", "$q", "$localStorage", "$modal", "GW2API", "Bank", "RecursiveRecipeComputer", "RunningRequests", "RecipeCompanion",
	function($scope,   $q,   $localStorage,   $modal,   GW2API,   Bank,   RecursiveRecipeComputer,   RunningRequests,   RecipeCompanion) {
		// error function
		function errorFunction(error) {
			return $modal.open({
				templateUrl: 'error-dialog.html',
				controller: 'ErrorDialogController',
				resolve: {
					error: function() { return error; }
				}
			}).result.then(function() {
				return $q.reject(error);
			}, function() {
				return $q.reject(error);
			});
		}
		
		// initialize legendary list
		var availableLegendariesIds = RecipeCompanion.getLegendaryIds();
		$q.all(jQuery.map(availableLegendariesIds, function(legendaryId) {
			return GW2API.getItem(legendaryId).then(function(legendary) {
				return {name: legendary.name, id: legendary.id};
			});
		})).then(function(availableLegendaries) {
			availableLegendaries.sort(function(l1, l2) {
				return l1.name.localeCompare(l2.name);
			});
			$scope.availableLegendaries = availableLegendaries;
		}, errorFunction);
		$scope.selectedLegendary = null;
		
		// initialize TP management
		$scope.buyImmediately = true;
		
		// bank management
		$scope.apiKeyTemp = $scope.apiKey = $localStorage.apiKey;
		$scope.bankContent = {};
		$scope.$watch('apiKey', function() {
			$scope.bankContentErrors = null;
			if(!$scope.apiKey) { return; }
			$localStorage.apiKey = $scope.apiKey;
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
			});
		});
		$scope.$watch('bankContent', function() {
			$scope.showPercentage = !!$scope.bankContent && !jQuery.isEmptyObject($scope.bankContent);
		});
		
		// load cost tree
		function reloadTree() {
			if(!$scope.selectedLegendary || $scope.buyImmediately === null) {
				return;
			}
			RecursiveRecipeComputer
				.getRecipeTree($scope.selectedLegendary, $scope.bankContent || {}, $scope.buyImmediately)
				.then(function(data) {
					console.debug(data);
					$scope.costTree = data;
				}, errorFunction);
		}
		$scope.$watch('bankContent', reloadTree);
		$scope.$watch('selectedLegendary', reloadTree);
		$scope.$watch('buyImmediately', reloadTree);
		
		// num running requests
		$scope.runningRequests = RunningRequests.get;
	}
])

.controller('ErrorDialogController', [
	        "$scope", "error",
	function($scope,   error) {
		$scope.error = error;
		$scope.openedDetails = false;
		$scope.toggleDetails = function() {
			$scope.openedDetails = !$scope.openedDetails;
		};
	}
])

;