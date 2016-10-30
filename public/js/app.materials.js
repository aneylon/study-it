angular.module('materials', [])
  .factory('Cards', function($http){
    const cardFac = {}

    cardFac.getAllLibs = function(){
      return $http.get('/api/libs/all')
        .then(function(res){
          return res.data
        })
    }

    cardFac.getOneDeck = function(){

    }

    cardFac.addOne = function(){

    }

    return cardFac
  })
