(function(angular) {
    'use strict';

    angular
        .module('interviewRecord')
        .controller('interviewRecordCreateController', InterviewRecordCreateController);

    InterviewRecordCreateController.$inject = ['idGeneratorService', 'interviewRecordService', '$scope', 'ellipsisFilter'];

    function InterviewRecordCreateController(idGeneratorService, interviewRecordService, $scope, ellipsisFilter) {
        var vm = this;
        vm.saveInterviewRecord = saveInterviewRecord;
        vm.generateID = generateID;
        vm.interview = {};

        function saveInterviewRecord() {
            interviewRecordService.saveInterviewRecord(vm.interview);
            vm.interview = {};
            $scope.interviewCreateForm.$setPristine();
            $scope.interviewCreateForm.$setUntouched();
        }

        function generateID() {
            vm.interview.interview_id = idGeneratorService.generateID();
        }

        function init() {
            console.log('Loaded');
            var test = ellipsisFilter('how are you man? Are you there?', 12);
        }

        init();

    }
})(window.angular);