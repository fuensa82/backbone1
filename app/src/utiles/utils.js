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
        },
        crearCombo: function(el,id,label,opciones,selected){
            var dfd = new $.Deferred();
            this.cargaTemplate("comboPiloto").done(function(template){
                var compile=_.template(template,{"label":label,"id":id});
                $("#"+el).html(compile);
                _.each(opciones,function(item){
                    if(item.value===selected){
                        $("#"+el+" select").append("<option selected value='"+item.value+"'>"+item.text+"</option>");
                    }else{
                        $("#"+el+" select").append("<option value='"+item.value+"'>"+item.text+"</option>");
                    }
                })
                dfd.resolve();
            });
            return dfd.promise();

        }
        
   
    };
    return utils;
});