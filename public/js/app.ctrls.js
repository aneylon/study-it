angular.module('ctrlsServ', ['ngAnimate','chart.js'])
  .controller('homeCtrl', function(Cards, Auth, $http, $timeout){
    vm = this
    vm.message = 'home page'

    vm.deckSelected = false
    vm.showingCard = false

    vm.sections = [{name:'...loading...'}]

    vm.getSections = function(){
      Cards.getAllLibs()
        .then(function(res){
          vm.sections = res
        })
    }
    vm.getSections()

    vm.loadedLib = ''
    vm.load = function(lib){
      vm.loadedLib = lib  // store this for saving responses
      vm.currentCard = 0
      vm.deckSelected = true
      // hide shown card before loading next lib
      vm.hideCard()
      $http.get('/api/libs/' + lib)
        .then(function(res){
          // console.log('res data is :', res.data)
          vm.currentLib = res.data
          shuffle(vm.currentLib)
          vm.showCurrentCard()
        })
      vm.clearAnswers()
    }

    vm.toggleShowCard = function(){
      vm.showingCard = !vm.showingCard
    }

    vm.hideCard = function(){
      vm.showingCard = false
    }

    vm.showCurrentCard = function(){
      vm.card = vm.currentLib[vm.currentCard]
    }

    vm.currentCard = 0

    vm.card = {
      question: 'Pick a deck to study',
      explain: 'explanation will show here',
      answer:'answer will show here'
    }

    vm.answers = {
      know: [],
      notSure: [],
      dontKnow: []
    }
    vm.clearAnswers = function(){
      vm.answers['know'] = []
      vm.answers['notSure'] = []
      vm.answers['dontKnow'] = []
    }

    vm.currentLib = ''

    vm.nextCard = function(answer){
      vm.hideCard()
      // store answer
      vm.answers[answer].push(vm.card)
      if(Auth.isLoggedIn()){
        Auth.saveAnswer({
          lib: vm.loadedLib,
          card: vm.currentLib[vm.currentCard],
          answer: answer
        })
      }

      $timeout(function(){
        vm.currentCard++
        if(vm.currentCard > vm.currentLib.length - 1){
          vm.currentCard = 0
          // shuffle each answer section
          shuffle(vm.answers['know'])
          shuffle(vm.answers['notSure'])
          shuffle(vm.answers['dontKnow'])
          // combine and assign to currentLib
          vm.currentLib = []
          vm.currentLib = vm.currentLib.concat(vm.answers['dontKnow'])
          vm.currentLib = vm.currentLib.concat(vm.answers['notSure'])
          vm.currentLib = vm.currentLib.concat(vm.answers['know'])
          vm.clearAnswers()
        }
        vm.showCurrentCard()
      },200)
    }
    var shuffle = function(arr){
      arr.forEach(function(item,i,col){
        var rand = Math.floor(Math.random() * arr.length)
        var temp = item
        col[i] = col[rand]
        col[rand] = temp
      })
    }
  })

  .controller('mainCtrl', function($rootScope, Auth){
    const vm = this
    vm.isLoggedIn = false
    vm.isAdmin = false
    vm.username = ''

    $rootScope.$on('$routeChangeStart', function(){
      vm.checkStatus()
    })
    vm.logout = function(){
      Auth.logout()
      vm.checkStatus()
    }
    vm.checkStatus = function(){
      if(Auth.isLoggedIn()){
        Auth.userInfo()
          .then(function(res){
            vm.username = res.name
            vm.isAdmin = res.admin
          })
        vm.isLoggedIn = true
      } else {
        vm.isLoggedIn = false
        vm.username = ''
        vm.isAdmin = false
      }
    }
  })
  .controller("aboutCtrl",function(){
    const vm = this
    vm.test = "all about it"
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
        name: vm.username,
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
        name: vm.username,
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
  .controller("adminCtrl",function(Cards, $http, $timeout){
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

    vm.multiAdd = function(){
      vm.multiLine += '\n'
      var counter = 0
      var parsed = []
      var temp = {}
      vm.multiLine.split('\n').forEach(item => {
        if(item === ''){
          counter = 0
          parsed.push(temp)
          temp = {}
        }
        else{
          counter ++
          if(counter === 1)
            temp.question = item
          if(counter === 2)
            temp.answer = item
          if(counter === 3)
            temp.explain = item
        }

      })
      console.log(parsed)
      // send each object to addCard route
    }

    vm.libName = ''
    vm.sectName = ''

    vm.allLibs = [{name:'...loading...'}]
    vm.libs = ''
    vm.selectedLib = [{name:'...loading...'}]

    vm.getLibs = function(){
      Cards.getAllLibs()
        .then(function(res){
          vm.allLibs = res
          vm.libs = vm.allLibs.reduce(function(pre, cur){
            pre[cur.name] = cur.subSections
            return pre
          },{})
        })
    }
    vm.getLibs()

    vm.libChanged = function(){
      vm.selectedLib = vm.libs[vm.libName]
    }
  })

  .controller("userCtrl",function(){
    vm = this
    vm.message = 'User Data';

    vm.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July']
    vm.series = ['Know', 'Not Sure', 'Don\'t know']
    vm.colors = ['#00ff00','#ffff00','#ff0000']
    var max = 20
    vm.data = [
      [randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max)],
      [randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max)],
      [randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max), randBetween(max)]
    ]
    vm.onClick = function (points, evt) {
      console.log(points, evt)
    }
    function randBetween(max,min){
      if(min === undefined) {
        return Math.floor(Math.random() * max)
      } else {
        return Math.floor(Math.random() * (max - min) + min)
      }
    }
  })
