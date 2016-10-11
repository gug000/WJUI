(function(){
    'use strict';
    angular.module('WJUIDirectives').directive('wjSelect',['$rootScope',function($rootScope){
        return {
            restrict: 'E',
            replace: true,
            scope : {
                /* [{value:'',text:''}] */
                items : '=',
                expand : '@',
                icon : '=',
                selectedItem : '=',
                placeHolder : '=',
                wjChange : '&',
                // wjClick : '&'
            },
            templateUrl : 'WJUI/ui/wjSelect/wjuiSelect.tpl.html',
            link : function(scope, element, attrs, controller){
                var ts = new Date().getTime();
                /* 用于关闭当前页面所有其余select */
                $(element[0]).attr('_ts',ts);
                scope.ts = ts;
                /* 设置默认值 */
                scope.expand = false;
                scope.selectedItem = scope.selectedItem || {text : scope.placeHolder || '请选择',value : '',index:-1};
                /**
                 * 下拉列表展开及关闭事件处理
                 * @param event
                 */
                var expandHandle = function(event){
                    event.preventDefault();
                    var parent = $(event.target).closest('.wj-select-container');
                    if(!parent || !parent.length){
                        if(scope.expand){
                            scope.$apply(function () {
                                scope.expand = false;
                            });
                        }
                    }else{
                        if(scope.ts+''!=parent.attr('_ts')){
                            if(scope.expand){
                                scope.$apply(function () {
                                    scope.expand = false;
                                });
                            }
                        }
                    }
                };
                scope.evToggleExpand = function(event){
                    event.preventDefault();
                    scope.expand = !scope.expand;
                    if(scope.expand){
                        document.removeEventListener('click',expandHandle,false);
                        document.addEventListener('click',expandHandle,false);
                    }else{
                        document.removeEventListener('click',expandHandle,false);
                    }
                };
                /**
                 * item点击事件处理
                 * @param item
                 * @param index
                 */
                scope.evItemClick = function(item, index){
                    if(item.disabled){
                        return;
                    }
                    var prevItem = angular.copy(scope.selectedItem);
                    scope.selectedItem = item;
                    scope.selectedItem['index'] = index;
                    scope.expand = false;
                    /* 此处的参数字面量item必须要与父作用域下的函数参数名字保持一致 */
                    // scope.wjClick && scope.wjClick({item:scope.selectedItem});
                    if(prevItem.value != scope.selectedItem.value){
                        scope.wjChange && scope.wjChange({item:scope.selectedItem,prevItem:prevItem});
                    }
                }
            }
        };
    }]);
}());