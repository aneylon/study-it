angular.module('study-it', ['routeServ', 'ctrlsServ', 'authServ', 'materials', 'ngAnimate'])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthIntercept')
	})
