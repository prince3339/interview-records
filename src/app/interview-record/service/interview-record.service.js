(function(angular) {
    'use strict';
    angular
        .module('interviewRecord')
        .service('interviewRecordService', InterviewRecordService);
    InterviewRecordService.$inject = [];

    function InterviewRecordService() {
        var InterviewRecordService = this;
        InterviewRecordService.saveInterviewRecord = saveInterviewRecord;
        InterviewRecordService.getInterviewList = getInterviewList;
        InterviewRecordService.getSpecificInterview = getSpecificInterview;

        function saveInterviewRecord(interview) {
            console.log('Works');
            var interviews;

            if (localStorage.interviews) {
                interviews = getInterviewList();
                interviews.push(interview);
                localStorage.setItem('interviews', JSON.stringify(interviews));

            } else {
                interviews = [];
                interviews.push(interview);
                localStorage.setItem('interviews', JSON.stringify(interviews));
            }
        }

        function getInterviewList() {
            if(localStorage.interviews)
                return JSON.parse(localStorage.getItem('interviews'));
            else
                return null;
        }

        function getSpecificInterview(interviewId) {
            var interviews = getInterviewList();
            return interviews.filter(function(interview) {
                return interview.interview_id == interviewId;
            });
        }
    }
})(window.angular);