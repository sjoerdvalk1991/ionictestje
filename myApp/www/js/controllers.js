var app = angular.module('starter.controllers', ['collection.service']);

var appController = function($scope, $ionicModal, $timeout, $location){

  var _this = this;
  // Form data for the login modal
  this.loginData = {};

  this.hasMenu = true;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    _this.modal = modal;
  });

  // Triggered in the login modal to close it
 this.closeLogin = function() {
    _this.modal.hide();
  };

  // Open the login modal
  this.login = function() {
    _this.modal.show();
  };

  // Perform the login action when the user submits the login form
  this.doLogin = function() {
    console.log('Doing login', this.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      _this.closeLogin();
    }, 1000);
  };
}
appController.$inject = ['$scope', '$ionicModal', '$timeout','$location'];
app.controller('AppCtrl', appController);


//-----------------//
        //   //
          //

     ///////////       
      //    //
        ////     
//-----------------//

var resultsController = function(collectAPI){

  var _this = this;

  this.results = {};

  _this.check = 1;
  
  
  if(!localStorage.getItem('dailyart')){
    
    collectAPI.getCollects().success(function(data){
        localStorage.setItem('dailyart', JSON.stringify (data));
        var d = new Date();
        var day = d.getDate();
        console.log(day);
        _this.check = 1;
        _this.results = data.artObjects;
      console.log(_this.results);
    });
  }else{
    var localArt = JSON.parse(localStorage.getItem('dailyart'));
    _this.results = localArt.artObjects;    
  }

  };


resultsController.$inject = ['collectService'];
app.controller('ResultsCtrl', resultsController);

var resultController = function(params, collectAPI){
  var _this = this;

  this.result = {};

  collectAPI.collectDetail(params.id).success(function(data){
    _this.result = data.artObject;
    console.log(_this.result);
  });

  _this.resultSaver = function(){
    if(!localStorage.getItem('saved')){
      var artObjects = [];
      artObjects.push(_this.result);
      localStorage.setItem('saved', JSON.stringify (artObjects));


    }else{
      var savedArt = [];
      savedArt = JSON.parse(localStorage.getItem('saved'));
      savedArt.push(_this.result);
      localStorage.setItem('saved', JSON.stringify (savedArt));    

    }

  }

}


resultController.$inject = ['$stateParams', 'collectService'];
app.controller('ResultCtrl', resultController);


var savedController = function(params){
  var _this = this;
 
  this.results = {};

  this.getSaved = function(){
    var saved = JSON.parse(localStorage.getItem('saved'));
    _this.checkSaved(saved);
    return saved;
  }

  this.checkSaved = function(){

  }

  this.results = _this.getSaved();

}

savedController.$inject = ['$stateParams'];
app.controller('SavedCtrl', savedController);


