angular.module('authServ',[])
  .factory('Auth', function(){
    const auth = {}
    // signup
    // login
    // logOut
    // isloggedin
    return auth
  })
  .factory('AuthToken', function(){
    const authToken = {}
    // get token
    authToken.getToken = function(){
      return $window.localStorage.getItem('token')
    }
    // set token
    authToken.setToken = function(token){
      if(token){
        $window.localStorage.setItem('token', token)
      } else {
        $window.localStorage.removeItem('token')
      }
    }
    return authToken
  })
  .factory('AuthIntercept', function(){
    const authIntercept = {}
    // request
    authIntercept.request = function(config){
      // console.log('http req:', config)
      return config
    }
    // error response
    return authIntercept
  })
  .factory('AuthOld', function($window){
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
