angular.module('authServ',[])
  .factory('Auth', function($http, $q, AuthToken){
    const auth = {}

    auth.signup = function(newUser){
      // return $http.post('/api/signUp', newUser)
      return $http.post('/user/signup', newUser)
        .then(function(res){
          return res.data
        })
    }

    auth.login = function(user){
      // return $http.post('/api/signIn', user)
      return $http.post('/user/signin', user)
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
      // return $http.get('/api/loggedIn')
      return $http.get('/user/userInfo')
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

    auth.saveAnswer = function(data){
      let user = ''
      auth.userInfo()
        .then(function(res){
          user = res.username
          $http.post('/api/saveAnswer', { user, data })
            .then(function(res){
              // show message from server?
            })
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
