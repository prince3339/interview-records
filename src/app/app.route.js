(function(angular) {
    angular.module('interviewApp')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/app/interview-record/view/interview-record-create-form.html',
                controller: 'interviewRecordCreateController',
                controllerAs: 'vm'
            })
            .state('interview-list', {
                url: '/interview-list',
                templateUrl: 'src/app/interview-record/view/interview-record-lists.html',
                controller: 'interviewRecordListsController',
                controllerAs: 'vm'
            })
            .state('interview-list.details', {
                url: '/{id}',
                templateUrl: 'src/app/interview-record/view/interview-record-details.html',
                controller: 'interviewRecordDetailController',
                controllerAs: 'vm'
            });
        $urlRouterProvider
            .otherwise('/');
    }
})(window.angular);