/**
 * Created by admin on 2016/9/29.
 */
(function () {
    'use strict';

    //xgMessage
    angular.module('WJUIDirectives').directive('wjuiInput', ['$rootScope',
        function ($rootScope) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    type:'@',
                    className: '@',
                    wrapClassName:'@',
                    placeholder: '@',
                    id:'@',
                    value:'=',
                    ngModel:'=',
                    change:'&'
                },
                templateUrl: 'WJUI/ui/wjInput/wjuiInput.html',
                link: function (scope, element, attrs) {

                    element.children("input").each(function(index,ele,array){
                        if(ele.className.indexOf("wj-input-control")<0){
                            ele.classList.add("wj-input-control");
                        }
                    });
                    scope.type = scope.type || 'text';
                    scope.wrapClassName = scope.wrapClassName;
                    scope.id = scope.id;

                    scope.hasFocus = false;
                    scope.onChange = function () {
                        scope.change && scope.change({
                            value: scope.ngModel
                        });
                    };

                }
            };
        }]);
}());
