var App = require('app');
var _ = require('underscore');

var Header = require('./header');

var Window = App.View.extend({
	template: _.template([
		'<nav class="header" id="window_header">',
		'</nav>',
		'<section>',
			'Hey, this is a window!',
		'</section>'
	].join('')),

	initialize: function() {
		this.stateModel = this.createSharedStateModel('window');

		console.log("I am a screen!");
		this.header = new Header({
			parent: this,
			renderTo: '#window_header'
		});
	}
});


module.exports = {
	view: new Window()
};
