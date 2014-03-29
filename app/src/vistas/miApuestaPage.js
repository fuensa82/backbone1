define([
	'jquery',
	'underscore',
	'backbone',
	'src/utiles/utils',
	'src/models/proxCarreraModel',
	'src/models/pilotosModel',
	'src/models/miApuestaModel'
	], function ($, _, Backbone, Utils,MProxCarrera, MPilotos,MMiApuesta) {
	// la vista homeView	
	
	var vista = Backbone.View.extend({
		el: 'body',
		tpl: 'miApuesta',
		render: function(){
			console.log("Render de pilotos");
			var dfdPC = new $.Deferred(); //Proxima carrera
			var dfdPS = new $.Deferred(); //Pilotos
			var dfdMA = new $.Deferred(); //Mi apuesta
			var context=this;
			this.modeloPC=new MProxCarrera();
			this.modeloPC.fetch({
				success:_.bind(function(mod){
					console.log("Cargado el modelo. "+mod.getProxCarrera());
					Utils.cargaTemplate(this.tpl).done(function(plantilla){
						var compile=_.template(plantilla,mod.getProxCarrera());
						context.$el.html(compile+"<br/>SIII");
						dfdPC.resolve();
						console.log("resuelta PC");
					});
				},this)
			});
			this.modeloPS=new MPilotos();
			this.modeloPS.fetch({
				success:function(){
					dfdPS.resolve();
					console.log("resuelta PS");
				}
			});
			this.modeloMA=new MMiApuesta({id:"vpalomo"});
			this.modeloMA.id="vpalomo";
			this.modeloMA.fetch({
				success:function(){
					dfdMA.resolve();
					console.log("resuelta MA");
				}
			});

			$.when(dfdMA.promise(),dfdPS.promise(),dfdPC.promise()).then(_.bind(function(){
				console.log("Resueltas todas las promesas");
				var listaPilotos=this.modeloPS.getPilotosIdNombre();
				var listaApuesta=this.modeloMA.getPosiciones();
				console.log("Empezando a pintar combos");
				this.crearCombos(listaPilotos,listaApuesta);
				/*Utils.crearCombo("comboPole","pole","Pole",listaPilotos,listaApuesta['pole']);
				Utils.crearCombo("comboPrimero","primero","Primero",listaPilotos,listaApuesta['primero']);
				Utils.crearCombo("comboSegundo","segundo","Segundo",listaPilotos,listaApuesta['segundo']);
				Utils.crearCombo("comboTercero","tercero","Tercero",listaPilotos,listaApuesta['tercero']);*/
			},this));
			
		},
		crearCombos:function(listaPilotos,listaApuesta){
			this.crearCombo(listaPilotos,listaApuesta,'pole');
			this.crearCombo(listaPilotos,listaApuesta,'primero');
			this.crearCombo(listaPilotos,listaApuesta,'segundo');
			this.crearCombo(listaPilotos,listaApuesta,'tercero');
			this.crearCombo(listaPilotos,listaApuesta,'cuarto');
			this.crearCombo(listaPilotos,listaApuesta,'quinto');
			this.crearCombo(listaPilotos,listaApuesta,'sexto');
			this.crearCombo(listaPilotos,listaApuesta,'septimo');

		},
		crearCombo:function(listaPilotos,listaApuesta,desc){
			var descM=desc.substring(0,1).toUpperCase()+desc.substring(1);
			console.log("Combo "+desc);
			Utils.crearCombo("combo"+descM,desc,descM,listaPilotos,listaApuesta[desc]);
		}

	});
	return vista;
});