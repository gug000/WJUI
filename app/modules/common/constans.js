(function(){
    var getAppStatic = function(){
        return {
            baseUrl : 'http://gateway.whaley.cn'
        };
    };
    angular.module('appConstants').constant('appStatic',getAppStatic());


}());