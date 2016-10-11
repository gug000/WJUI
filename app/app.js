(function () {
    'use strict';
    var app = angular.module('app');
    app.config(['$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        '$uibTooltipProvider',
        'routes',
        function ($stateProvider,
                  $urlRouterProvider,
                  $locationProvider,
                  $httpProvider,
                  $uibTooltipProvider,
                  routes) {
            // add interceptors service for auth feature.
            //$httpProvider.interceptors.push('httpInterceptor');

            // route
            configRoute();

            // locale.
            // configLocale();

            /************ private methods **********/
            function configRoute() {
                routes.forEach(function (r) {
                    $stateProvider.state(r.state, r.config);
                });

                $urlRouterProvider.otherwise('/login');
            }

            function configLocale() {
                // locale.
                $translateProvider.useSanitizeValueStrategy('escaped');

                $translateProvider.useStaticFilesLoader({
                    prefix: 'resources/locale.',
                    suffix: '.json'
                });

                // config translate adaptor and try to find preferred language by yourself.
                $translateProvider
                    .registerAvailableLanguageKeys(['en', 'cn'], {
                        'en_US': 'en',
                        'en_UK': 'en',
                        'zh_CN': 'cn',
                        'zh': 'cn'
                    })
                    .determinePreferredLanguage();

                // store the language in storage.
                $translateProvider.useLocalStorage();
            };
            /**************************************/
        }
    ]);
    app.run(['$rootScope','appStatic',function($rootScope,appStatic){
        $rootScope.baseUrl = appStatic.baseUrl;
    }]);

}());