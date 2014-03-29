define([
	'jquery',
	'underscore',
	'backbone',
	'src/utiles/utils'
	], function ($, _, Backbone, Utils) {
	// la vista homeView	
	
	var modelo = Backbone.Model.extend({
		url: 'http://localhost:3000/pilotos',
		getArrayPilotos:function(){
			this.attributes;
		},
		getPilotosIdNombre:function(){
			console.log("--- Entrando en modelo");
			var lista=[];
			_.each(this.attributes,function(item){
				lista.push({value:item.ident_piloto,text:item.nombre_piloto});
			});
			console.log("--- Tamaño: "+lista.length);
			return lista;
		}
	});
	return modelo;
});