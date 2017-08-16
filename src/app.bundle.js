webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(20);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(10);
__webpack_require__(12);
__webpack_require__(14);

__webpack_require__(18);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function(angular) {
    'use strict';
    __webpack_require__(4);
    __webpack_require__(6);
    angular
        .module('interviewApp', ['ngMessages', 'interviewRecord', 'idGenerator', 'ui.router', 'angularjs-datetime-picker'])
        .run(function() {
            console.log('Angular booted');
        });

    angular.element(function() {
        angular.bootstrap(document, ['interviewApp']);
    });
})(window.angular);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);
(function(angular) {
    'use strict';
    angular
        .module('interviewRecord', [])
        .run(function() {
            console.log('Record App loaded');
        });
})(angular);

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);
(function(angular) {
    'use strict';
    angular
        .module('idGenerator', [])
        .run(function() {
            console.log('ID generator App loaded');
        });
})(angular);

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);

/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXF1aXJlZC1maWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBwLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9pbnRlcnZpZXctcmVjb3JkLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaWQtZ2VuZXJhdG9yL3NlcnZpY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2lkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9pbnRlcnZpZXctcmVjb3JkL3NlcnZpY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvc2VydmljZS9pbnRlcnZpZXctcmVjb3JkLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvZGlyZWN0aXZlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9pbnRlcnZpZXctcmVjb3JkL2RpcmVjdGl2ZS9pbnRlcnZpZXctZm9ybS1zdHlsZS5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtbGlzdHMuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtY3JlYXRlLWZvcm0uY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtZGV0YWlscy5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NoZWxsLWxpYi9maWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2hlbGwtbGliL2ZpbHRlci9lbGxpcHNpcy5maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3N0eWxlL3Nhc3MvbWFpbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Qjs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLGtCOzs7Ozs7QUNiRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxDQUFDLFc7Ozs7Ozs7QUNSRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxDQUFDLFc7Ozs7OztBQ1JEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0JBQXdCLEdBQUc7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0I7Ozs7OztBQzdCRCx1Qjs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLGtCOzs7Ozs7QUNyQkQsd0I7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLENBQUMsa0I7Ozs7OztBQzNDRCx3Qjs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyxrQjs7Ozs7O0FDMUJEO0FBQ0E7QUFDQSx3Qjs7Ozs7O0FDRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDLGtCOzs7Ozs7QUM3QkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQyxrQjs7Ozs7O0FDbENEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDLGtCOzs7Ozs7QUN0QkQsd0I7Ozs7OztBQ0FBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxrQjs7Ozs7O0FDbEJELHlDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL2FwcC9hcHAubW9kdWxlJyk7XHJcbnJlcXVpcmUoJy4vYXBwL2FwcC5yb3V0ZScpO1xyXG5cclxucmVxdWlyZSgnLi9hcHAvaWQtZ2VuZXJhdG9yL3NlcnZpY2UnKTtcclxuXHJcbnJlcXVpcmUoJy4vYXBwL2ludGVydmlldy1yZWNvcmQvc2VydmljZScpO1xyXG5yZXF1aXJlKCcuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2RpcmVjdGl2ZScpO1xyXG5yZXF1aXJlKCcuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXInKTtcclxuXHJcbnJlcXVpcmUoJy4vc2hlbGwtbGliL2ZpbHRlcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVxdWlyZWQtZmlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJlcXVpcmUoJy4vaW50ZXJ2aWV3LXJlY29yZC9pbnRlcnZpZXctcmVjb3JkLm1vZHVsZScpO1xyXG4gICAgcmVxdWlyZSgnLi9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLm1vZHVsZScpO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld0FwcCcsIFsnbmdNZXNzYWdlcycsICdpbnRlcnZpZXdSZWNvcmQnLCAnaWRHZW5lcmF0b3InLCAndWkucm91dGVyJywgJ2FuZ3VsYXJqcy1kYXRldGltZS1waWNrZXInXSlcclxuICAgICAgICAucnVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQW5ndWxhciBib290ZWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBhbmd1bGFyLmVsZW1lbnQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnaW50ZXJ2aWV3QXBwJ10pO1xyXG4gICAgfSk7XHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9hcHAubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG4oZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld1JlY29yZCcsIFtdKVxyXG4gICAgICAgIC5ydW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWNvcmQgQXBwIGxvYWRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG59KShhbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2ludGVydmlldy1yZWNvcmQubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG4oZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2lkR2VuZXJhdG9yJywgW10pXHJcbiAgICAgICAgLnJ1bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lEIGdlbmVyYXRvciBBcHAgbG9hZGVkJyk7XHJcbiAgICAgICAgfSk7XHJcbn0pKGFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3IubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnaW50ZXJ2aWV3QXBwJylcclxuICAgICAgICAuY29uZmlnKHJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICByb3V0ZUNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcclxuXHJcbiAgICBmdW5jdGlvbiByb3V0ZUNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdob21lJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NyYy9hcHAvaW50ZXJ2aWV3LXJlY29yZC92aWV3L2ludGVydmlldy1yZWNvcmQtY3JlYXRlLWZvcm0uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaW50ZXJ2aWV3UmVjb3JkQ3JlYXRlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdpbnRlcnZpZXctbGlzdCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9pbnRlcnZpZXctbGlzdCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NyYy9hcHAvaW50ZXJ2aWV3LXJlY29yZC92aWV3L2ludGVydmlldy1yZWNvcmQtbGlzdHMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaW50ZXJ2aWV3UmVjb3JkTGlzdHNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2ludGVydmlldy1saXN0LmRldGFpbHMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcve2lkfScsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NyYy9hcHAvaW50ZXJ2aWV3LXJlY29yZC92aWV3L2ludGVydmlldy1yZWNvcmQtZGV0YWlscy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbnRlcnZpZXdSZWNvcmREZXRhaWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXJcclxuICAgICAgICAgICAgLm90aGVyd2lzZSgnLycpO1xyXG4gICAgfVxyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvYXBwLnJvdXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vaWQtZ2VuZXJhdG9yLnNlcnZpY2UnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pZC1nZW5lcmF0b3Ivc2VydmljZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2lkR2VuZXJhdG9yJylcclxuICAgICAgICAuc2VydmljZSgnaWRHZW5lcmF0b3JTZXJ2aWNlJywgSWRHZW5lcmF0b3JTZXJ2aWNlKTtcclxuICAgIElkR2VuZXJhdG9yU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gSWRHZW5lcmF0b3JTZXJ2aWNlKCkge1xyXG4gICAgICAgIHZhciBJZEdlbmVyYXRvclNlcnZpY2UgPSB0aGlzO1xyXG4gICAgICAgIElkR2VuZXJhdG9yU2VydmljZS5nZW5lcmF0ZUlEID0gZ2VuZXJhdGVJRDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcjJyArIChyYW5kNSgpICsgcmFuZDUoKSArIHJhbmQ1KCkpLnN1YnN0cmluZygyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJhbmQ1KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2lkLWdlbmVyYXRvci5zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vaW50ZXJ2aWV3LXJlY29yZC5zZXJ2aWNlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9zZXJ2aWNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld1JlY29yZCcpXHJcbiAgICAgICAgLnNlcnZpY2UoJ2ludGVydmlld1JlY29yZFNlcnZpY2UnLCBJbnRlcnZpZXdSZWNvcmRTZXJ2aWNlKTtcclxuICAgIEludGVydmlld1JlY29yZFNlcnZpY2UuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIEludGVydmlld1JlY29yZFNlcnZpY2UoKSB7XHJcbiAgICAgICAgdmFyIEludGVydmlld1JlY29yZFNlcnZpY2UgPSB0aGlzO1xyXG4gICAgICAgIEludGVydmlld1JlY29yZFNlcnZpY2Uuc2F2ZUludGVydmlld1JlY29yZCA9IHNhdmVJbnRlcnZpZXdSZWNvcmQ7XHJcbiAgICAgICAgSW50ZXJ2aWV3UmVjb3JkU2VydmljZS5nZXRJbnRlcnZpZXdMaXN0ID0gZ2V0SW50ZXJ2aWV3TGlzdDtcclxuICAgICAgICBJbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLmdldFNwZWNpZmljSW50ZXJ2aWV3ID0gZ2V0U3BlY2lmaWNJbnRlcnZpZXc7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVJbnRlcnZpZXdSZWNvcmQoaW50ZXJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXb3JrcycpO1xyXG4gICAgICAgICAgICB2YXIgaW50ZXJ2aWV3cztcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaW50ZXJ2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJ2aWV3cyA9IGdldEludGVydmlld0xpc3QoKTtcclxuICAgICAgICAgICAgICAgIGludGVydmlld3MucHVzaChpbnRlcnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ludGVydmlld3MnLCBKU09OLnN0cmluZ2lmeShpbnRlcnZpZXdzKSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJ2aWV3cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJ2aWV3cy5wdXNoKGludGVydmlldyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW50ZXJ2aWV3cycsIEpTT04uc3RyaW5naWZ5KGludGVydmlld3MpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SW50ZXJ2aWV3TGlzdCgpIHtcclxuICAgICAgICAgICAgaWYobG9jYWxTdG9yYWdlLmludGVydmlld3MpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW50ZXJ2aWV3cycpKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRTcGVjaWZpY0ludGVydmlldyhpbnRlcnZpZXdJZCkge1xyXG4gICAgICAgICAgICB2YXIgaW50ZXJ2aWV3cyA9IGdldEludGVydmlld0xpc3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVydmlld3MuZmlsdGVyKGZ1bmN0aW9uKGludGVydmlldykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVydmlldy5pbnRlcnZpZXdfaWQgPT0gaW50ZXJ2aWV3SWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvc2VydmljZS9pbnRlcnZpZXctcmVjb3JkLnNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vaW50ZXJ2aWV3LWZvcm0tc3R5bGUuZGlyZWN0aXZlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9kaXJlY3RpdmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3UmVjb3JkJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdmb3JtU3R5bGUnLCBGb3JtU3R5bGUpO1xyXG4gICAgRm9ybVN0eWxlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBGb3JtU3R5bGUoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZm9ybUNvbG9yKCRzY29wZSwgZWxlbSwgYXR0cikge1xyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCd0eXBlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09ICdWaXNhJylcclxuICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzM1M2M1MlwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3VmFsdWUgPT09ICdQZXJtYW5lbnQgcmVzaWRlbmNlJylcclxuICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzIyMlwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRkbyA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICc9dHlwZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZm9ybUNvbG9yXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRkbztcclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvZGlyZWN0aXZlL2ludGVydmlldy1mb3JtLXN0eWxlLmRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9pbnRlcnZpZXctcmVjb3JkLWxpc3RzLmNvbnRyb2xsZXInKTtcclxucmVxdWlyZSgnLi9pbnRlcnZpZXctcmVjb3JkLWNyZWF0ZS1mb3JtLmNvbnRyb2xsZXInKTtcclxucmVxdWlyZSgnLi9pbnRlcnZpZXctcmVjb3JkLWRldGFpbHMuY29udHJvbGxlcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3UmVjb3JkJylcclxuICAgICAgICAuY29udHJvbGxlcignaW50ZXJ2aWV3UmVjb3JkTGlzdHNDb250cm9sbGVyJywgSW50ZXJ2aWV3UmVjb3JkTGlzdHNDb250cm9sbGVyKTtcclxuXHJcbiAgICBJbnRlcnZpZXdSZWNvcmRMaXN0c0NvbnRyb2xsZXIuJGluamVjdCA9IFsnaW50ZXJ2aWV3UmVjb3JkU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIEludGVydmlld1JlY29yZExpc3RzQ29udHJvbGxlcihpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS5nZXRJbnRlcnZpZXdMaXN0ID0gZ2V0SW50ZXJ2aWV3TGlzdDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SW50ZXJ2aWV3TGlzdCgpIHtcclxuICAgICAgICAgICAgdmFyIGludGVydmlld3MgPSBpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLmdldEludGVydmlld0xpc3QoKTtcclxuICAgICAgICAgICAgaWYoaW50ZXJ2aWV3cyAmJiBpbnRlcnZpZXdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdm0uaW50ZXJ2aWV3QXZhaWxhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZtLmludGVydmlld3MgPSBpbnRlcnZpZXdzLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHZtLmludGVydmlld0F2YWlsYWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgZ2V0SW50ZXJ2aWV3TGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlci9pbnRlcnZpZXctcmVjb3JkLWxpc3RzLmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld1JlY29yZCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2ludGVydmlld1JlY29yZENyZWF0ZUNvbnRyb2xsZXInLCBJbnRlcnZpZXdSZWNvcmRDcmVhdGVDb250cm9sbGVyKTtcclxuXHJcbiAgICBJbnRlcnZpZXdSZWNvcmRDcmVhdGVDb250cm9sbGVyLiRpbmplY3QgPSBbJ2lkR2VuZXJhdG9yU2VydmljZScsICdpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlJywgJyRzY29wZScsICdlbGxpcHNpc0ZpbHRlciddO1xyXG5cclxuICAgIGZ1bmN0aW9uIEludGVydmlld1JlY29yZENyZWF0ZUNvbnRyb2xsZXIoaWRHZW5lcmF0b3JTZXJ2aWNlLCBpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLCAkc2NvcGUsIGVsbGlwc2lzRmlsdGVyKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS5zYXZlSW50ZXJ2aWV3UmVjb3JkID0gc2F2ZUludGVydmlld1JlY29yZDtcclxuICAgICAgICB2bS5nZW5lcmF0ZUlEID0gZ2VuZXJhdGVJRDtcclxuICAgICAgICB2bS5pbnRlcnZpZXcgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2F2ZUludGVydmlld1JlY29yZCgpIHtcclxuICAgICAgICAgICAgaW50ZXJ2aWV3UmVjb3JkU2VydmljZS5zYXZlSW50ZXJ2aWV3UmVjb3JkKHZtLmludGVydmlldyk7XHJcbiAgICAgICAgICAgIHZtLmludGVydmlldyA9IHt9O1xyXG4gICAgICAgICAgICAkc2NvcGUuaW50ZXJ2aWV3Q3JlYXRlRm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuICAgICAgICAgICAgJHNjb3BlLmludGVydmlld0NyZWF0ZUZvcm0uJHNldFVudG91Y2hlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVJRCgpIHtcclxuICAgICAgICAgICAgdm0uaW50ZXJ2aWV3LmludGVydmlld19pZCA9IGlkR2VuZXJhdG9yU2VydmljZS5nZW5lcmF0ZUlEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9hZGVkJyk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0ID0gZWxsaXBzaXNGaWx0ZXIoJ2hvdyBhcmUgeW91IG1hbj8gQXJlIHlvdSB0aGVyZT8nLCAxMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtY3JlYXRlLWZvcm0uY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3UmVjb3JkJylcclxuICAgICAgICAuY29udHJvbGxlcignaW50ZXJ2aWV3UmVjb3JkRGV0YWlsQ29udHJvbGxlcicsIEludGVydmlld1JlY29yZERldGFpbENvbnRyb2xsZXIpO1xyXG5cclxuICAgIEludGVydmlld1JlY29yZERldGFpbENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHN0YXRlUGFyYW1zJywgJ2ludGVydmlld1JlY29yZFNlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBJbnRlcnZpZXdSZWNvcmREZXRhaWxDb250cm9sbGVyKCRzdGF0ZVBhcmFtcywgaW50ZXJ2aWV3UmVjb3JkU2VydmljZSkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgLy92bS5nZXRTcGVjaWZpY0ludGVydmlldyA9IGdldFNwZWNpZmljSW50ZXJ2aWV3O1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMuaWQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICB2bS5pbnRlcnZpZXcgPSBpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLmdldFNwZWNpZmljSW50ZXJ2aWV3KCRzdGF0ZVBhcmFtcy5pZClbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtZGV0YWlscy5jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2VsbGlwc2lzLmZpbHRlcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2hlbGwtbGliL2ZpbHRlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpbnRlcnZpZXdBcHAnKVxyXG4gICAgICAgIC5maWx0ZXIoJ2VsbGlwc2lzJywgZWxsaXBzaXNGaWx0ZXIpO1xyXG5cclxuICAgIGVsbGlwc2lzRmlsdGVyLiRpbmplY3QgPSBbJyRmaWx0ZXInXTtcclxuXHJcbiAgICBmdW5jdGlvbiBlbGxpcHNpc0ZpbHRlcigkZmlsdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQsIGNvdW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA+IGNvdW50KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRmaWx0ZXIoJ2xpbWl0VG8nKSh0ZXh0LCBjb3VudCAtIDEpICsgJy4nO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2hlbGwtbGliL2ZpbHRlci9lbGxpcHNpcy5maWx0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvc3R5bGUvc2Fzcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=