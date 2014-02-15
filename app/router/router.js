define([
	'jquery',
	'underscore',
	'backbone',
	'Vistas',
	'src/vistas/menu',
	'src/vistas/pilotosPage',
	'src/vistas/miApuestaPage'
	], function ($, _, Backbone,Vistas,Menu,PilotosPage,MiApuestaPage) {
	// rutas de la aplicación
	var router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'menu':'menu',
			'home':'home',
			'pilotos':'pilotos',
			'miApuesta':'miApuesta'
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
			this.pilotosPage = new PilotosPage();
			this.pilotosPage.render();
		},
		miApuesta:function(){
            console.log("Pilotos");
			this.miApuestaPage = new MiApuestaPage();
			this.miApuestaPage.render();
        }

		
	});
	return router;
});