(function(){
    'use strict';
    angular.module('WJUIDirectives').directive('wjLogin',['$rootScope','$timeout',function($rootScope,$timeout){
        return {
            restrict: 'E',
            replace: true,
            scope : {

            },
            templateUrl : 'WJUI/ui/wjLogin/wjuiLogin.tpl.html',
            link : function(scope, element, attrs, controller){
                $timeout(function(){
                    scope.shContent = true;
                },30);

            }
        };
    }]);
}());