var App = require('app');
var _ = require('underscore');
var MatchView = require('./views/match_view');

var Dashboard = App.Screen.extend({
	template: _.template([
		'<h1><%- name %></h1>',
		'<h2>MMR: <%- mmr %></h2>',
		'<div class="container" id="matchSubView"></div>'
	].join('')),

	initialize: function() {
		console.log("I'm a screen!");
		this.model = App.user;

		this.matchView = new MatchView({
			parent: this,
			renderTo: '#matchSubView',

			model: this.model
		});
	}
});

module.exports = Dashboard;
