angular.module('study-it', ['routeServ', 'ctrlsServ', 'authServ'])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthIntercept')
	})
