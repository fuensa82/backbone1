define([
	'jquery',
	'underscore',
	'backbone',
	'src/utiles/utils',
	'src/models/pilotos'
	], function ($, _, Backbone, Utils,MPilotos) {
	// la vista homeView	
	
	var vista = Backbone.View.extend({
		el: 'body',
		render: function(){
			console.log("Render de pilotos");
			var context=this;
			var modelo=new MPilotos();
			modelo.fetch({
				success:function(mod){
					console.log("Cargado el modelo. "+mod.get("Nombre"));
					Utils.cargaTemplate('pilotos').done(function(plantilla){
						var compile=_.template(plantilla,mod.attributes[0]);
						context.$el.html(compile+"<br/>SIII");
					});
				}
			});
			
		}
	});
	return vista;
});