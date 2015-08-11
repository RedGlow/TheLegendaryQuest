angular.module('legendarySearch', [
	'redglow.gw2api'
])

.config(['GW2APIProvider', function(GW2APIProvider) {
	GW2APIProvider.language = 'en'; // force english language
}])

;