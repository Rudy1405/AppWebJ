function AppCtrl($scope, $http){

	console.log("Hello from controller");

var refresh= function(){

	//jala de contactlist que esta en el server la info que esta ahi, en este caso los contactos
	$http.get('/contactlist').success(function(response){
		console.log("recibi el dato que req")
		$scope.contactlist = response; //el scope con la respuesta es el res del req que pedimos y lo pintara en el html ligado a este controlador
		$scope.contact = ""; ///limpia form que ira en el body
	});
};

refresh();

$scope.addContact = function() { /// cajas de contacto
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};
	
$scope.remove = function(id) {
	console.log(id); /// muestra que se borro el ID
	$http.delete('/contactlist/' + id).success(function(response){
		refresh();
	});
};

$scope.edit = function(id) { /// Esta funcion solo manda el contenido de una fila a las cajas de contacto
	console.log(id); // muestra el id del elemento a editar 
	$http.get('/contactlist/' + id).success(function(response){
		$scope.contact = response; /// poner el response en las cajas de contacto
	});
};

$scope.update = function(){
	console.log($scope.contact._id) /// muestra el id del elemento a modificar 
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){ // se manda con scope porque vamos a mandar la info que estan en las cjas de contacto 
		refresh();
	}); 
};

$scope.deselect = function(){
	$scope.contact= "";
};

}