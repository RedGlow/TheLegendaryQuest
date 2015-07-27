angular.module('legendarySearch.convertToBoolean', [
])

.directive('convertToBoolean', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return val == "true" ? true : val == "false" ? false : null;
            });
            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
})

;