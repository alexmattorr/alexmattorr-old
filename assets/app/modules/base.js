// base functions
app.base = (function($, _ , app, grunticon) {

	var def = function() {
		app.options = {};

		// setup touch for mobile
		app.options.uAgent = navigator.userAgent;
    app.options.interaction = app.options.uAgent.match(/(iPad|iPhone|iPod)/g) ? "touchstart" : "click";

		init.call(this);
	};

	var init = function(){
		this.gruntIcon();
		// this.module();
	};

	def.prototype = {
		// grunticon
		gruntIcon: function() {
			grunticon(["../assets/svg/icons.data.svg.css", "../assets/svg/icons.data.png.css", "../assets/svg/icons.fallback.css"]);
			
			// ie8 hack for icons
				setTimeout(function(){
					$('.icon').hide();
					$('.icon').show();
				}, 1200);

		},

		stickEmUp: function() {
			$(document).ready(function() {
			 	new app.StickEmUp('.stick-em-up');
			 });
		}

		// a module
		/*module: function() {
			$('#content').each(function() {
				//////////////////////////////////////////////////////// 
				
				we instantiate in this way so that we
				can access our methods from the frontend with jQuery
				like: `$('#content').data().myModule._methodName_();`
				
				////////////////////////////////////////////////////////
				$(this).data('myModule', new app.myModule(this));
			});
		}*/

	};

	return def;
}).call(this, jQuery, _, app, grunticon);