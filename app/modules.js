(function(){
    'use strict';
    angular.module('WJUIDirectives', []);
    angular.module('appConstants', []);
    angular.module('app',[
        /*base module*/
        'ui.router',
        'ngSanitize',

        /*bootstrap*/
        'ui.bootstrap',

        'ngAnimate',
        'toaster',
        'angularMoment',

        /*upload*/
        'ngFileUpload',

        /*translate*/
        'ngCookies',

        'ngMessages',
        'ngPassword',

        /*application module*/
        'appConstants',
        'WJUIDirectives'
    ]);
}());