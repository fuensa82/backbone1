define([
	'jquery',
	'underscore',
	'backbone',
	'src/utiles/utils'
	], function ($, _, Backbone, Utils) {
	// la vista homeView	
	
	var menuView = Backbone.View.extend({
		el: 'body',
		template: _.template('Hola Mundo menu')	,
		render: function(){
			var context=this;
			Utils.cargaTemplate('principal').done(function(plantilla){
				context.$el.html(plantilla+"<br/>SIII");
				var cols = $('#columns .column');
				_.each(cols,function(col){
					console.log("1. "+col);

					col.addEventListener('dragstart', function(e){
					    this.style.opacity = '0.4';
                        dragSrcEl = this;
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('text/html', this.innerHTML);
					}, false);
					
                    col.addEventListener('dragenter', function(e){
					   this.classList.add('over');
					}, false);
					
                    col.addEventListener('dragover', function(e){
    					if (e.preventDefault) {
    						e.preventDefault(); // Necessary. Allows us to drop.
						}
						e.dataTransfer.dropEffect = 'move';	// See the section on the DataTransfer object.
						return false;
			     	}, false);
					
                    col.addEventListener('dragleave', function(e){
                        this.classList.remove('over');
                    }, false);

                    col.addEventListener('drop', function(e){
                        if (e.stopPropagation) {
                            e.stopPropagation(); // stops the browser from redirecting.
                        }
                        if (dragSrcEl != this) {
                            dragSrcEl.innerHTML = this.innerHTML;
                            this.innerHTML = e.dataTransfer.getData('text/html');
                        }
                        return false;
                    }, false);

                    col.addEventListener('dragend', function(e){
                        _.each(cols, function (col2) {
                            col2.classList.remove('over');
                            col2.style.opacity=1;
                        });
                    }, false);
				});
			});
			//this.$el.html(this.template({}));
		}
	});
	return menuView;
});