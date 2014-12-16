var app = angular.module('starter.controllers', ['collection.service']);

var appController = function($scope, $ionicModal, $timeout, $location, $q){

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

var resultsController = function(collectAPI, $q, $timeout){

  var _this = this;

  this.results = {};

  _this.timeNow = Date.now();

  _this.check = 1;

  if(!localStorage.getItem('timeStamp')){
  _this.timeMs = 0;
  }else{
  _this.timeMs = JSON.parse(localStorage.getItem('timeStamp'));

  }

  this.loadArt = function(){
    var deffered = $q.defer();
    var timeStamp = Date.now(); 
    _this.timeMs = timeStamp;
    localStorage.setItem('timeStamp', JSON.stringify(timeStamp));
    collectAPI.getCollects().success(function(data){
      localStorage.setItem('dailyart', JSON.stringify (data));
      _this.check = 1;
      _this.results = data.artObjects;
      $('.come-in').hide();
      deffered.resolve(fade());
      
      return deffered.promise;

      function fade(){
        $timeout(function(){
          $('.come-in').fadeIn( "slow", function (){
            console.log('testing');
          });

        },3000);  
      }
       
    });
  }
  
  
  if(!localStorage.getItem('dailyart')){
    _this.loadArt();
  
  }else if(_this.timeMs+86400000< _this.timeNow){
    console.log('test remove');
    localStorage.removeItem('timeStamp');
    localStorage.removeItem('dailyart');

    _this.loadArt();

  }else{
    var localArt = JSON.parse(localStorage.getItem('dailyart'));
    console.log(_this.timeMs);
    _this.results = localArt.artObjects;
    $('.come-in').hide();
    $('.come-in').fadeIn( "slow", function (){
      console.log('testing');
  });

  };

};





resultsController.$inject = ['collectService', '$q', '$timeout'];
app.controller('ResultsCtrl', resultsController);

//-----------------//
        //   //
          //

     ///////////       
      //    //
        ////     
//-----------------//

var resultController = function(params, collectAPI, $q, $scope, $ionicPopup){
  var _this = this;

  this.result = {};

  collectAPI.collectDetail(params.id).success(function(data){
    _this.result = data.artObject;
  });

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Schilderij bestaat al',
     template: 'Je hebt dit schilderij al eerder opgeslagen'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

   $scope.showAlertAlready = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Gelukt',
     template: 'Schilderij succesvol opgeslagen'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };


  _this.resultSaver = function(){
    if(!localStorage.getItem('saved')){
      var artObjects = [];
      artObjects.push(_this.result);
      localStorage.setItem('saved', JSON.stringify (artObjects));
    }else{

      var deffered = $q.defer();

      var savedArt = [];
      savedArt = JSON.parse(localStorage.getItem('saved'));
      var i = 0;
      var c = 0;
      for (; i < savedArt.length; i++) {
        var checker;
        i += checker = (savedArt[i].id === _this.result.id);  
          console.log(checker);
          console.log(i);

        if(checker === true){
          console.log('already saved');
          c++
        }else{
        };

      };

      deffered.resolve(resultCheck(c, savedArt));

      return deffered.promise;


      function resultCheck(c, savedArt){
        
        console.log(c);
        console.log(savedArt.length);
        if (c === 0){
          savedArt.push(_this.result);
          $scope.showAlertAlready();
          localStorage.setItem('saved', JSON.stringify (savedArt));

        }else{
          $scope.showAlert();
        }
      }
    }
  } 
}

resultController.$inject = ['$stateParams', 'collectService', '$q', '$scope', '$ionicPopup'];
app.controller('ResultCtrl', resultController);

//-----------------//
        //   //
          //

     ///////////       
      //    //
        ////     
//-----------------//


var savedController = function(params){
  var _this = this;
 
  this.results = {};

  this.getSaved = function(){
    var saved = JSON.parse(localStorage.getItem('saved'));
    return saved;
  }

  this.alreadySaved = function(){
    console.log('test');
  }

  this.results = _this.getSaved();

}

savedController.$inject = ['$stateParams'];
app.controller('SavedCtrl', savedController);

//-----------------//
        //   //
          //

     ///////////       
      //    //
        ////     
//-----------------//

var savedResultController = function(params, collectAPI, $q, $scope, $ionicPopup, $state){
  var _this = this;

  this.result = {};

  collectAPI.collectDetail(params.id).success(function(data){
    _this.result = data.artObject;
  });

  $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Geslaagd!',
       template: 'Schilderij is succesvol verwijderd'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };


  this.compareResult = function(){

    var savedArt = [];
    savedArt = JSON.parse(localStorage.getItem('saved'));
    var deffered = $q.defer();
    var newSave = [];
    var i = 0;
    for (; i < savedArt.length; i++) {
        if(savedArt[i].id == _this.result.id){
          //not in array
        }else{
          newSave.push(savedArt[i]);
        }

    }
     
    deffered.resolve(resultUpdate(newSave));

    return deffered.promise;
  
    function resultUpdate(newSave){
      console.log(newSave.length);
      if(newSave.length > 0){
        console.log('test');
        localStorage.setItem('saved', JSON.stringify (newSave));
        $state.go('app.saved', {url:"/saved"});
        $scope.showAlert();
      }else{
        $state.go('app.saved', {url:"/saved"});
        $scope.showAlert();
        localStorage.setItem('saved', JSON.stringify (newSave));
      }
    }
  }

  this.resultDelete = function(){

      _this.compareResult ();
  }

}

savedResultController.$inject = ['$stateParams', 'collectService', '$q', '$scope', '$ionicPopup', '$state'];
app.controller('SavedResultCtrl', savedResultController);




