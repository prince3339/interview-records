(function(angular) {
    'use strict';
    require('./interview-record/interview-record.module');
    require('./id-generator/id-generator.module');
    angular
        .module('interviewApp', ['ngMessages', 'interviewRecord', 'idGenerator', 'ui.router', 'angularjs-datetime-picker'])
        .run(function() {
            console.log('Angular booted');
        });

    angular.element(function() {
        angular.bootstrap(document, ['interviewApp']);
    });
})(window.angular);