var App = require('app');
var _ = require('underscore');

var UserIcon = App.View.extend({
	template: _.template([
		'Hey!!'
	].join('')),

	initialize: function() {
		console.log("I'm an icon!");
	}
});

App.registerElement('user-icon', UserIcon);
