angular.module('authServies', [])
  .factory('Auth', function($http, $q, AuthToken) {
    var authFactory = {};
    authFactory.login = function(username, password){
      return $http.post('api/authenticate', {
        username: username,
        password: password
      })
      .success(function(data){
        AuthToken.setToken(data.token);
        return data;
      });
    };
    authFactory.logout = function(){
      AuthToken.setToken();
    };
    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken())
        return true;
      else
        return false;
    };
    authFactory.getUser = function(){
      if(AuthToken.getToken())
        return $http.get('/api/me');
      else
          return $q.reject({message: 'User has no token'});
    };
    return authFactory;
  })
  .factory('AuthToken', function($window){
    var authTokenFactory = {};
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token');
    };
    authTokenFactory.setToken = function(token){
      if(token){
        return $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    }
    return authTokenFactory;
  })
  .factory('AuthInterceptor', function($q, AuthToken){
    var interceptorFactory = {};

    return interceptorFactory;
  })
