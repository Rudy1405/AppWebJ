var express	=	require('express');
var app= express();

var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser'); /// para que pueda leer bien la estructura de los datos que se van a meter a la bd

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); /// se indica que se usara el bodyparser

app.get('/contactlist', function (req, res) {
	console.log("Recibi un GET req")
	
	db.contactlist.find(function (err, docs) {
		console.log(docs); // log con todos los datos 
		res.json(docs);
	});
});

app.post('/contactlist', function (req, res) { ///agregando al db
	console.log(req.body); /// log del que se agrega 
	db.contactlist.insert(req.body, function(err, doc){ //req el body que es lo que nos va a dar
		res.json(doc); /// y se responde en el formato json que tiene
	});
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id); /// muestra en serv el id del elemento a borrar
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err,doc){ //se hace el req de eliminar de la bd
  	res.json(doc); // responde lo que se borro
  });
});

app.get('/contactlist/:id', function (req,res){ /// obtiene la info de la tabla segun el id que se envia
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req,res){
	var id= req.params.id;
	console.log(req.body.name); /// muestra en serv el nombre de la tabla a actualizar
	//// aqui entra la magia de modificar realmente los datos
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, // modifica la tabla con este id
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, // y en en atributo: pido.body.casilla 
		new: true}, function (err, doc){
			res.json(doc);
		});
});

app.listen(3000);
console.log("Server runnin on port 3000")