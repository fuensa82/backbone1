
/**
 * Module dependencies.
 */
 
var express = require('express');
var http = require('http');
var path = require('path'); 
var mysql = require('mysql');
 
var client = mysql.createConnection({
  user: 'nodejs1',
  password: '03885536',
  host: '127.0.0.1',
  port: '3306',
  database: 'nodejs1'
});
var app = express();

var conectar=function(){
  console.log("Conectando a MySQL");
  client.connect(function(err) {
    if ( !err ) {
      console.log("Connected to MySQL");
    } else if ( err ) {
      console.log("ERROR: "+err);
    }
  });
};

var desconectar=function(){
  console.log("Cerrando MySQL");
  client.end();
};

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.get('/piloto/:id',function(req, res){
  console.log("PILOTO "+req.params.id);
  conectar();
  console.log("query");
  client.query(
      'SELECT * FROM usuarios where id=?', [req.params.id],
      function selectUsuario(err, results, fields) {
        if (err) {
          console.log("Error: " + err.message);
        }else{
          res.json(results);
        }

      }
  );
  
});

app.use(express.methodOverride());
//app.use(express.cookieParser('secret'));//necesario para utilizar sesiones
//app.use(express.session({cookie: {maxAge: 900000}}));//tiempo de expiración de la sesión
//app.use(app.router);
app.use(express.static(path.join(__dirname, '.')));

 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});