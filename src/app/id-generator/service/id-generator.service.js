(function(angular) {
    'use strict';
    angular
        .module('idGenerator')
        .service('idGeneratorService', IdGeneratorService);
    IdGeneratorService.$inject = [];

    function IdGeneratorService() {
        var IdGeneratorService = this;
        IdGeneratorService.generateID = generateID;

        function generateID() {
            return '#' + (rand5() + rand5() + rand5()).substring(2);
        }

        function rand5() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16);
        }

    }
})(window.angular);