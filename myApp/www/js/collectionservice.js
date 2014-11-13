//hnQJ1CmI
var module = angular.module('collection.service', []);

module.factory('collectService', function($http) {

  var collectAPI = {};

  collectAPI.getCollects = function(){
    return $http({
      url: 'https://www.rijksmuseum.nl/api/nl/collection?key=hnQJ1CmI&format=json&type=schilderij&artist=rembrandt-harmensz-van-rijn&p=55'
    });
  }

 
  return collectAPI;

});