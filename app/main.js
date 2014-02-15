require.config({
    paths: {
        jquery: 'vendor/jquery',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        Vistas:'src/Vistas',
        text:'vendor/text',
        router:'router/router'
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
    'router'
    ], function ($, _, Backbone,Router) {
        console.log("Entrando");
        window.app = new Router;
        Backbone.history.start(); 
    }
);