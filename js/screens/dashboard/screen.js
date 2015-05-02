var App = require('app');
var _ = require('underscore');
var MatchView = require('./views/match_view');

var Dashboard = App.Screen.extend({
	template: _.template([
		'<div class="container">',
			'<h1><%- name %></h1>',
			'<h2>MMR: <%- mmr %></h2>',
			'<div id="matchSubView"></div>',
		'</div>'
	].join('')),

	initialize: function() {
		this.model = App.user;

		this.matchView = new MatchView({
			parent: this,
			renderTo: '#matchSubView',

			model: this.model
		});
	}
});

module.exports = Dashboard;
