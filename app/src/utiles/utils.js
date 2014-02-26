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
            this.cargaTemplate("comboPiloto").done(function(template){
                console.log(template);
                console.log($("#"+el));
                var compile=_.template(template,{"label":label,"id":id});
                $("#"+el).html(compile);
                _.each(opciones,function(item){
                    if(item.id===selected){
                        $("#"+el+" select").append("<option selected value='"+item.id+"'>"+item.nombre+"</option>");
                    }else{
                        $("#"+el+" select").append("<option value='"+item.id+"'>"+item.nombre+"</option>");
                    }
                })
                
            });

        }
        
   
    };
    return utils;
});