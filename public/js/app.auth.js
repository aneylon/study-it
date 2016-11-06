angular.module('authServ',[])
  .factory('Auth', function($http, $q, AuthToken){
    const auth = {}

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
          }
          return res.data
        })
    }

    auth.logout = function(){
      AuthToken.setToken()
    }

    auth.userInfo = function(){
      return $http.get('/api/loggedIn')
        .then(function(res){
          return res.data
        })
    }

    auth.isLoggedIn = function(){
      if(AuthToken.getToken()){
        return true
      } else {
        return false
      }
    }

    auth.saveAnswer = function(user, curLib, curDeck, curCard, answer){
      // console.log('saving', user, curLib, curDeck, curCard, answer)
      $http.post('/api/saveAnswer', { user, curLib, curDeck, curCard, answer })
        .then(function(res){
          // console.log('res from server:', res)
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
