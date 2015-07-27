angular.module('legendarySearch.runningRequests', [
	'supplyCrateApp.gw2api'
])

.service('RunningRequests', [
	        "$q", "GW2API",
	function($q,   GW2API) {
		var extra = 0;
		return {
			get: function() {
				return GW2API.getNumRunningRequests() + extra;
			},
			startRequest: function() {
				extra++;
			},
			endRequest: function() {
				extra--;
			},
			finallyEndRequest: function(reason) {
				extra--;
			}
		};
}])

;