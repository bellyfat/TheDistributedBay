"use strict";angular.module("theDistributedBayApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$locationProvider","$compileProvider",function(a,b,c){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/browse",{templateUrl:"views/browse.html",controller:"BrowseCtrl"}).when("/recent",{templateUrl:"views/recent.html",controller:"RecentCtrl"}).when("/torrent/add",{templateUrl:"views/torrent/add.html",controller:"TorrentAddCtrl"}).when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl"}).when("/torrent/:hash/?:name?",{templateUrl:"views/torrent/view.html",controller:"TorrentViewCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!0),c.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|magnet):/)}]),angular.module("theDistributedBayApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("theDistributedBayApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("theDistributedBayApp").controller("BrowseCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("theDistributedBayApp").controller("RecentCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("theDistributedBayApp").directive("torrentDisplay",function(){return{templateUrl:"views/torrent-display.html",restrict:"E",link:function(a){a.sanitize=function(a){return a.replace(/\W+/g,"-")}}}}),angular.module("theDistributedBayApp").service("data",["$http","$q",function(a,b){var c;this.search=function(d){c&&c.resolve(),d=_.merge({q:""},d);var e=_.map(d,function(a,b){return b+"="+a}).join("&"),f=b.defer();return c=b.defer(),a.get("/api/torrents?"+e,{timeout:c.promise,cache:!0}).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},this.getTorrent=function(c){var d=b.defer();return a.get("/api/torrent?hash="+escape(c),{cache:!0}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},this.addTorrent=function(b){b=_.merge({MagnetLink:"magnet:",Name:"",Description:"",CategoryID:0,CreatedAt:new Date,Tags:[]},b),console.log("ADD TORRENT",b),a.post("/api/add_torrent",b).success(function(a){console.log("ADDED",a)}).error(function(a){alert("Error! ",a)})}}]),angular.module("theDistributedBayApp").controller("TorrentAddCtrl",["$scope","data",function(a,b){a.addTorrent=function(){b.addTorrent({MagnetLink:a.magnet,Name:a.name,Description:a.description,Tags:_.map(a.tags.split(","),function(a){return a.trim()})})}}]),angular.module("theDistributedBayApp").controller("SearchCtrl",["$scope","data",function(a,b){a.torrents=[],a.$watch("query",function(c){b.search({q:c}).then(function(b){console.log("Searh results",b),_.each(b,function(a){a.Name=_.escape(a.Name)}),a.torrents=b},function(){})})}]),angular.module("theDistributedBayApp").directive("searchForm",function(){return{templateUrl:"views/search-form.html",restrict:"E",link:function(){},controller:["$scope","$rootScope","$location",function(a,b,c){function d(){a.query?("/search"!==c.path()&&c.path("/search"),c.search("q="+a.query)):c.search("")}a.query=c.search().q,a.$watch("query",function(){d()}),b.$on("$routeChangeSuccess",function(a,b,c){"/"===b.originalPath?($(".form-small").removeClass("form-small").addClass("form-big"),$(".index-wrapper .index:not(.container)").addClass("container")):c&&"/"===c.originalPath&&($(".form-big").removeClass("form-big").addClass("form-small"),$(".index-wrapper .index.container").removeClass("container"))})}]}}),angular.module("theDistributedBayApp").controller("TorrentViewCtrl",["$scope","$routeParams","data",function(a,b,c){c.getTorrent(b.hash).then(function(b){b.Name=_.escape(b.Name),b.Description=_.escape(b.Description),a.torrent=b},function(a){alert("Not found:",a)})}]);