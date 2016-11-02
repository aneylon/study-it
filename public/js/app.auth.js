angular.module('authServ',[])
  .factory('Auth', function($http, $q, AuthToken){
    const auth = {}

    auth.admin = false
    auth.username = ''

    auth.signup = function(newUser){
      return $http.post('/api/signUp', newUser)
        .then(function(res){
          return res.data
        })
    }

    auth.login = function(user){
      return $http.post('/api/signIn', user)
        .then(function(res){
          if(res.data.success){
            AuthToken.setToken(res.data.token)
            if(res.data.admin){
              auth.admin = true
            }
            console.log(res.data)
            auth.username = res.data.username
          }
          return res.data
        })
    }

    auth.logout = function(){
      AuthToken.setToken()
      auth.admin = false
    }

    auth.isLoggedIn = function(){
      if(AuthToken.getToken()){
        return true
      } else {
        return false
      }
    }

    auth.isAdmin = function(){
      if(auth.admin === true){
        return true
      } else {
        return false
      }
    }

    auth.saveAnswer = function(user, curLib, curDeck, curCard, answer){
      console.log('saving', user, curLib, curDeck, curCard, answer)
      $http.post('/api/saveAnswer', { user, curLib, curDeck, curCard, answer })
        .then(function(res){
          console.log('res from server:', res)
        })
    }

    return auth
  })
  .factory('AuthToken', function($window){
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
  .factory('AuthIntercept', function($q, AuthToken){
    const authIntercept = {}
    // request
    authIntercept.request = function(config){
      // console.log('http req:', config)
      const token = AuthToken.getToken()
      if(token){
        config.headers['x-access-token'] = token
      }
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
