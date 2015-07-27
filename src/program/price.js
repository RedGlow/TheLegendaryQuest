angular.module('supplyCrateApp.price', [
])

.directive('price', function() {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'price-directive.html',
        controller: ['$scope', function($scope) {
            // for some mysterious reason, I must watch manually for when "value" is bound O_o
            $scope.$watch('value', function() {
                // get out the scope value
                var value = $scope.value;
                // break in copper, silver and gold
                var sign = 1;
                if(value < 0) {
                    sign = -1;
                    value = -value;
                }
                var copper = value % 100;
                value -= copper;
                value /= 100;
                var silver = value % 100;
                value -= silver;
                value /= 100;
                var gold = value;
                // put the sign where it belongs
                if(gold > 0) {
                    gold = sign * gold;
                } else if(silver > 0) {
                    silver = sign * silver;
                } else {
                    copper = sign * copper;
                }
                // save back in $scope
                $scope.copper = copper;
                $scope.silver = silver;
                $scope.gold = gold;
                $scope.hasGold = gold !== 0;
                $scope.hasSilver = gold !== 0 || silver !== 0;
            });
        }]
    };
})

;
