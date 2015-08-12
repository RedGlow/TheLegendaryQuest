angular.module('legendarySearch.main', [
	'ngStorage',
	'ui.bootstrap',
	'legendarySearch',
	'redglow.gw2api',
	'legendarySearch.bank',
	'legendarySearch.recipeCompanion',
	'legendarySearch.recursiveRecipeComputer',
	'supplyCrateApp.price',
	'legendarySearch.itemTable',
	'legendarySearch.convertToBoolean',
	'legendarySearch.disciplinesTable'
])

.controller('Main', [
	        "$scope", "$q", "$localStorage", "$modal", "GW2API", "Bank", "RecursiveRecipeComputer", "RecipeCompanion",
	function($scope,   $q,   $localStorage,   $modal,   GW2API,   Bank,   RecursiveRecipeComputer,   RecipeCompanion) {
		// error function
		function errorFunction(error) {
			return $modal.open({
				templateUrl: 'program/main_error_dialog.html',
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
		
		// show remaining costs
		$scope.showOnlyRemainingCosts = true;
		
		// bank management
		$scope.apiKeyTemp = $scope.apiKey = $localStorage.apiKey;
		$scope.bankContent = {};
		$scope.hasBankContents = false;
		$scope.$watch('apiKey', function() {
			$scope.bankContentErrors = null;
			if(!$scope.apiKey) {
				$scope.bankContent = {};
				$scope.hasBankContents = false;
				return;
			}
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
			})
			.then(function() {
				$scope.hasBankContents = !!$scope.bankContent && !jQuery.isEmptyObject($scope.bankContent);
				console.debug("BC:", $scope.hasBankContents);
			});
		});
		
		// load cost tree
		function reloadTree() {
			if(!$scope.selectedLegendary || $scope.buyImmediately === null) {
				return;
			}
			RecursiveRecipeComputer
				.getRecipeTree($scope.selectedLegendary,
					$scope.showOnlyRemainingCosts ? ($scope.bankContent || {}) : {},
					$scope.buyImmediately)
				.then(function(data) {
					console.debug(data);
					$scope.costTree = data;
				}, errorFunction);
		}
		$scope.$watch('bankContent', reloadTree);
		$scope.$watch('showOnlyRemainingCosts', reloadTree);
		$scope.$watch('selectedLegendary', reloadTree);
		$scope.$watch('buyImmediately', reloadTree);
		$scope.$watch('showPercentage', reloadTree);
		
		// num running requests
		$scope.runningRequests = GW2API.getNumRunningRequests;
		
		// show percentage
		function computeShowPercentage() {
			$scope.showPercentage = $scope.showOnlyRemainingCosts &&
				!!$scope.bankContent &&
				!jQuery.isEmptyObject($scope.bankContent);
		}
		$scope.$watch('bankContent', computeShowPercentage);
		$scope.$watch('showOnlyRemainingCosts', computeShowPercentage);
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