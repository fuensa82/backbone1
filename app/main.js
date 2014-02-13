/*
 * app/main.js
*/
require.config({
    paths: {
        jquery: 'vendor/jquery',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        Vistas:'src/Vistas',
        text:'vendor/text'
    },
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        underscore: {
            exports: "_"
        }
    }
});
require([
    'jquery',
    'underscore',
    'backbone',
    'Vistas',
    'src/vistas/menu',
    'src/vistas/pilotosPage'
    ], function ($, _, Backbone,Vistas,Menu,PilotosPage) {
    // rutas de la aplicación
    var router = Backbone.Router.extend({
        routes: {
          '': 'home',
          'menu':'menu',
          'home':'home',
          'pilotos':'pilotos'
        },
        home: function(){
        	console.log("Home");
            this.homeView = new Vistas.homeView();
            this.homeView.render();
        },
        menu:function(){
        	console.log("Menu");
        	this.menuView = new Menu();
            this.menuView.render();
        },
        pilotos:function(){
        	console.log("Pilotos");
        	this.PilotosPage = new PilotosPage();
            this.PilotosPage.render();
        }
        
    });
    // iniciamos la aplicación
     app = new router;
         Backbone.history.start(); 
});