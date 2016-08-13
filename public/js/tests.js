console.log('this is a test');
angular
  .module('tests',[])
  .controller('testCtrl',function($scope, $http){
    $scope.card = '';
    $scope.currentLib = '';
    $scope.currentCard = 0;
    $scope.hidingCard = true;
    $scope.toggleHide = function(){
      $scope.hidingCard = !$scope.hidingCard;
    }
    $scope.next = function(){
      console.log('next');
      $scope.currentCard++;
      if($scope.currentCard > $scope.currentLib.length - 1){
        $scope.currentCard = 0;
        shuffle($scope.currentLib);
      }
      $scope.showCurrentCard();
    }
    $scope.showCurrentCard = function(){
      $scope.card = $scope.currentLib[$scope.currentCard];
    }
    $scope.prev = function(){
      console.log('prev');
    }
    $scope.load = function(lib){
      $http.get('/api/libs/' + lib)
				.then(function(res){
					console.log('res data is :', res.data);
				});
    }
    $scope.cardsOne = [
      {question:'one',answer:'two',explain:'three'},
      {question:'a',answer:'b',explain:'c'},
      {question:'you',answer:'and me',explain:'girl'}
    ];
    $scope.cardsTwo = [
      {question:'5',answer:'6',explain:'7'},
      {question:'five',answer:'six',explain:'seven'},
      {question:'for',answer:'sure',explain:'man'}
    ]
    var shuffle = function(arr){
      console.log('shuffling');
    	arr.forEach(function(item,i,col){
    		var rand = Math.floor(Math.random() * arr.length);
    		var temp = item;
    		col[i] = col[rand];
    		col[rand] = temp;
    	})
    };
  })
