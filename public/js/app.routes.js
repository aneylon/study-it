angular.module('routeServ', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl',
      controllerAs: 'home'
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
    $locationProvider.html5Mode(true)
})
