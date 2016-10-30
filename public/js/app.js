angular.module('study-it', ['routeServ', 'ctrlsServ', 'authServ', 'materials'])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthIntercept')
	})
