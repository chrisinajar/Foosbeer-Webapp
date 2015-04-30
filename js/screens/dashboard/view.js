var App = require('app');
var _ = require('underscore');

var Dashboard = App.Screen.extend({
	template: _.template([
	].join('')),

	initialize: function() {
		console.log("I'm a screen!");
	},

	getTemplateData: function() {
		var data = this._super('getTemplateData', arguments);

		data.user = App.user;
		debugger;

		return data;
	}
});

module.exports = Dashboard;
