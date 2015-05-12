// require components at the bottom!
var App = require('app');

App.registerElement = function(tag, Type) {
	function cb(fn) {
		return {value:fn};
	}
	return document.registerElement(tag, {
		prototype: Object.create(HTMLElement.prototype, {
			createdCallback: cb(function() {
				var parentView = App.viewByCID($(this).closest('[data-cid]').data('cid')),
					modelKey = $(this).attr('model-key'),
					model = modelKey ? parentView._templateData[modelKey] : parentView.model;

				this.backboneView = new Type({
					parent: parentView,

					model: model,
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
