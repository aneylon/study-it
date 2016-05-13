// console.log("test");
angular
	.module("study-it",["ngRoute"])
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
					{name:"Lv3"},
					{name:"Lv2"}
				]},
			{name:"中文"},
			{name:"日本語"},
			{name:"한국어"},
			{name:"A+"},
			{name:"JavaScript"}
		]
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
		$scope.login = function(){
			console.log("loging in");
		}
	})
	.controller("signupCtrl",function($scope){
		var test = "hello signup";
		$scope.test = test;
		$scope.signup = function(){
			console.log("signing up");
		}
	})