var express = require('express');
var http = require('http');
var path = require('path'); 
var mysql = require('mysql');
 
var client = mysql.createConnection({
	user: 'f1Sopra',
	password: '03885536',
	host: '127.0.0.1',
	port: '3306',
	database: 'f1Sopra'
});
var app = express();

var conectar=function(){
	console.log("Conectando a MySQL");
	client.connect(function(err) {
		if ( !err ) {
			console.log("Connected to MySQL");
		} else if ( err ) {
			console.log("---ERROR: "+err);
		}
	});
};

var desconectar=function(){
	console.log("Cerrando MySQL");
	client.end(function(err){
		if(!err){
			console.log("---ERROR: "+err);
		}
	});
};

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.get('/pilotos',function(req, res){
	client.query(
		'SELECT * FROM pilotos where estado_piloto="A" order by numero_piloto*1',
		function selectUsuario(err, results, fields) {
			if (err) {
				console.log("---ERROR: " + err.message);
			}else{
				res.json(results);
			}
			//desconectar();
		}
	);
});
app.get('/miApuesta/:ident',function(req, res){
	console.log("--- Usuario: "+req.params.ident);
	client.query(
		'SELECT * FROM ultimas_apuestas where ident_usuario=?',
		[req.params.ident],
		function selectUsuario(err, results, fields) {
			if (err) {
				console.log("---ERROR: " + err.message);
			}else{
				res.json(results);
			}
		}
	);
});
app.get('/proxCarrera',function(req, res){
	client.query(
		'SELECT * FROM carreras WHERE fecha_carrera>=CURDATE() order by fecha_carrera',
		function(err, results, fields) {
			if (err) {
				console.log("---ERROR: " + err.message);
			}else{
				res.json(results[0]!==undefined?results[0]:{});
			}
			//desconectar();
		}
	);
});

app.put('miApuesta/',function(req, res){
	console.log("--- POST recibido");
});

app.use(express.methodOverride());
//app.use(express.cookieParser('secret'));//necesario para utilizar sesiones
//app.use(express.session({cookie: {maxAge: 900000}}));//tiempo de expiración de la sesión
//app.use(app.router);
app.use(express.static(path.join(__dirname, '.')));

 
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});