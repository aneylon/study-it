angular
	.module("study-it",["ngRoute","ngAnimate","chart.js"])
	.factory('Auth', function($window){
		var authObj = {};
		var loggedIn = false;
		authObj.isLoggedIn = function(){
			return loggedIn;
		}
		authObj.signUp = function(){
			// to do
			// move signup code here
		}
		authObj.logIn = function(){
			// to do
			// move login code here
		}
		authObj.logOut = function(){
			$window.localStorage.setItem('study-it','');
		}
		authObj.getToken = function(){
			$window.localStorage.getItem('study-it');
		}
		authObj.checkToken = function(){
			// to do add route to verify token?
		}
		return authObj;
	})
	.config(function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'partials/main.html',
				controller: 'mainCtrl'
				// controllerAs: 'main'
			})
			.when('/about',{
				templateUrl: 'partials/about.html',
				controller: 'aboutCtrl',
				controllerAs: 'about'
			})
			.when('/contact',{
				templateUrl: 'partials/contact.html',
				controller: 'contactCtrl',
				controllerAs: 'contact'
			})
			.when('/login',{
				templateUrl: 'partials/login.html',
				controller: 'loginCtrl',
				controllerAs: 'login'
			})
			.when('/signup',{
				templateUrl: 'partials/signup.html',
				controller: 'signupCtrl',
				controllerAs: 'signup'
			})
			.when('/admin',{
				templateUrl: 'partials/admin.html',
				controller: 'adminCtrl',
				controllerAs: 'admin'
			})
			.when('/user',{
				templateUrl: 'partials/user.html',
				controller: 'userCtrl',
				controllerAs: 'user'
			})
			.otherwise({
				redirectTo: '/'
			})
	})
	.controller('logOutCtrl', function($window){
		this.showLogout = false;
		this.logOut = function(){
			console.log('logging out');
			$window.localStorage.clear();
		};
	})
	.controller("mainCtrl",function($scope, $http, $timeout){
		var test = "hello main";
		$scope.test = test;
		$scope.sections = [];
		$scope.getSections = function(){
				var sectionData = '';
				$http.get('/api/libs/all')
				.then(function(res){
					console.log(res.data);
					sectionData = res.data;
					$scope.sections = sectionData;
				});
				return sectionData;
		};
		$timeout(function(){
			$scope.getSections();
		});

		$scope.load = function(lib){
			// hide shown card before loading next lib
			$scope.hideCard();
			$http.get('/api/libs/' + lib)
				.then(function(res){
					console.log('res data is :', res.data);
					$scope.currentLib = res.data;
					shuffle($scope.currentLib);
					$scope.showCurrentCard();
				});
		};
		$scope.showingCard = false;
		$scope.toggleShowCard = function(){
			$scope.showingCard = !$scope.showingCard;
		};
		$scope.hideCard = function(){
			$scope.showingCard = false;
		};
		$scope.showCurrentCard = function(){
			$scope.card = $scope.currentLib[$scope.currentCard];
		};
		$scope.currentCard = 0;
		$scope.card = '';
		$scope.currentLib = '';
		$scope.nextCard = function(){
			$scope.hideCard();
			$timeout(function(){
				$scope.currentCard++;
				if($scope.currentCard > $scope.currentLib.length - 1){
					$scope.currentCard = 0;
					shuffle($scope.currentLib);
				}
				$scope.showCurrentCard();
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
	.controller("aboutCtrl",function(){
		this.test = "all about it";
	})
	.controller("contactCtrl",function(){
		this.test = "contact as";
	})
	.controller("loginCtrl",function($http, $location, $window){
		this.test = "hello login";
		this.notValidated = true;
		this.validate = function(){ this.notValidated = !this.notValidated; };
		this.login = function(){
			var creds = {
				username: this.username,
				password: this.password
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
		console.log($window.localStorage.getItem('study.it'));
		this.test = "hello signup";
		// this.test = test;
		this.message = '';
		this.showMesage = false;
		this.showSignup = true;
		this.notValidated = true;
		this.addUser = function(){
			var newUser = {
				username: this.username,
				email: this.email,
				password: this.password
			}
			console.log("signing up", newUser);
		$http.post('/api/signUp', newUser)
			.then(function(res){
				console.log(res.data.success);
				if(res.data.success){
					$window.localStorage.setItem('study.it', res.data.token);
					// show sign up success info
					this.message = 'Sign up successful';
					// hide signup area
					this.showSignup = false;
					// show message area - green (?)
					this.showMessage = true;
					$location.path('/');
				} else {
					console.log('signup failed');
					// show sign up error - red (?)
					this.message = 'Sign up failed';
					this.showMessage = true;
				}
			});

			this.username = '';
			this.email = '';
			this.password = '';
			this.passwordTwo = '';
		};
	})
	.controller("adminCtrl",function($http){
		var test = "hello admin";
		this.test = test;
		this.notValidated = true;
		this.add = function(){
			var newCard = {
				libName: this.libName,
				sectName: this.sectName,
				question: this.question,
				answer: this.answer,
				explain: this.explain
			};
			console.log("adding new stuff", newCard);

			$http.post('/api/addCard', newCard)
				.then(function(res){
					console.log(res);
				});
			// notify if added and what
			// or notifiy if existing and not added
			this.libName = '';
			this.sectName = '';
			this.question = '';
			this.answer = '';
			this.explain = '';
		};
	})
	.controller("userCtrl",function(){
		this.test = "hello user";
		// this.test = test;

		this.labels = ["January", "February", "March", "April", "May", "June", "July"];
		this.series = ['Series A', 'Series B'];
		this.data = [
			[randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100)],
			[randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100)]
		];
		this.onClick = function (points, evt) {
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
