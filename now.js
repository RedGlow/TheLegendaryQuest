angular.module('supplyCrateApp.now', [
])

.factory('Now', function() {
    return {
        value: function() {
            return new Date();
        }
    };
})

;