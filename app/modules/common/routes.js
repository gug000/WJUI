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
            }
        ]
    };
    angular.module('appConstants').constant('routes',getRoutes());

}());