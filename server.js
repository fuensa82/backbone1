var express = require('express');
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

app.use(express.bodyParser());


app.get('/pilotos',function(req, res){
  console.log("PILOTOS");
  conectar();
   
  client.query(
      'SELECT * FROM usuarios',
      function selectUsuario(err, results, fields) {
   
        if (err) {
            console.log("Error: " + err.message);
          
        }else{     
          desconectar();
          res.json(results);
        }
      } 
  );
});

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

app.get('/pilotoJPG/:id',function(req, res){
  console.log("PILOTO "+req.params.id);
  conectar();
  console.log("query");
  client.query(
      'SELECT * FROM usuarios where id=?', [req.params.id],
      function selectUsuario(err, results, fields) {
        if (err) {
          console.log("Error: " + err.message);
        }else{
          res.type('jpeg');
          console.log(results);
          console.log(results[0].imagen);
          res.send(results[0].imagen);
        }

      }
  );
  
});

app.listen(3434);