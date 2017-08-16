(function(angular) {
    'use strict';
    angular
        .module('interviewRecord')
        .directive('formStyle', FormStyle);
    FormStyle.$inject = [];

    function FormStyle() {
        function formColor($scope, elem, attr) {
            $scope.$watch('type', function(newValue, oldValue) {
                if (newValue === 'Visa')
                    elem[0].parentElement.style.background = "#353c52";
                else if (newValue === 'Permanent residence')
                    elem[0].parentElement.style.background = "#222";
            });
        }
        var ddo = {
            restrict: 'A',
            scope: {
                type: '=type'
            },
            link: formColor
        };

        return ddo;
    }
})(window.angular);