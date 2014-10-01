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
// ///////////////////////////////////////////////
// name:      StickEmUp
// purpose:   to stick things up
// usage:     markup required is:
// //////     <div class="stick-em-up"></div>
//
// ///////////////////////////////////////////////
app.StickEmUp = (function($, app) {
    
    var def = function(el) {
        this.name = 'stick-em-up';
        this.$els = $(el);

        this.states = {
            'fixed': 'fixed',
            'abs': 'absolute'
        };

        this.base = this.$els.eq(0).offset().top;

        init.call(this);
    };

    var init = function() {
        this.load();
        this.bind();
    };

    def.prototype = {

        bind: function() {
            var self = this;

            $(window).on('scroll', function() {
                self.scroll();
            });
        },

        load: function() {
            var self = this;

            this.$els.each(function() {
                var stick = $(this);

                $(this).wrap('<div class="'+self.name+'-container"></div>');

                stick.parent().height(stick.outerHeight(true));

                $.data(stick[0], 'pos', stick.offset().top);
            });
        },

        scroll: function() {
            var self = this;

            this.$els.each(function(i) {
                var stick = $(this),
                    next = self.$els.eq(i+1),
                    prev = self.$els.eq(i-1),
                    pos = $.data(stick[0], 'pos');

                if(pos <= $(window).scrollTop()) {
                    stick.addClass(self.states.fixed);

                    if(next.length > 0 && stick.offset().top >= $.data(stick[0], 'pos') - stick.outerHeight()) {
                        stick.addClass(self.states.abs).css('top', $.data(next[0], 'pos') - (stick.outerHeight() * 2) - (self.base - self.$els.eq(i).outerHeight()) );
                    }
                } else {
                    stick.removeClass(self.states.fixed);

                    if (prev.length > 0 && $(window).scrollTop() <= $.data(stick[0], 'pos') - prev.outerHeight()) {
                        prev.removeClass(self.states.abs).removeAttr('style');
                    }
                }
            });
        }

    };

    return def;
}).call(this, jQuery, app);
//# sourceMappingURL=app.js.map