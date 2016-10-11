(function () {
    'use strict';

    angular.module('appConstants').factory('dataService', [
        '$rootScope',
        '$http',
        '$q',
        '$window',
        '$state',
        '$exceptionHandler',
        function ($rootScope,
                  $http,
                  $q,
                  $window,
                  $state,
                  $exceptionHandler) {

            // 定义默认设置,
            // - 默认显示loading.
            // - 默认不发送广播
            var defaultOpts = {
                loading: true,
                broadcast: false
            };

            /**
             *  通过post 方式, 提交数据到服务器
             *  @param {string} url 接口地址
             *  @param {object} data 提交的数据
             *  @param {object} options 可选参数
             */
            function postData(url, data, options) {
                var defer = $q.defer();
                var opts = angular.extend({}, defaultOpts, options);
                //opts.headers = {'Content-Type':'application/x-www-form-urlencoded'};
                //opts.transformRequest = function(data, headersGetter) {
                //    var str = [];
                //    for (var d in data)
                //        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                //    return str.join("&");
                //};
                // 检查是否要显示loading.
                //opts.loading && loadingServices.show();

                $http.post(url, data, opts)
                    .success(function (response) {
                        success(defer, response, opts);
                    }).error(function (err) {
                    error(defer, err, opts);
                });

                return defer.promise;
            }

            function getData(url, data, options) {
                var baseUrl = options && options.isLocal ? strings.localUrl + url : commonService.formatBaseUrl(url);

                return getExternal(baseUrl + commonService.getQueryParams(data), options);
            }

            function getLocal(url) {
                return $http.get(strings.localUrl + url);
            }

            function getExternal(url, options) {
                var defer = $q.defer();
                var opts = angular.extend({}, defaultOpts, options);

                // 检查是否要显示loading.
                //opts.loading && loadingServices.show();

                $http.get(url).then(function (response) {
                    success(defer, response, opts);
                }, function (err) {
                    error(defer, err, opts);
                });

                return defer.promise;
            }

            function putData(url, data, options) {
                var defer = $q.defer();
                var opts = angular.extend({}, defaultOpts, options);

                // 检查是否要显示loading.
                //opts.loading && loadingServices.show();

                $http.put(commonService.formatBaseUrl(url), data)
                    .success(function (response) {
                        success(defer, response, opts);
                    }).error(function (err) {
                    error(defer, err, opts);
                });

                return defer.promise;
            }

            function deleteData(url, data, options) {
                var defer = $q.defer();
                var opts = angular.extend({}, defaultOpts, options);

                // 检查是否要显示loading.
                //opts.loading && loadingServices.show();

                $http.delete(commonService.formatBaseUrl(url) + commonService.getQueryParams(data))
                    .success(function (response) {
                        success(defer, response, opts);
                    }).error(function (err) {
                    error(defer, err, opts);
                });

                return defer.promise;
            }

            /*--------------private-------------*/
            function parseErrors(errorObject) {

                if (typeof errorObject === 'string') {
                    return errorObject;
                }

                var errors = errorObject.errors,
                    msg = null;

                if (errors) {
                    errors.forEach(function (error) {
                        msg += '<strong>' + error.field + '</strong> : ' + error.message + '<br />';
                    });
                }

                return msg ? msg : '<strong>Invalid data format</strong>';
            }

            /***
             * ajax成功的回调
             * @param {object} defer defer对象, 用于异步返回数据
             * @param {object} result ajax返回的数据
             * @param options
             * @returns {object} result ajax返回的数据
             */
            function success(defer, result, options) {
                // 是否需要发送广播
                if (options && options.broadcast && options.topic) {
                    $rootScope.$broadcast(options.topic + '.done', result);
                }

                // 隐藏loading
                //options.loading && loadingServices.hide();
                //如果token过期或者清除，则得到返回值401，就返回登录页
                if(result && result.status == 401){
                    defer.reject(result, options);
                    $state.go('login');
                }

                defer.resolve(result, options);
            }

            /***
             * ajax失败的回调
             * @param {object} error
             */
            function error(defer, error, options) {
                // 是否需要发送广播
                if (options && options.broadcast && options.topic) {
                    $rootScope.$broadcast(options.topic + '.failed', error);
                }

                // 隐藏loading
                //options.loading && loadingServices.hide();

                //如果token过期或者清除，则得到返回值401，就返回登录页
                if(error && error.status == 401){
                    defer.reject(error, options);
                    $state.go('login');
                }

                defer.reject(error, options);
            }

            /*--------------end-------------*/

            return {
                get: getData,
                post: postData,
                put: putData,
                del: deleteData,

                getLocal: getLocal,
                getExternal: getExternal
            };
        }
    ]);
}());
