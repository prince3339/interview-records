var angular = require('angular');
(function(angular) {
    'use strict';
    angular
        .module('idGenerator', [])
        .run(function() {
            console.log('ID generator App loaded');
        });
})(angular);