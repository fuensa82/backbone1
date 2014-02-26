define([
	'jquery',
	'underscore',
	'backbone',
	'src/utiles/utils',
	'src/models/proxCarreraModel'
	], function ($, _, Backbone, Utils,MProxCarrera) {
	// la vista homeView	
	
	var vista = Backbone.View.extend({
		el: 'body',
		tpl: 'miApuesta',
		render: function(){
			console.log("Render de pilotos");
			var context=this;
			var modelo=new MProxCarrera();
			modelo.fetch({
				success:_.bind(function(mod){
					console.log("Cargado el modelo. "+mod.getProxCarrera());
					Utils.cargaTemplate(this.tpl).done(function(plantilla){
						console.log("--- "+mod.getProxCarrera());
						var compile=_.template(plantilla,mod.getProxCarrera());
						context.$el.html(compile+"<br/>SIII");
						Utils.crearCombo("comboPole","pole","Pole",[{id:"ALO",nombre:"Alonso"},{id:"KIM",nombre:"Kimi R"}],"KIM");
					});
				},this)
			});
			
		}
	});
	return vista;
});