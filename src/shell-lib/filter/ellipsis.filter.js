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