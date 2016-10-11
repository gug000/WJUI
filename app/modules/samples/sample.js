(function(){
    'use strict';
    angular.module('app').controller('SampleController',['$rootScope','$scope',function($rootScope,$scope){
        $scope.me = {
            select: {
                projectSelect: {
                    items: [
                        {text: '项目一', value: 1},
                        {text: '项目二', value: 2},
                        {text: '项目三', value: 3},
                        {text: '项目四', value: 4}
                    ],
                    placeHolder: '',
                    currentItem: null
                },
                bookSelect: {
                    items: [
                        {text: '书本一', value: 1},
                        {text: '书本二', value: 2, disabled: true},
                        {text: '书本三', value: 3},
                        {text: '书本四', value: 4}
                    ],
                    placeHolder: '请选择书本',
                    currentItem: null
                },
                priceSelect: {
                    items: [
                        {text: '10-20', value: 1, icon: 'images/1.png'},
                        {text: '21-30', value: 2, icon: 'images/2.png'},
                        {text: '31-40', value: 3, icon: 'images/3.png'},
                        {text: '41-50', value: 4, icon: 'images/4.png'}
                    ],
                    placeHolder: '请选择价位',
                    currentItem: {text: '31-40', value: 3},
                    priceClick: function (item) {
                        console.log('priceClick');
                        console.log(item);
                    },
                    priceChange: function (item,prevItem) {
                        console.log('priceChange');
                        console.log('    currentItem');
                        console.log(item);
                        console.log('    prevItem');
                        console.log(prevItem);
                    }
                }
            },
            menu: [
                {
                    title: '主菜单1',
                    url: '',
                    nodes: [
                        {
                            title: '二级菜单1',
                            url: '',
                            nodes: [
                                {
                                    title: '三级菜单1-1',
                                    url: ''
                                },
                                {
                                    title: '三级菜单1-2',
                                    url: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '主菜单2',
                    url: '',
                    nodes: [
                        {
                            title: '二级菜单2',
                            url: '',
                            nodes: [
                                {
                                    title: '三级菜单2-1',
                                    url: ''
                                },
                                {
                                    title: '三级菜单2-2',
                                    url: '',
                                    nodes:[
                                        {
                                            title : '四级菜单2-1',
                                            url : ''
                                        },
                                        {
                                            title : '四级菜单2-2',
                                            url : ''
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            currentMenu : null,
            menuEvt : {
                menuClick : function(menu){
                    console.log('menuClick');
                    console.log(menu);
                },
                menuChange : function(menu,prevMenu){
                    console.log('menuChange');
                    console.log('    currentMenu');
                    console.log(menu);
                    console.log('    prevMenu');
                    console.log(prevMenu);
                }
            }
        }
    }]);
}());
