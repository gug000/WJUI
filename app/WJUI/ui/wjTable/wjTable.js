/**
 * Created by admin on 2016/10/9.
 */

(function () {
    'use strict';

    angular.module('WJUIDirectives').directive('wjuiTable', ['$rootScope',
        function ($rootScope) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    //列表名
                    itemName:'=',
                    //列表内容
                    items:'='
                },
                templateUrl: 'WJUI/ui/wjTable/wjTable.tpl.html',
                link: function (scope, element, attrs) {

                }
            };
        }]);
}());
