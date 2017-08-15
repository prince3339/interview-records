(function(angular) {
    'use strict';

    angular
        .module('interviewRecord')
        .controller('interviewRecordDetailController', InterviewRecordDetailController);

    InterviewRecordDetailController.$inject = ['$stateParams', 'interviewRecordService'];

    function InterviewRecordDetailController($stateParams, interviewRecordService) {
        var vm = this;
        //vm.getSpecificInterview = getSpecificInterview;

        console.log($stateParams.id);

        function init() {
            vm.interview = interviewRecordService.getSpecificInterview($stateParams.id)[0];
        }

        init();

    }
})(window.angular);