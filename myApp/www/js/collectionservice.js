//hnQJ1CmI
var module = angular.module('collection.service', []);

module.factory('collectService', function($http) {

  var collectAPI = {};

  collectAPI.getCollects = function(){
  	var rand = Math.floor((Math.random() * 100) + 1);
    return $http({
      url: 'https://www.rijksmuseum.nl/api/nl/collection?key=hnQJ1CmI&format=json&type=schilderij&artist=rembrandt-harmensz-van-rijn&ps=5&p='+rand
    });
  }

  collectAPI.collectDetail = function(id){
    return $http({
      url: 'https://www.rijksmuseum.nl/api/nl/collection/'+id+'/?key=hnQJ1CmI'
    });
  	
  }

 
  return collectAPI;

});