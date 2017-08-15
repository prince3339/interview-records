webpackJsonp([0],{

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
module.exports = __webpack_require__(77);


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
__webpack_require__(64);

__webpack_require__(65);

__webpack_require__(67);
__webpack_require__(69);
__webpack_require__(71);

__webpack_require__(75);

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

(function(angular) {
    'use strict';
    __webpack_require__(61);
    __webpack_require__(63);
    angular
        .module('interviewApp', ['ngMessages', 'interviewRecord', 'idGenerator', 'ui.router'])
        .run(function() {
            console.log('Angular booted');
        });

    angular.element(function() {
        angular.bootstrap(document, ['interviewApp']);
    });
})(window.angular);

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(11);
(function(angular) {
    'use strict';
    angular
        .module('interviewRecord', [])
        .run(function() {
            console.log('Record App loaded');
        });
})(angular);

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(11);
(function(angular) {
    'use strict';
    angular
        .module('idGenerator', [])
        .run(function() {
            console.log('ID generator App loaded');
        });
})(angular);

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
__webpack_require__(73);
__webpack_require__(74);

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);

/***/ }),

/***/ 76:
/***/ (function(module, exports) {

(function(angular) {
    "use strict";

    angular
        .module('interviewApp')
        .filter('ellipsis', ellipsisFilter);

    ellipsisFilter.$inject = ['$filter'];

    function ellipsisFilter($filter) {
        return function(text, count) {
            if (text.length > count)
                return $filter('limitTo')(text, count - 1) + '.';
            else
                return text;
        };
    }

})(window.angular);

/***/ }),

