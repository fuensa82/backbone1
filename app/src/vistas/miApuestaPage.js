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
						console.log("resuelta PC");
						dfdPC.resolve();
					});
				},this)
			});
			this.modeloPS=new MPilotos();
			this.modeloPS.fetch({
				success:function(){
					console.log("resuelta PS");
					dfdPS.resolve();
				}
			});
			this.modeloMA=new MMiApuesta({id:"vpalomo"});
			this.modeloMA.id="vpalomo";
			this.modeloMA.fetch({
				success:function(){
					console.log("resuelta MA");
					dfdMA.resolve();
				}
			});

			$.when(dfdMA.promise(),dfdPS.promise(),dfdPC.promise()).then(_.bind(function(){
				console.log("Resueltas todas las promesas");
				var listaPilotos=this.modeloPS.getPilotosIdNombre();
				this.listaApuesta=this.modeloMA.getPosiciones();
				console.log("Empezando a pintar combos");
				this.crearCombos(listaPilotos,this.listaApuesta).done(_.bind(function(){
					this.bindCombos();
					this.bindGuardar();
				},this));
			},this));
			
		},
		crearCombos:function(listaPilotos,listaApuesta){
			var dfd = new $.Deferred();
			$.when(
				this.crearCombo(listaPilotos,listaApuesta,'pole'),
				this.crearCombo(listaPilotos,listaApuesta,'primero'),
				this.crearCombo(listaPilotos,listaApuesta,'segundo'),
				this.crearCombo(listaPilotos,listaApuesta,'tercero'),
				this.crearCombo(listaPilotos,listaApuesta,'cuarto'),
				this.crearCombo(listaPilotos,listaApuesta,'quinto'),
				this.crearCombo(listaPilotos,listaApuesta,'sexto'),
				this.crearCombo(listaPilotos,listaApuesta,'septimo')
			).then(function(){
				console.log("--- Creados todos los combos");
				dfd.resolve();
			});
			return dfd.promise()

		},
		crearCombo:function(listaPilotos,listaApuesta,desc){
			var descM=desc.substring(0,1).toUpperCase()+desc.substring(1);
			console.log("Combo "+desc);
			return Utils.crearCombo("divCombo"+descM,"combo"+descM,descM,listaPilotos,listaApuesta[desc]);
		},
		bindCombos:function(){
			var context=this;
			console.log("--- bindCombos");
			_.each(this.combos,function(item){
				var desc=item;
				var descM=desc.substring(0,1).toUpperCase()+desc.substring(1);
				console.log("--- #combo"+descM);
				$("#combo"+descM).on('change',_.bind(function(event){
					console.log(event);
					var value=event.target.value;
					var name=event.target.name.toLowerCase().substring(5);
					context.listaApuesta[name]=value;
				},this));
			})
		},
		combos:['pole','primero','segundo','tercero','cuarto','quinto','sexto','septimo'],
		bindGuardar:function(){
			$("#botonGuardar").bind('click',_.bind(function(){
				console.log("--- Guardar");
				this.modeloMA.set([0],this.listaApuesta);
				this.modeloMA.save({
					success:function(){
						console.log("Guardado");
					}
				});
			},this));
		}

	});
	return vista;
});