define([
	'jquery',
	'underscore',
	'backbone',
	'src/utiles/utils'
	], function ($, _, Backbone, Utils) {
	// la vista homeView	
	
	var modelo = Backbone.Model.extend({
		url: 'http://localhost:3000/miApuesta/vpalomo',
		getPosiciones:function(){
			return this.attributes[0];
		}
	});
	return modelo;
});