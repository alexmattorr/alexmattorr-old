var app = (function() {
	var defaults = [];
	return { 

	}
})();

$(function() {
	new app.base();
})
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

		// a module
		module: function() {
			$('#content').each(function() {
				//////////////////////////////////////////////////////// 
				/*
				we instantiate in this way so that we
				can access our methods from the frontend with jQuery
				like: `$('#content').data().myModule._methodName_();`
				*/
				////////////////////////////////////////////////////////
				$(this).data('myModule', new app.myModule(this));
			});
		}

	};

	return def;
}).call(this, jQuery, _, app, grunticon);
/*app.myModule = (function($, _, app) {

	var def = function(el) {
		this.$els = {
			'item': el,
			'trigger': '.my-module-trigger'
		};

		this.trigger = '<button class="button my-module-trigger">Click me, I do JavaScript</button>';

		this.options = {
			'bgColor' : '#d6d6d6',
			'target' : '#content .wrapper'
		}

		init.call(this);

	};

	var init = function() {
		this.setup();
		this.addColor();
	};

	def.prototype = {

		setup: function() {
			var self = this;
			$(this.options.target).append(this.trigger);
			$(this.$els.trigger).on('click', function() {
				self.toggle();
			});
		},

		toggle: function() {
			this.on ? this.reset() : this.addColor();
		},

		addColor: function() {
			$(this.$els.item).css('background-color', this.options.bgColor);
			this.on = true;
		},

		reset: function() {
			$(this.$els.item).css('background-color', '');
			this.on = false;
		}
	}

	return def;

})(jQuery, _, app);*/
//# sourceMappingURL=app.js.map