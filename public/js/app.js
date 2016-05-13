// console.log("test");
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
	.controller("adminCtrl",function($scope){
		var test = "hello admin";
		$scope.test = test;
		$scope.add = function(){
			console.log("adding new stuff");
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