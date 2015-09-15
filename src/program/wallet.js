angular.module('legendarySearch.wallet', [
	'redglow.gw2api'
])

.service('Wallet', [
	        "$q", "GW2API",
	function($q,   GW2API) {
		return {
			getFullContent: function(apiKey) {
				// get the list of available currencies
				return GW2API.getCurrencies().then(function(currenciesIds) {
					// get the details for each currency
					return $q.all(jQuery.map(currenciesIds, function(currencyId) {
						return GW2API.getCurrency(currencyId);
					}));
				}).then(function(allCurrencies) {
					// create an id -> name currency map
					var currencyIdToNameMap = {};
					jQuery.each(allCurrencies, function(i, currency) {
						currencyIdToNameMap[currency.id] = currency.name;
					});
					// load the wallet content
					return GW2API.getWallet(apiKey).then(function(wallet) {
						var contents = {};
						jQuery.each(wallet, function(i, walletEntry) {
							var name = currencyIdToNameMap[walletEntry.id];
							if(!!name) {
								contents[name] = walletEntry.value;
							}
						});
						return contents;
					});
				});
			}
		};
	}])
	
;