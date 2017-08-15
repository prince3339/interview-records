(function(angular) {
    'use strict';

    angular
        .module('interviewRecord')
        .controller('interviewRecordListsController', InterviewRecordListsController);

    InterviewRecordListsController.$inject = ['interviewRecordService'];

    function InterviewRecordListsController(interviewRecordService) {
        var vm = this;
        vm.getInterviewList = getInterviewList;

        function getInterviewList() {
            var interviews = interviewRecordService.getInterviewList();
            if(interviews && interviews.length) {
                vm.interviewAvailability = true;
                vm.interviews = interviews.reverse();
            }else
                vm.interviewAvailability = false;
        }

        function init() {
            getInterviewList();
        }

        init();

    }
})(window.angular);