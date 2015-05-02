// require components at the bottom!
var App = require('app');

App.registerElement = function(tag, Type) {
	function cb(fn) {
		return {value:fn};
	}
	return document.registerElement(tag, {
		prototype: Object.create(HTMLElement.prototype, {
			createdCallback: cb(function() {
				this.backboneView = new Type({
					component: this
				});
			}),
			attachedCallback: cb(function() {
				this.backboneView.renderTo(this);
			})
		})
	});
};


// require components here!
require('./user-icon');
