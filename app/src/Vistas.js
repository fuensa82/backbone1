define([
    'jquery',
    'underscore',
    'backbone',
    'src/utiles/utils'
    ], function ($, _, Backbone, Utils) {
    // la vista homeView    
    var homeView = Backbone.View.extend({
        el: 'body',
        template: _.template('Hola <a href="#menu">Mundo</a><br/><a href="#pilotos">Piloto</a><br/><a href="#miApuesta">lista</a>')  ,
        render: function(){
            this.$el.html(this.template({}));
        }
    });
    var menuView = Backbone.View.extend({
        el: 'body',
        template: _.template('Hola Mundo menu')  ,
        render: function(){
        	var context=this;
        	Utils.cargaTemplate('principal').done(function(plantilla){
        		context.$el.html(plantilla);
        		//deferred.resolve();
        	});
            //this.$el.html(this.template({}));
        }
    });
     
     
    return {
        homeView : homeView,
        menuView : menuView
    };
});