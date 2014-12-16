var app = angular.module('starter', ['ionic', 'starter.controllers']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/results",
      views: {
        'menuContent' :{
          templateUrl: "templates/results.html",
        }
      }
    })

    .state('app.saved', {
      url:"/saved",
      views: {
        'menuContent' :{
          templateUrl: "templates/my-saved.html",
        }
      }
    })

    .state('app.results', {
      url: "/results",
      views: {
        'menuContent' :{
          templateUrl: "templates/results.html",
        }
      }
    })

    .state('app.single', {
      url: "/result/:id",
      views: {
        'menuContent' :{
            templateUrl: "templates/result.html",
        }
      } 
    })  

    .state('app.resultsaved', {
      url: "/savedresult/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/saved-result.html"
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/results');
});

