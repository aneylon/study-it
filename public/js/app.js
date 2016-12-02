$(document).ready(function(){
	$('body').on('click', '.displayToggle', function(){
		$(this).siblings().slideToggle('fast')
	})
})

angular.module('study-it', ['routeServ', 'ctrlsServ', 'authServ', 'materials', 'ngAnimate'])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthIntercept')
	})
