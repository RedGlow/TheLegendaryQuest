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
			wrap: function(promise) {
				extra++;
				return promise['finally'](function() { extra--; });
			}
		};
}])

;