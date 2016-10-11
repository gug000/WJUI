(function(){
    'use strict';
    var getRoutes = function(){
        return [
            {
                state: 'sample',
                config: {
                    url: '/sample',
                    templateUrl: 'modules/samples/sample.html',
                    controller: 'SampleController'
                }
            },
            {
                state: 'login',
                config: {
                    url: '/login?returnUrl',
                    templateUrl: 'modules/login/login.html',
                    controller: 'LoginController'
                }
            },
            {
                state: 'dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'modules/dashboard/dashboard.html',
                    controller: 'DashboardController'
                }
            }
        ]
    };
    angular.module('appConstants').constant('routes',getRoutes());

}());