/***/ 77:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[58]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXF1aXJlZC1maWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBwLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9pbnRlcnZpZXctcmVjb3JkLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaWQtZ2VuZXJhdG9yL3NlcnZpY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2lkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9pbnRlcnZpZXctcmVjb3JkL3NlcnZpY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvc2VydmljZS9pbnRlcnZpZXctcmVjb3JkLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvZGlyZWN0aXZlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9pbnRlcnZpZXctcmVjb3JkL2RpcmVjdGl2ZS9pbnRlcnZpZXctZm9ybS1zdHlsZS5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtbGlzdHMuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtY3JlYXRlLWZvcm0uY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtZGV0YWlscy5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NoZWxsLWxpYi9maWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2hlbGwtbGliL2ZpbHRlci9lbGxpcHNpcy5maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3N0eWxlL3Nhc3MvbWFpbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsa0I7Ozs7Ozs7QUNiRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxDQUFDLFc7Ozs7Ozs7QUNSRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxDQUFDLFc7Ozs7Ozs7QUNSRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHdCQUF3QixHQUFHO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtCOzs7Ozs7O0FDN0JELHdCOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLGtCOzs7Ozs7O0FDckJELHdCOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsQ0FBQyxrQjs7Ozs7OztBQzNDRCx3Qjs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUMsa0I7Ozs7Ozs7QUMxQkQ7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDLGtCOzs7Ozs7O0FDN0JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUMsa0I7Ozs7Ozs7QUNsQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUMsa0I7Ozs7Ozs7QUN0QkQsd0I7Ozs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsa0I7Ozs7Ozs7QUNsQkQseUMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4vYXBwL2FwcC5tb2R1bGUnKTtcclxucmVxdWlyZSgnLi9hcHAvYXBwLnJvdXRlJyk7XHJcblxyXG5yZXF1aXJlKCcuL2FwcC9pZC1nZW5lcmF0b3Ivc2VydmljZScpO1xyXG5cclxucmVxdWlyZSgnLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9zZXJ2aWNlJyk7XHJcbnJlcXVpcmUoJy4vYXBwL2ludGVydmlldy1yZWNvcmQvZGlyZWN0aXZlJyk7XHJcbnJlcXVpcmUoJy4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlcicpO1xyXG5cclxucmVxdWlyZSgnLi9zaGVsbC1saWIvZmlsdGVyJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXF1aXJlZC1maWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJlcXVpcmUoJy4vaW50ZXJ2aWV3LXJlY29yZC9pbnRlcnZpZXctcmVjb3JkLm1vZHVsZScpO1xyXG4gICAgcmVxdWlyZSgnLi9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLm1vZHVsZScpO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld0FwcCcsIFsnbmdNZXNzYWdlcycsICdpbnRlcnZpZXdSZWNvcmQnLCAnaWRHZW5lcmF0b3InLCAndWkucm91dGVyJ10pXHJcbiAgICAgICAgLnJ1bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FuZ3VsYXIgYm9vdGVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgYW5ndWxhci5lbGVtZW50KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ2ludGVydmlld0FwcCddKTtcclxuICAgIH0pO1xyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvYXBwLm1vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3UmVjb3JkJywgW10pXHJcbiAgICAgICAgLnJ1bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZCBBcHAgbG9hZGVkJyk7XHJcbiAgICAgICAgfSk7XHJcbn0pKGFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvaW50ZXJ2aWV3LXJlY29yZC5tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG4oZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2lkR2VuZXJhdG9yJywgW10pXHJcbiAgICAgICAgLnJ1bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lEIGdlbmVyYXRvciBBcHAgbG9hZGVkJyk7XHJcbiAgICAgICAgfSk7XHJcbn0pKGFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3IubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2ludGVydmlld0FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhyb3V0ZUNvbmZpZyk7XHJcblxyXG4gICAgcm91dGVDb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gcm91dGVDb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL2ludGVydmlldy1yZWNvcmQvdmlldy9pbnRlcnZpZXctcmVjb3JkLWNyZWF0ZS1mb3JtLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2ludGVydmlld1JlY29yZENyZWF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnaW50ZXJ2aWV3LWxpc3QnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW50ZXJ2aWV3LWxpc3QnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL2ludGVydmlldy1yZWNvcmQvdmlldy9pbnRlcnZpZXctcmVjb3JkLWxpc3RzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2ludGVydmlld1JlY29yZExpc3RzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdpbnRlcnZpZXctbGlzdC5kZXRhaWxzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3tpZH0nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL2ludGVydmlldy1yZWNvcmQvdmlldy9pbnRlcnZpZXctcmVjb3JkLWRldGFpbHMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaW50ZXJ2aWV3UmVjb3JkRGV0YWlsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2UoJy8nKTtcclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2FwcC5yb3V0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9pZC1nZW5lcmF0b3Iuc2VydmljZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2lkR2VuZXJhdG9yJylcclxuICAgICAgICAuc2VydmljZSgnaWRHZW5lcmF0b3JTZXJ2aWNlJywgSWRHZW5lcmF0b3JTZXJ2aWNlKTtcclxuICAgIElkR2VuZXJhdG9yU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gSWRHZW5lcmF0b3JTZXJ2aWNlKCkge1xyXG4gICAgICAgIHZhciBJZEdlbmVyYXRvclNlcnZpY2UgPSB0aGlzO1xyXG4gICAgICAgIElkR2VuZXJhdG9yU2VydmljZS5nZW5lcmF0ZUlEID0gZ2VuZXJhdGVJRDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcjJyArIChyYW5kNSgpICsgcmFuZDUoKSArIHJhbmQ1KCkpLnN1YnN0cmluZygyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJhbmQ1KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2lkLWdlbmVyYXRvci5zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2ludGVydmlldy1yZWNvcmQuc2VydmljZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvc2VydmljZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpbnRlcnZpZXdSZWNvcmQnKVxyXG4gICAgICAgIC5zZXJ2aWNlKCdpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlJywgSW50ZXJ2aWV3UmVjb3JkU2VydmljZSk7XHJcbiAgICBJbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBJbnRlcnZpZXdSZWNvcmRTZXJ2aWNlKCkge1xyXG4gICAgICAgIHZhciBJbnRlcnZpZXdSZWNvcmRTZXJ2aWNlID0gdGhpcztcclxuICAgICAgICBJbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLnNhdmVJbnRlcnZpZXdSZWNvcmQgPSBzYXZlSW50ZXJ2aWV3UmVjb3JkO1xyXG4gICAgICAgIEludGVydmlld1JlY29yZFNlcnZpY2UuZ2V0SW50ZXJ2aWV3TGlzdCA9IGdldEludGVydmlld0xpc3Q7XHJcbiAgICAgICAgSW50ZXJ2aWV3UmVjb3JkU2VydmljZS5nZXRTcGVjaWZpY0ludGVydmlldyA9IGdldFNwZWNpZmljSW50ZXJ2aWV3O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzYXZlSW50ZXJ2aWV3UmVjb3JkKGludGVydmlldykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya3MnKTtcclxuICAgICAgICAgICAgdmFyIGludGVydmlld3M7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmludGVydmlld3MpIHtcclxuICAgICAgICAgICAgICAgIGludGVydmlld3MgPSBnZXRJbnRlcnZpZXdMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcnZpZXdzLnB1c2goaW50ZXJ2aWV3KTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbnRlcnZpZXdzJywgSlNPTi5zdHJpbmdpZnkoaW50ZXJ2aWV3cykpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGludGVydmlld3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIGludGVydmlld3MucHVzaChpbnRlcnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ludGVydmlld3MnLCBKU09OLnN0cmluZ2lmeShpbnRlcnZpZXdzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEludGVydmlld0xpc3QoKSB7XHJcbiAgICAgICAgICAgIGlmKGxvY2FsU3RvcmFnZS5pbnRlcnZpZXdzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ludGVydmlld3MnKSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3BlY2lmaWNJbnRlcnZpZXcoaW50ZXJ2aWV3SWQpIHtcclxuICAgICAgICAgICAgdmFyIGludGVydmlld3MgPSBnZXRJbnRlcnZpZXdMaXN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcnZpZXdzLmZpbHRlcihmdW5jdGlvbihpbnRlcnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcnZpZXcuaW50ZXJ2aWV3X2lkID09IGludGVydmlld0lkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL3NlcnZpY2UvaW50ZXJ2aWV3LXJlY29yZC5zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2ludGVydmlldy1mb3JtLXN0eWxlLmRpcmVjdGl2ZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvZGlyZWN0aXZlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld1JlY29yZCcpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnZm9ybVN0eWxlJywgRm9ybVN0eWxlKTtcclxuICAgIEZvcm1TdHlsZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gRm9ybVN0eWxlKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1Db2xvcigkc2NvcGUsIGVsZW0sIGF0dHIpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgndHlwZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSAnVmlzYScpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbVswXS5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcIiMzNTNjNTJcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5ld1ZhbHVlID09PSAnUGVybWFuZW50IHJlc2lkZW5jZScpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbVswXS5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcIiMyMjJcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkZG8gPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnPXR5cGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZvcm1Db2xvclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkZG87XHJcbiAgICB9XHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2RpcmVjdGl2ZS9pbnRlcnZpZXctZm9ybS1zdHlsZS5kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vaW50ZXJ2aWV3LXJlY29yZC1saXN0cy5jb250cm9sbGVyJyk7XHJcbnJlcXVpcmUoJy4vaW50ZXJ2aWV3LXJlY29yZC1jcmVhdGUtZm9ybS5jb250cm9sbGVyJyk7XHJcbnJlcXVpcmUoJy4vaW50ZXJ2aWV3LXJlY29yZC1kZXRhaWxzLmNvbnRyb2xsZXInKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld1JlY29yZCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2ludGVydmlld1JlY29yZExpc3RzQ29udHJvbGxlcicsIEludGVydmlld1JlY29yZExpc3RzQ29udHJvbGxlcik7XHJcblxyXG4gICAgSW50ZXJ2aWV3UmVjb3JkTGlzdHNDb250cm9sbGVyLiRpbmplY3QgPSBbJ2ludGVydmlld1JlY29yZFNlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBJbnRlcnZpZXdSZWNvcmRMaXN0c0NvbnRyb2xsZXIoaW50ZXJ2aWV3UmVjb3JkU2VydmljZSkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0uZ2V0SW50ZXJ2aWV3TGlzdCA9IGdldEludGVydmlld0xpc3Q7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEludGVydmlld0xpc3QoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnZpZXdzID0gaW50ZXJ2aWV3UmVjb3JkU2VydmljZS5nZXRJbnRlcnZpZXdMaXN0KCk7XHJcbiAgICAgICAgICAgIGlmKGludGVydmlld3MgJiYgaW50ZXJ2aWV3cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZtLmludGVydmlld0F2YWlsYWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2bS5pbnRlcnZpZXdzID0gaW50ZXJ2aWV3cy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB2bS5pbnRlcnZpZXdBdmFpbGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGdldEludGVydmlld0xpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXIvaW50ZXJ2aWV3LXJlY29yZC1saXN0cy5jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpbnRlcnZpZXdSZWNvcmQnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdpbnRlcnZpZXdSZWNvcmRDcmVhdGVDb250cm9sbGVyJywgSW50ZXJ2aWV3UmVjb3JkQ3JlYXRlQ29udHJvbGxlcik7XHJcblxyXG4gICAgSW50ZXJ2aWV3UmVjb3JkQ3JlYXRlQ29udHJvbGxlci4kaW5qZWN0ID0gWydpZEdlbmVyYXRvclNlcnZpY2UnLCAnaW50ZXJ2aWV3UmVjb3JkU2VydmljZScsICckc2NvcGUnLCAnZWxsaXBzaXNGaWx0ZXInXTtcclxuXHJcbiAgICBmdW5jdGlvbiBJbnRlcnZpZXdSZWNvcmRDcmVhdGVDb250cm9sbGVyKGlkR2VuZXJhdG9yU2VydmljZSwgaW50ZXJ2aWV3UmVjb3JkU2VydmljZSwgJHNjb3BlLCBlbGxpcHNpc0ZpbHRlcikge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0uc2F2ZUludGVydmlld1JlY29yZCA9IHNhdmVJbnRlcnZpZXdSZWNvcmQ7XHJcbiAgICAgICAgdm0uZ2VuZXJhdGVJRCA9IGdlbmVyYXRlSUQ7XHJcbiAgICAgICAgdm0uaW50ZXJ2aWV3ID0ge307XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVJbnRlcnZpZXdSZWNvcmQoKSB7XHJcbiAgICAgICAgICAgIGludGVydmlld1JlY29yZFNlcnZpY2Uuc2F2ZUludGVydmlld1JlY29yZCh2bS5pbnRlcnZpZXcpO1xyXG4gICAgICAgICAgICB2bS5pbnRlcnZpZXcgPSB7fTtcclxuICAgICAgICAgICAgJHNjb3BlLmludGVydmlld0NyZWF0ZUZvcm0uJHNldFByaXN0aW5lKCk7XHJcbiAgICAgICAgICAgICRzY29wZS5pbnRlcnZpZXdDcmVhdGVGb3JtLiRzZXRVbnRvdWNoZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlSUQoKSB7XHJcbiAgICAgICAgICAgIHZtLmludGVydmlldy5pbnRlcnZpZXdfaWQgPSBpZEdlbmVyYXRvclNlcnZpY2UuZ2VuZXJhdGVJRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCcpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdCA9IGVsbGlwc2lzRmlsdGVyKCdob3cgYXJlIHlvdSBtYW4/IEFyZSB5b3UgdGhlcmU/JywgMTIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlci9pbnRlcnZpZXctcmVjb3JkLWNyZWF0ZS1mb3JtLmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld1JlY29yZCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2ludGVydmlld1JlY29yZERldGFpbENvbnRyb2xsZXInLCBJbnRlcnZpZXdSZWNvcmREZXRhaWxDb250cm9sbGVyKTtcclxuXHJcbiAgICBJbnRlcnZpZXdSZWNvcmREZXRhaWxDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzdGF0ZVBhcmFtcycsICdpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gSW50ZXJ2aWV3UmVjb3JkRGV0YWlsQ29udHJvbGxlcigkc3RhdGVQYXJhbXMsIGludGVydmlld1JlY29yZFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgIC8vdm0uZ2V0U3BlY2lmaWNJbnRlcnZpZXcgPSBnZXRTcGVjaWZpY0ludGVydmlldztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zLmlkKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgdm0uaW50ZXJ2aWV3ID0gaW50ZXJ2aWV3UmVjb3JkU2VydmljZS5nZXRTcGVjaWZpY0ludGVydmlldygkc3RhdGVQYXJhbXMuaWQpWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlci9pbnRlcnZpZXctcmVjb3JkLWRldGFpbHMuY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9lbGxpcHNpcy5maWx0ZXInKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NoZWxsLWxpYi9maWx0ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3QXBwJylcclxuICAgICAgICAuZmlsdGVyKCdlbGxpcHNpcycsIGVsbGlwc2lzRmlsdGVyKTtcclxuXHJcbiAgICBlbGxpcHNpc0ZpbHRlci4kaW5qZWN0ID0gWyckZmlsdGVyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gZWxsaXBzaXNGaWx0ZXIoJGZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0ZXh0LCBjb3VudCkge1xyXG4gICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiBjb3VudClcclxuICAgICAgICAgICAgICAgIHJldHVybiAkZmlsdGVyKCdsaW1pdFRvJykodGV4dCwgY291bnQgLSAxKSArICcuJztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NoZWxsLWxpYi9maWx0ZXIvZWxsaXBzaXMuZmlsdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3N0eWxlL3Nhc3MvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9