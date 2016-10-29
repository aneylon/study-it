angular.module('ctrlsServ', ['ngAnimate','chart.js'])
.controller('logOutCtrl', function($window){
  vm = this
  vm.showLogout = false;
  vm.logOut = function(){
    console.log('logging out');
    $window.localStorage.clear();
  };
})
.controller('homeCtrl', function($http, $timeout){
  var test = "hello main";
  vm = this
  vm.test = test;
  vm.sections = [];
  vm.getSections = function(){
      var sectionData = '';
      $http.get('/api/libs/all')
      .then(function(res){
        console.log(res.data);
        sectionData = res.data;
        vm.sections = sectionData;
      });
      return sectionData;
  };
  $timeout(function(){
    vm.getSections();
  });

  vm.load = function(lib){
    // hide shown card before loading next lib
    vm.hideCard();
    $http.get('/api/libs/' + lib)
      .then(function(res){
        console.log('res data is :', res.data);
        vm.currentLib = res.data;
        shuffle(vm.currentLib);
        vm.showCurrentCard();
      });
  };
  vm.showingCard = false;
  vm.toggleShowCard = function(){
    vm.showingCard = !vm.showingCard;
  };
  vm.hideCard = function(){
    vm.showingCard = false;
  };
  vm.showCurrentCard = function(){
    vm.card = vm.currentLib[vm.currentCard];
  };
  vm.currentCard = 0;
  vm.card = '';
  vm.currentLib = '';
  vm.nextCard = function(){
    vm.hideCard();
    $timeout(function(){
      vm.currentCard++;
      if(vm.currentCard > vm.currentLib.length - 1){
        vm.currentCard = 0;
        shuffle(vm.currentLib);
      }
      vm.showCurrentCard();
    },200);
  };
  var shuffle = function(arr){
    console.log('shuffling');
    arr.forEach(function(item,i,col){
      var rand = Math.floor(Math.random() * arr.length);
      var temp = item;
      col[i] = col[rand];
      col[rand] = temp;
    });
  };
  var cards = [
    {question:'one',answer:'two',explain:'three'},
    {question:'1',answer:'2',explain:'3'},
    {question:'a',answer:'b',explain:'c'},
    {question:'ay',answer:'bee',explain:'sea'},
    {question:'red',answer:'green',explain:'blue'}
  ];
  // end main controller
})
.controller('mainCtrl', function($rootScope){
  $rootScope.$on('$routeChangeStart', function(){
    console.log('yeah')
  })
})
.controller("aboutCtrl",function(){
  vm = this
  vm.test = "all about it";
})
.controller("contactCtrl",function(){
  vm = this
  vm.test = "contact as";
})
.controller("loginCtrl",function($http, $location, $window){
  vm = this
  vm.test = "hello login";
  vm.notValidated = true;
  vm.validate = function(){ vm.notValidated = !vm.notValidated; };
  vm.login = function(){
    var creds = {
      username: vm.username,
      password: vm.password
    }
  $http.post('/api/signIn', creds)
    .then(function(res){
      if(res.data.success){
        // if successful add token to window
        $window.localStorage.setItem('study.it', res.data.token);
        // if successful change page
        $location.path('/');
      } else {
        // if not show error
          console.log('login failed');
        // show div with failed login info
      }
    });
  }
})
.controller("signupCtrl",function($http, $window, $location){
  // console.log('cur token:', $window.localStorage.getItem('study.it'));
  vm = this
  vm.test = "hello signup";
  vm.message = '';
  vm.showMesage = false;
  vm.showSignup = true;
  vm.notValidated = true;
  vm.addUser = function(){
    var newUser = {
      username: vm.username,
      email: vm.email,
      password: vm.password
    }
    console.log("signing up", newUser);
  $http.post('/api/signUp', newUser)
    .then(function(res){
      console.log(res.data.success);
      if(res.data.success){
        $window.localStorage.setItem('study.it', res.data.token);
        // show sign up success info
        vm.message = 'Sign up successful';
        // hide signup area
        vm.showSignup = false;
        // show message area - green (?)
        vm.showMessage = true;
        $location.path('/');
      } else {
        console.log('signup failed');
        // show sign up error - red (?)
        vm.message = 'Sign up failed';
        vm.showMessage = true;
      }
    });

    vm.username = '';
    vm.email = '';
    vm.password = '';
    vm.passwordTwo = '';
  };
})
.controller("adminCtrl",function($http){
  var test = "hello admin";
  vm = this
  vm.test = test;
  vm.notValidated = true;
  vm.add = function(){
    var newCard = {
      libName: vm.libName,
      sectName: vm.sectName,
      question: vm.question,
      answer: vm.answer,
      explain: vm.explain
    };
    console.log("adding new stuff", newCard);

    $http.post('/api/addCard', newCard)
      .then(function(res){
        console.log(res);
      });
    // notify if added and what
    // or notifiy if existing and not added
    vm.libName = '';
    vm.sectName = '';
    vm.question = '';
    vm.answer = '';
    vm.explain = '';
  };
})
.controller("userCtrl",function(){
  vm = this
  vm.test = "hello user";
  // vm.test = test;

  vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
  vm.series = ['Series A', 'Series B'];
  vm.data = [
    [randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100)],
    [randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100)]
  ];
  vm.onClick = function (points, evt) {
    console.log(points, evt);
  };
  function randBetween(max,min){
    if(min === undefined) {
      return Math.floor(Math.random() * max);
    } else {
      return Math.floor(Math.random() * (max - min) + min)
    }
  }
})
