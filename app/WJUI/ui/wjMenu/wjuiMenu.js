(function(){
    'use strict';
    angular.module('WJUIDirectives').directive('wjMenu',['$rootScope',function($rootScope){
        return {
            restrict: 'E',
            replace: true,
            scope : {
                menuData : '=',
                currentMenu : '=',
                wjChange : '&',
                wjClick : '&'
            },
            templateUrl : 'WJUI/ui/wjMenu/wjuiMenu.tpl.html',
            link : function(scope, element, attrs, controller){
                if(!scope.menuData){
                    return;
                }
                var defPadding = 24;
                var level = 1;
                scope.isLeaf = function(menu){
                    return !menu.nodes || !menu.nodes.length;
                };
                scope.getMenuIcon = function(menu){
                    var isLeaf = scope.isLeaf(menu);
                    if(isLeaf){
                        return '';
                    }
                    return menu.$$expand ? 'fa fa-angle-down ': 'fa fa-angle-up';

                };
                scope.getPadding = function(menu){
                    var padding = defPadding*menu.level;
                    return 'padding-left:'+padding+'px';
                };
                var _assembleMenus = function(menus){
                    if(menus.level == 1){
                        level = 1;
                    }
                    menus.level = level;
                    menus._uuid=UUIDjs.create().toString();
                    if(menus.nodes && Object.prototype.toString.call(menus.nodes) == '[object Array]' && menus.nodes.length>0){
                        level++;
                        menus.$$expand = false;
                        menus.nodes.forEach(function(menu){
                            _assembleMenus(menu);
                        });
                    }
                };
                scope.menuData.forEach(function(menu){
                    if(typeof menu.level == 'undefined'){
                        menu.level = 1;
                    }
                    _assembleMenus(menu);
                });

                scope.toggleExpand = function(menu, event){
                    if(!scope.isLeaf(menu)){
                        menu.$$expand = !menu.$$expand;
                        event.stopPropagation();
                        var ele = event.target.parentElement;
                        if(event.target.nodeName=='DIV'){
                            ele = event.target;
                        }
                        var ulEle = $(ele).next();
                        ulEle.slideToggle(200);
                    }else{
                        if(scope.currentMenu){
                            if(scope.currentMenu._uuid === menu._uuid){
                                menu.selected = true;
                                scope.wjClick && scope.wjClick({menu:menu});
                            }else{
                                scope.currentMenu.selected = false;
                                var prevMenu = angular.copy(scope.currentMenu);
                                menu.selected = true;
                                scope.currentMenu = menu;
                                scope.wjChange && scope.wjChange({menu:menu,prevMenu:prevMenu});
                            }
                        }else{
                            menu.selected = true;
                            scope.currentMenu = menu;
                            scope.wjClick && scope.wjClick({menu:menu});
                        }
                    }

                };
                scope.warpCallback = function(callback, menu, event){
                    (scope[callback] || angular.noop)({
                        menu:menu,
                        event:event
                    });
                };

            }
        };
    }]);
}());