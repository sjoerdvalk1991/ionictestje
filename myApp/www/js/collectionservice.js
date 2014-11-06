//hnQJ1CmI
var module = angular.module('collection.service', []);

module.factory('collectService', function($http) {

  var collectAPI = {};

  collectAPI.getCollects = function(){
    return $http({
      url: 'https://www.rijksmuseum.nl/api/nl/collection/sk-c-5?key=hnQJ1CmI&format=json'
    });
  }

 
  return collectAPI;

});