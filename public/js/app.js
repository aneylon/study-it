angular
	.module("study-it",["ngRoute","ngAnimate","chart.js"])
	.config(function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'partials/main.html',
				controller: 'mainCtrl'
			})
			.when('/about',{
				templateUrl: 'partials/about.html',
				controller: 'aboutCtrl'
			})
			.when('/contact',{
				templateUrl: 'partials/contact.html',
				controller: 'contactCtrl'
			})
			.when('/login',{
				templateUrl: 'partials/login.html',
				controller: 'loginCtrl'
			})
			.when('/signup',{
				templateUrl: 'partials/signup.html',
				controller: 'signupCtrl'
			})
			.when('/admin',{
				templateUrl: 'partials/admin.html',
				controller: 'adminCtrl'
			})
			.when('/user',{
				templateUrl: 'partials/user.html',
				controller: 'userCtrl'
			})
			.otherwise({
				redirectTo: '/'
			})
	})
	.controller('logOutCtrl', function($scope, $window){
		$scope.showLogout = false;
		$scope.logOut = function(){
			console.log('logging out');
			$window.localStorage.clear();
		}
	})
	.controller("mainCtrl",function($scope, $http, $timeout){
		var test = "hello main";
		$scope.test = test;
		$scope.sections = [
			{
				name:"日本語",
				subsections: [
					{name:"Lv5"},
					{name:"Lv4"}
				]},
			{
				name:"中文",
				subsections: [
					{name:"hsk1"},
					{name:"hsk2"}
				]
			},
			{
				name:"한국어",
				subsections:[
					{name:"topik I 1"},
					{name:"topik I 2"}
				]
			},
			{name:"A+"},
			{name:"JavaScript"}
		];
		$scope.load = function(lib){
			console.log('loading :', lib);
			// $scope.currentLib = cards;
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
		}
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
	.controller("aboutCtrl",function($scope){
		var test = "hello about";
		$scope.test = test;
	})
	.controller("contactCtrl",function($scope){
		var test = "hello contact";
		$scope.test = test;
	})
	.controller("loginCtrl",function($scope, $http, $location, $window){
		var test = "hello login";
		$scope.test = test;
		$scope.notValidated = true;
		$scope.validate = function(){ $scope.notValidated = !$scope.notValidated; };
		$scope.login = function(){
			var creds = {
				username: $scope.username,
				password: $scope.password
			}
			console.log("loging in", creds);
		$http.post('/api/signIn', creds)
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					// if successful add token to window
					$window.localStorage.setItem('study.it', 'logged in');
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
	.controller("signupCtrl",function($scope, $http, $window){
		var test = "hello signup";
		$scope.test = test;
		$scope.message = '';
		$scope.showMesage = false;
		$scope.showSignup = true;
		$scope.notValidated = true;
		$scope.signup = function(){
			var newUser = {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			}
			console.log("signing up", newUser);
		$http.post('/api/signUp', newUser)
			.then(function(res){
				console.log(res.data.success);
				if(res.data.success){
					$window.localStorage.setItem('study.it', 'signed up');
					// show sign up success info
					$scope.message = 'Sign up successful';
					// hide signup area
					$scope.showSignup = false;
					// show message area - green (?)
					$scope.showMessage = true;
				} else {
					console.log('signup failed');
					// show sign up error - red (?)
					$scope.message = 'Sign up failed';
					$scope.showMessage = true;
				}
			});

			$scope.username = '';
			$scope.email = '';
			$scope.password = '';
			$scope.passwordTwo = '';
		};
	})
	.controller("adminCtrl",function($scope, $http){
		var test = "hello admin";
		$scope.test = test;
		$scope.notValidated = true;
		$scope.add = function(){
			var newCard = {
				libName: $scope.libName,
				question: $scope.question,
				answer: $scope.answer,
				explain: $scope.explain
			};
			console.log("adding new stuff", newCard);

		$http.post('/api/addCard', newCard)
			.then(function(res){
				console.log(res);
			});
			// notify if added and what
			// or notifiy if existing and not added
			$scope.libName = '';
			$scope.question = '';
			$scope.answer = '';
			$scope.explain = '';
		};
	})
	.controller("userCtrl",function($scope){
		var test = "hello user";
		$scope.test = test;

		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
			[randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100)],
			[randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100), randBetween(100)]
		];
		$scope.onClick = function (points, evt) {
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
