webpackJsonp([0],{

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
module.exports = __webpack_require__(79);


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
__webpack_require__(64);

__webpack_require__(65);
__webpack_require__(67);

__webpack_require__(69);
__webpack_require__(71);
__webpack_require__(73);

__webpack_require__(77);

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
        .module('idGenerator')
        .controller('idGeneratorController', IdGeneratorController);

    IdGeneratorController.$inject = [];

    function IdGeneratorController() {
        var vm = this;

        function init() {

        }

        init();

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

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);

/***/ }),

/***/ 72:
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

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);

/***/ }),

/***/ 74:
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

/***/ 75:
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

/***/ 76:
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

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);

/***/ }),

/***/ 78:
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

/***/ 79:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[58]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXF1aXJlZC1maWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBwLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9pbnRlcnZpZXctcmVjb3JkLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaWQtZ2VuZXJhdG9yL3NlcnZpY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2lkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9pZC1nZW5lcmF0b3IvY29udHJvbGxlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaWQtZ2VuZXJhdG9yL2NvbnRyb2xsZXIvaWQtZ2VuZXJhdG9yLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvc2VydmljZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9zZXJ2aWNlL2ludGVydmlldy1yZWNvcmQuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9kaXJlY3RpdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ludGVydmlldy1yZWNvcmQvZGlyZWN0aXZlL2ludGVydmlldy1mb3JtLXN0eWxlLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXIvaW50ZXJ2aWV3LXJlY29yZC1saXN0cy5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXIvaW50ZXJ2aWV3LXJlY29yZC1jcmVhdGUtZm9ybS5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXIvaW50ZXJ2aWV3LXJlY29yZC1kZXRhaWxzLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2hlbGwtbGliL2ZpbHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zaGVsbC1saWIvZmlsdGVyL2VsbGlwc2lzLmZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3R5bGUvc2Fzcy9tYWluLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLGtCOzs7Ozs7O0FDYkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsQ0FBQyxXOzs7Ozs7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsQ0FBQyxXOzs7Ozs7O0FDUkQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSx3QkFBd0IsR0FBRztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQjs7Ozs7OztBQzdCRCx3Qjs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyxrQjs7Ozs7OztBQ3JCRCx3Qjs7Ozs7OztBQ0FBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxDQUFDLGtCOzs7Ozs7O0FDbkJELHdCOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsQ0FBQyxrQjs7Ozs7OztBQzNDRCx3Qjs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUMsa0I7Ozs7Ozs7QUMxQkQ7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDLGtCOzs7Ozs7O0FDN0JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUMsa0I7Ozs7Ozs7QUNsQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUMsa0I7Ozs7Ozs7QUN0QkQsd0I7Ozs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsa0I7Ozs7Ozs7QUNsQkQseUMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4vYXBwL2FwcC5tb2R1bGUnKTtcclxucmVxdWlyZSgnLi9hcHAvYXBwLnJvdXRlJyk7XHJcblxyXG5yZXF1aXJlKCcuL2FwcC9pZC1nZW5lcmF0b3Ivc2VydmljZScpO1xyXG5yZXF1aXJlKCcuL2FwcC9pZC1nZW5lcmF0b3IvY29udHJvbGxlcicpO1xyXG5cclxucmVxdWlyZSgnLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9zZXJ2aWNlJyk7XHJcbnJlcXVpcmUoJy4vYXBwL2ludGVydmlldy1yZWNvcmQvZGlyZWN0aXZlJyk7XHJcbnJlcXVpcmUoJy4vYXBwL2ludGVydmlldy1yZWNvcmQvY29udHJvbGxlcicpO1xyXG5cclxucmVxdWlyZSgnLi9zaGVsbC1saWIvZmlsdGVyJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXF1aXJlZC1maWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJlcXVpcmUoJy4vaW50ZXJ2aWV3LXJlY29yZC9pbnRlcnZpZXctcmVjb3JkLm1vZHVsZScpO1xyXG4gICAgcmVxdWlyZSgnLi9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLm1vZHVsZScpO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld0FwcCcsIFsnbmdNZXNzYWdlcycsICdpbnRlcnZpZXdSZWNvcmQnLCAnaWRHZW5lcmF0b3InLCAndWkucm91dGVyJ10pXHJcbiAgICAgICAgLnJ1bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FuZ3VsYXIgYm9vdGVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgYW5ndWxhci5lbGVtZW50KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ2ludGVydmlld0FwcCddKTtcclxuICAgIH0pO1xyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvYXBwLm1vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3UmVjb3JkJywgW10pXHJcbiAgICAgICAgLnJ1bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZCBBcHAgbG9hZGVkJyk7XHJcbiAgICAgICAgfSk7XHJcbn0pKGFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2ludGVydmlldy1yZWNvcmQvaW50ZXJ2aWV3LXJlY29yZC5tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xyXG4oZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2lkR2VuZXJhdG9yJywgW10pXHJcbiAgICAgICAgLnJ1bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lEIGdlbmVyYXRvciBBcHAgbG9hZGVkJyk7XHJcbiAgICAgICAgfSk7XHJcbn0pKGFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3IubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2ludGVydmlld0FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhyb3V0ZUNvbmZpZyk7XHJcblxyXG4gICAgcm91dGVDb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gcm91dGVDb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL2ludGVydmlldy1yZWNvcmQvdmlldy9pbnRlcnZpZXctcmVjb3JkLWNyZWF0ZS1mb3JtLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2ludGVydmlld1JlY29yZENyZWF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnaW50ZXJ2aWV3LWxpc3QnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW50ZXJ2aWV3LWxpc3QnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL2ludGVydmlldy1yZWNvcmQvdmlldy9pbnRlcnZpZXctcmVjb3JkLWxpc3RzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2ludGVydmlld1JlY29yZExpc3RzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdpbnRlcnZpZXctbGlzdC5kZXRhaWxzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3tpZH0nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL2ludGVydmlldy1yZWNvcmQvdmlldy9pbnRlcnZpZXctcmVjb3JkLWRldGFpbHMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaW50ZXJ2aWV3UmVjb3JkRGV0YWlsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2UoJy8nKTtcclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2FwcC5yb3V0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9pZC1nZW5lcmF0b3Iuc2VydmljZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2lkR2VuZXJhdG9yJylcclxuICAgICAgICAuc2VydmljZSgnaWRHZW5lcmF0b3JTZXJ2aWNlJywgSWRHZW5lcmF0b3JTZXJ2aWNlKTtcclxuICAgIElkR2VuZXJhdG9yU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gSWRHZW5lcmF0b3JTZXJ2aWNlKCkge1xyXG4gICAgICAgIHZhciBJZEdlbmVyYXRvclNlcnZpY2UgPSB0aGlzO1xyXG4gICAgICAgIElkR2VuZXJhdG9yU2VydmljZS5nZW5lcmF0ZUlEID0gZ2VuZXJhdGVJRDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcjJyArIChyYW5kNSgpICsgcmFuZDUoKSArIHJhbmQ1KCkpLnN1YnN0cmluZygyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJhbmQ1KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSkod2luZG93LmFuZ3VsYXIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2lkLWdlbmVyYXRvci9zZXJ2aWNlL2lkLWdlbmVyYXRvci5zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2lkLWdlbmVyYXRvci5jb250cm9sbGVyJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaWQtZ2VuZXJhdG9yL2NvbnRyb2xsZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2lkR2VuZXJhdG9yJylcclxuICAgICAgICAuY29udHJvbGxlcignaWRHZW5lcmF0b3JDb250cm9sbGVyJywgSWRHZW5lcmF0b3JDb250cm9sbGVyKTtcclxuXHJcbiAgICBJZEdlbmVyYXRvckNvbnRyb2xsZXIuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIElkR2VuZXJhdG9yQ29udHJvbGxlcigpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pZC1nZW5lcmF0b3IvY29udHJvbGxlci9pZC1nZW5lcmF0b3IuY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9pbnRlcnZpZXctcmVjb3JkLnNlcnZpY2UnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL3NlcnZpY2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihhbmd1bGFyKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3UmVjb3JkJylcclxuICAgICAgICAuc2VydmljZSgnaW50ZXJ2aWV3UmVjb3JkU2VydmljZScsIEludGVydmlld1JlY29yZFNlcnZpY2UpO1xyXG4gICAgSW50ZXJ2aWV3UmVjb3JkU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gSW50ZXJ2aWV3UmVjb3JkU2VydmljZSgpIHtcclxuICAgICAgICB2YXIgSW50ZXJ2aWV3UmVjb3JkU2VydmljZSA9IHRoaXM7XHJcbiAgICAgICAgSW50ZXJ2aWV3UmVjb3JkU2VydmljZS5zYXZlSW50ZXJ2aWV3UmVjb3JkID0gc2F2ZUludGVydmlld1JlY29yZDtcclxuICAgICAgICBJbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLmdldEludGVydmlld0xpc3QgPSBnZXRJbnRlcnZpZXdMaXN0O1xyXG4gICAgICAgIEludGVydmlld1JlY29yZFNlcnZpY2UuZ2V0U3BlY2lmaWNJbnRlcnZpZXcgPSBnZXRTcGVjaWZpY0ludGVydmlldztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2F2ZUludGVydmlld1JlY29yZChpbnRlcnZpZXcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dvcmtzJyk7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnZpZXdzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5pbnRlcnZpZXdzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnRlcnZpZXdzID0gZ2V0SW50ZXJ2aWV3TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJ2aWV3cy5wdXNoKGludGVydmlldyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW50ZXJ2aWV3cycsIEpTT04uc3RyaW5naWZ5KGludGVydmlld3MpKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnRlcnZpZXdzID0gW107XHJcbiAgICAgICAgICAgICAgICBpbnRlcnZpZXdzLnB1c2goaW50ZXJ2aWV3KTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbnRlcnZpZXdzJywgSlNPTi5zdHJpbmdpZnkoaW50ZXJ2aWV3cykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRJbnRlcnZpZXdMaXN0KCkge1xyXG4gICAgICAgICAgICBpZihsb2NhbFN0b3JhZ2UuaW50ZXJ2aWV3cylcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbnRlcnZpZXdzJykpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFNwZWNpZmljSW50ZXJ2aWV3KGludGVydmlld0lkKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnZpZXdzID0gZ2V0SW50ZXJ2aWV3TGlzdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJ2aWV3cy5maWx0ZXIoZnVuY3Rpb24oaW50ZXJ2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJ2aWV3LmludGVydmlld19pZCA9PSBpbnRlcnZpZXdJZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9zZXJ2aWNlL2ludGVydmlldy1yZWNvcmQuc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9pbnRlcnZpZXctZm9ybS1zdHlsZS5kaXJlY3RpdmUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2RpcmVjdGl2ZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpbnRlcnZpZXdSZWNvcmQnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2Zvcm1TdHlsZScsIEZvcm1TdHlsZSk7XHJcbiAgICBGb3JtU3R5bGUuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIEZvcm1TdHlsZSgpIHtcclxuICAgICAgICBmdW5jdGlvbiBmb3JtQ29sb3IoJHNjb3BlLCBlbGVtLCBhdHRyKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ3R5cGUnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gJ1Zpc2EnKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0ucGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjMzUzYzUyXCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSA9PT0gJ1Blcm1hbmVudCByZXNpZGVuY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0ucGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjMjIyXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGRvID0ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJz10eXBlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmb3JtQ29sb3JcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGRvO1xyXG4gICAgfVxyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9kaXJlY3RpdmUvaW50ZXJ2aWV3LWZvcm0tc3R5bGUuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2ludGVydmlldy1yZWNvcmQtbGlzdHMuY29udHJvbGxlcicpO1xyXG5yZXF1aXJlKCcuL2ludGVydmlldy1yZWNvcmQtY3JlYXRlLWZvcm0uY29udHJvbGxlcicpO1xyXG5yZXF1aXJlKCcuL2ludGVydmlldy1yZWNvcmQtZGV0YWlscy5jb250cm9sbGVyJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpbnRlcnZpZXdSZWNvcmQnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdpbnRlcnZpZXdSZWNvcmRMaXN0c0NvbnRyb2xsZXInLCBJbnRlcnZpZXdSZWNvcmRMaXN0c0NvbnRyb2xsZXIpO1xyXG5cclxuICAgIEludGVydmlld1JlY29yZExpc3RzQ29udHJvbGxlci4kaW5qZWN0ID0gWydpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gSW50ZXJ2aWV3UmVjb3JkTGlzdHNDb250cm9sbGVyKGludGVydmlld1JlY29yZFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgIHZtLmdldEludGVydmlld0xpc3QgPSBnZXRJbnRlcnZpZXdMaXN0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRJbnRlcnZpZXdMaXN0KCkge1xyXG4gICAgICAgICAgICB2YXIgaW50ZXJ2aWV3cyA9IGludGVydmlld1JlY29yZFNlcnZpY2UuZ2V0SW50ZXJ2aWV3TGlzdCgpO1xyXG4gICAgICAgICAgICBpZihpbnRlcnZpZXdzICYmIGludGVydmlld3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5pbnRlcnZpZXdBdmFpbGFiaWxpdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdm0uaW50ZXJ2aWV3cyA9IGludGVydmlld3MucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgdm0uaW50ZXJ2aWV3QXZhaWxhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBnZXRJbnRlcnZpZXdMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW50ZXJ2aWV3LXJlY29yZC9jb250cm9sbGVyL2ludGVydmlldy1yZWNvcmQtbGlzdHMuY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGFuZ3VsYXIpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnaW50ZXJ2aWV3UmVjb3JkJylcclxuICAgICAgICAuY29udHJvbGxlcignaW50ZXJ2aWV3UmVjb3JkQ3JlYXRlQ29udHJvbGxlcicsIEludGVydmlld1JlY29yZENyZWF0ZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIEludGVydmlld1JlY29yZENyZWF0ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnaWRHZW5lcmF0b3JTZXJ2aWNlJywgJ2ludGVydmlld1JlY29yZFNlcnZpY2UnLCAnJHNjb3BlJywgJ2VsbGlwc2lzRmlsdGVyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gSW50ZXJ2aWV3UmVjb3JkQ3JlYXRlQ29udHJvbGxlcihpZEdlbmVyYXRvclNlcnZpY2UsIGludGVydmlld1JlY29yZFNlcnZpY2UsICRzY29wZSwgZWxsaXBzaXNGaWx0ZXIpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgIHZtLnNhdmVJbnRlcnZpZXdSZWNvcmQgPSBzYXZlSW50ZXJ2aWV3UmVjb3JkO1xyXG4gICAgICAgIHZtLmdlbmVyYXRlSUQgPSBnZW5lcmF0ZUlEO1xyXG4gICAgICAgIHZtLmludGVydmlldyA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzYXZlSW50ZXJ2aWV3UmVjb3JkKCkge1xyXG4gICAgICAgICAgICBpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlLnNhdmVJbnRlcnZpZXdSZWNvcmQodm0uaW50ZXJ2aWV3KTtcclxuICAgICAgICAgICAgdm0uaW50ZXJ2aWV3ID0ge307XHJcbiAgICAgICAgICAgICRzY29wZS5pbnRlcnZpZXdDcmVhdGVGb3JtLiRzZXRQcmlzdGluZSgpO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW50ZXJ2aWV3Q3JlYXRlRm9ybS4kc2V0VW50b3VjaGVkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZUlEKCkge1xyXG4gICAgICAgICAgICB2bS5pbnRlcnZpZXcuaW50ZXJ2aWV3X2lkID0gaWRHZW5lcmF0b3JTZXJ2aWNlLmdlbmVyYXRlSUQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkZWQnKTtcclxuICAgICAgICAgICAgdmFyIHRlc3QgPSBlbGxpcHNpc0ZpbHRlcignaG93IGFyZSB5b3UgbWFuPyBBcmUgeW91IHRoZXJlPycsIDEyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXIvaW50ZXJ2aWV3LXJlY29yZC1jcmVhdGUtZm9ybS5jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdpbnRlcnZpZXdSZWNvcmQnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdpbnRlcnZpZXdSZWNvcmREZXRhaWxDb250cm9sbGVyJywgSW50ZXJ2aWV3UmVjb3JkRGV0YWlsQ29udHJvbGxlcik7XHJcblxyXG4gICAgSW50ZXJ2aWV3UmVjb3JkRGV0YWlsQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc3RhdGVQYXJhbXMnLCAnaW50ZXJ2aWV3UmVjb3JkU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIEludGVydmlld1JlY29yZERldGFpbENvbnRyb2xsZXIoJHN0YXRlUGFyYW1zLCBpbnRlcnZpZXdSZWNvcmRTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICAvL3ZtLmdldFNwZWNpZmljSW50ZXJ2aWV3ID0gZ2V0U3BlY2lmaWNJbnRlcnZpZXc7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5pZCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHZtLmludGVydmlldyA9IGludGVydmlld1JlY29yZFNlcnZpY2UuZ2V0U3BlY2lmaWNJbnRlcnZpZXcoJHN0YXRlUGFyYW1zLmlkKVswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcbn0pKHdpbmRvdy5hbmd1bGFyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbnRlcnZpZXctcmVjb3JkL2NvbnRyb2xsZXIvaW50ZXJ2aWV3LXJlY29yZC1kZXRhaWxzLmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vZWxsaXBzaXMuZmlsdGVyJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zaGVsbC1saWIvZmlsdGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oYW5ndWxhcikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2ludGVydmlld0FwcCcpXHJcbiAgICAgICAgLmZpbHRlcignZWxsaXBzaXMnLCBlbGxpcHNpc0ZpbHRlcik7XHJcblxyXG4gICAgZWxsaXBzaXNGaWx0ZXIuJGluamVjdCA9IFsnJGZpbHRlciddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGVsbGlwc2lzRmlsdGVyKCRmaWx0ZXIpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24odGV4dCwgY291bnQpIHtcclxuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gY291bnQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJGZpbHRlcignbGltaXRUbycpKHRleHQsIGNvdW50IC0gMSkgKyAnLic7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG59KSh3aW5kb3cuYW5ndWxhcik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zaGVsbC1saWIvZmlsdGVyL2VsbGlwc2lzLmZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9zdHlsZS9zYXNzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==