angular.module('ctrlsServ', ['ngAnimate','chart.js'])
// .controller('logOutCtrl', function($window){
//   vm = this
//   vm.showLogout = false;
//   vm.logOut = function(){
//     console.log('logging out');
//     $window.localStorage.clear();
//   };
// })
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
  // var cards = [
  //   {question:'one',answer:'two',explain:'three'},
  //   {question:'1',answer:'2',explain:'3'},
  //   {question:'a',answer:'b',explain:'c'},
  //   {question:'ay',answer:'bee',explain:'sea'},
  //   {question:'red',answer:'green',explain:'blue'}
  // ];
})
.controller('mainCtrl', function($rootScope, Auth){
  const vm = this
  vm.isLoggedIn = false
  $rootScope.$on('$routeChangeStart', function(){
    console.log('yeah')
    vm.checkStatus()
  })
  vm.logout = function(){
    Auth.logout()
    vm.checkStatus()
  }
  vm.checkStatus = function(){
    if(Auth.isLoggedIn()){
      vm.isLoggedIn = true
    } else {
      vm.isLoggedIn = false
    }
  }
})
.controller("aboutCtrl",function(){
  const vm = this
  vm.test = "all about it";
})
.controller("contactCtrl",function(){
  vm = this
  vm.test = "contact as";
})
.controller("loginCtrl",function(Auth, $location){
  vm = this
  vm.message = ''
  vm.notValidated = true
  vm.validate = function(){ vm.notValidated = !vm.notValidated }
  vm.login = function(){
    const creds = {
      username: vm.username,
      password: vm.password
    }
    Auth.login(creds)
      .then(function(res){
        if(res.success){
          $location.path('/')
        } else {
          vm.message = res
        }
      })
  }
})
.controller("signupCtrl",function(Auth, $location){
  vm = this
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
    Auth.signup(newUser)
      .then(function(res){
        if(res.success){
          Auth.login(newUser)
            .then(function(res){
              if(res.success){
                $location.path('/')
              } else {
                vm.message = res
              }
            })
        } else {
          console.log(res)
          vm.message = res
        }
      })
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
