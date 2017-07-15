var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
$routeProvider
  .when("/list-products", {templateUrl : "list-products.html"})
  .when("/product", {templateUrl : "edit-product.html"})
  .when("/my-list", {templateUrl : "my-list.html"})
  .when("/login", {templateUrl : "Login.html"})
  .when("/new-product", {templateUrl : "save-product.html"})
  .when("/my-orders", {templateUrl : "my-orders.html"})
  .otherwise({templateUrl : "login.html"});
});

app.controller('myCtrl', function($scope, $location){
  $scope.isLogged = false;
  $scope.username = "";
  $scope.date = new Date();

  $scope.products = [
    {name: "Potato", description: "Deliccious and Natural Fruit from the Amazonas", price: 6.50, isAvaible: true, amount: 1},
    {name: "Strawberry", description: "Deliccious and Natural Fruit from the Amazonas", price: 3.50, isAvaible: true, amount: 1},
    {name: "Passion Fruit", description: "Deliccious and Natural Fruit from the Amazonas", price: 8.50, isAvaible: true, amount: 1},
    {name: "Roll or buns", description: "from the our Bakery", price: 2.50, isAvaible: true, amount: 1},
    {name: "Loaf ", description: "Deliccious and Natural Fruit from the Amazonas", price: 5.50, isAvaible: true, amount: 1},
    {name: "French roll ", description: "from the our Bakery", price: 2.50, isAvaible: true, amount: 1},
    {name: "Ciabatta", description: "Deliccious and Natural Fruit from the Amazonas", price: 10.50, isAvaible: true, amount: 1},
    {name: "Croissant", description: "Deliccious with four cheese", price: 3.50, isAvaible: true, amount: 1},
    {name: "Milk", description: "It is skimmed mild", price: 5.50, isAvaible: true, amount: 1},
    {name: "Chocolate", description: "garoto, nestle and others brands", price: 9.50, isAvaible: true, amount: 1},
    {name: "Yogurt", description: "For Childs", price: 5.50, isAvaible: true, amount: 1},
    {name: "Red cabbage ", description: "We Highlight recommend it for a diet", price: 2.50, isAvaible: true, amount: 1},
    {name: "Chayote", description: "We Highlight recommend it for a diet", price: 5.50, isAvaible: true, amount: 1},
    {name: "Collards", description: "We Highlight recommend it for a diet", price: 7.50, isAvaible: true, amount: 1},
    {name: "Cilantro", description: "We Highlight recommend it for a diet", price: 8.50, isAvaible: true, amount: 1},
    {name: "Garden peas", description: "We Highlight recommend it for a diet", price: 2.50, isAvaible: true, amount: 1}

  ];
  
  $scope.myOrders = [];
	$scope.myList = [];
  $scope.editProducts = {};

	$scope.addProduct = function(){
    $scope.product = {'name': this.product.name, 'description': this.product.description, 'price': this.product.price, isAvaible: true, amount: 1};
    $scope.products.push($scope.product);
		$scope.product = {'name': "", 'description': "", 'price': "", isAvaible: true, amount: 0};
    $location.path('/list-products');
	}

  $scope.editProduct = function(product, edit) {
    if(edit){
      for(var i = 0; i < $scope.products.length; i++){
        if($scope.products[i]== this.product){
          $scope.products[i] = this.product;
          break;
        }
      }
      $location.path("/list-products", product);
    }else{
      $location.path("/product", product);
      $scope.editProducts = product;
    }
  }

  $scope.removeList = function(product){
    if(product.isAvaible) 
    {
      var index = $scope.products.indexOf(product);
      $scope.products.splice(index, 1);   
    }else{
      $scope.myList.pop(product);
      this.product.isAvaible = true;
    }
  }

	$scope.addMyList = function(product){
		if(product.isAvaible)
			$scope.myList.push(product);
			this.isAvaible(product);
	}

	$scope.isAvaible = function(product){
		product.isAvaible = false;
	}

	$scope.incrementMyList = function(product){
		product.amount++;
	}

	$scope.decrementMyList = function(product){
		if(product.amount > 0)
			product.amount--;
	}

	$scope.getTotal = function(){
		var total = 0;
		for(var i = 0; i < $scope.myList.length; i++){
			var aux = $scope.myList[i];
			total += aux.price * aux.amount;
		}
		return total;
	} 

  $scope.login = function(){
    $scope.username = this.username;
    $scope.isLogged = true;
    $location.path('/list-products');
  }

  $scope.logOut = function(){
    $scope.isLogged=false;
    $scope.username="";
  }

  $scope.finishOrder = function(){
    $scope.myOrders = $scope.myOrders.concat($scope.myList);
    for(var i = 0; i < $scope.myList.length; i++){
        var index = $scope.products.indexOf($scope.myList[i]);
        $scope.products.splice(index, 1); 
    }
    $scope.myList = [];
    $location.path('/my-orders');
  }

  $scope.isActive = function(route) {
    return (route === $location.path());
  }

});
