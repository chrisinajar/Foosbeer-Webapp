var _ = require('underscore');
var App = require('../app');

var Window = App.Screen.extend({
	template: _.template([
		'Hey, this is a window!'
	].join('')),

	initialize: function() {
		console.log("I am a screen!");
	}
});


module.exports = {
	view: new Window()
};
