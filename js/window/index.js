var App = require('app');
var _ = require('underscore');

var Header = require('./header');

var Window = App.View.extend({
	template: _.template([
		'<nav class="header navbar" id="window_header">',
		'</nav>',
		'<section>',
			'<div class="container-fluid" id="window-viewport">',
			'</div>',
		'</section>'
	].join('')),

	initialize: function() {
		this.stateModel = this.createSharedStateModel('window');

		this.header = new Header({
			parent: this,
			renderTo: '#window_header'
		});
	},

	setView: function(view) {
		this.view = view;
		view.setParent(this);
		this.render();
	},
	onRender: function() {
		if (this.view) {
			this.view.renderTo(this.$("#window-viewport"));
		}
	}
});


module.exports = {
	view: new Window()
};
