console.log('this is a test');
angular
  .module('tests',[])
  .controller('testCtrl',function($scope){
    $scope.test = '';
    $scope.next = function(){
      console.log('next');
    }
    $scope.prev = function(){
      console.log('prev');
    }
    $scope.cards = [
      {one:'one',two:'two',three:'three'},
      {one:'a',two:'b',three:'c'},
      {one:'you',two:'and me',three:'girl'}
    ];
    $scope.cards2 = [
      {one:'5',two:'6',three:'7'},
      {one:'five',two:'six',three:'seven'},
      {one:'for',two:'sure',three:'man'}
    ]
    var shuffle = function(arr){
    	arr.forEach(function(item,i,col){
    		var rand = Math.floor(Math.random() * arr.length);
    		var temp = item;
    		col[i] = col[rand];
    		col[rand] = temp;
    	})
    };
  })
