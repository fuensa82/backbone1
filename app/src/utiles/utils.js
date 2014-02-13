define([
    'jquery',
    'underscore',
    'backbone',
    'Vistas'
    ], function ($, _, Backbone,Vistas) {
    // rutas de la aplicación
    var utils = {
        cargaTemplate: function(nombre){
            console.log("Utils");
        	var dfd = new $.Deferred();
            require(["text!src/templates/"+nombre+".tpl"],function(friendHtml ){
	    		dfd.resolve(friendHtml);
	    	});
	    	return dfd.promise();
        }
        
   
    };
    return utils;
});