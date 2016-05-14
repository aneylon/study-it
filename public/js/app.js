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
	.controller("mainCtrl",function($scope){
		var test = "hello main";
		$scope.test = test;
		$scope.sections = [
			{
				name:"日本語",
				subsections: [
					{
						name:"Lv3",
						content: [
							{
								question: "abc?",
								answer: "def",
								explain: "ghi"
							},
							{
								question: "123?",
								answer: "456",
								explain: "789"
							},
							{
								question: "!@#?",
								answer: "$%^",
								explain: "&*("
							},
						]
					},
					{name:"Lv2"}
				]},
			{name:"中文"},
			{name:"日本語"},
			{name:"한국어"},
			{name:"A+"},
			{name:"JavaScript"}
		];
		$scope.load = function(cards){
			console.log("loading ", cards);
		}
		$scope.showingCard = false;
		$scope.showCard = function(){
			$scope.showingCard = !$scope.showingCard;
		}
		$scope.nextCard = function(){
			console.log("next card");
		}
	})
	.controller("aboutCtrl",function($scope){
		var test = "hello about";
		$scope.test = test;
	})
	.controller("contactCtrl",function($scope){
		var test = "hello contact";
		$scope.test = test;
	})
	.controller("loginCtrl",function($scope){
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
		}
	})
	.controller("signupCtrl",function($scope){
		var test = "hello signup";
		$scope.test = test;
		$scope.notValidated = true;
		$scope.signup = function(){
			var newUser = {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			}
			console.log("signing up", newUser);
		}
	})
	.controller("adminCtrl",function($scope){
		var test = "hello admin";
		$scope.test = test;
		$scope.notValidated = true;
		$scope.add = function(){
			var newCard = {
				question: $scope.question,
				answer: $scope.answer,
				explain: $scope.explain
			}
			console.log("adding new stuff", newCard);
		}
	})
	.controller("userCtrl",function($scope){
		var test = "hello user";
		$scope.test = test;

		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
		  [65, 59, 80, 81, 56, 55, 40],
		  [28, 48, 40, 19, 86, 27, 90]
		];
		$scope.onClick = function (points, evt) {
		  console.log(points, evt);
		};
	})