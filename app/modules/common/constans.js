(function(){
    var getAppStatic = function(){
        return {
            baseUrl : 'http://xxx'
        };
    };
    angular.module('appConstants').constant('appStatic',getAppStatic());


}());