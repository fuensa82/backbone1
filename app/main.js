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
    'Vistas'
    ], function ($, _, Backbone,Vistas) {
    // rutas de la aplicación
    var router = Backbone.Router.extend({
        routes: {
          '': 'home',
          'menu':'menu',
          'home':'home'
        },
        home: function(){
            this.homeView = new Vistas.homeView();
            this.homeView.render();
        },
        menu:function(){
        	this.menuView = new Vistas.menuView();
            this.menuView.render();
        }
    });
    // iniciamos la aplicación
     app = new router;
         Backbone.history.start(); 
});