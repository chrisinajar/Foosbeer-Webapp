var App = require('app');
var Model =  require('../common/socketModel');
var Match = require('./match');

var User = Model.extend({
	defaults: {
		email: null,
		mmr: 500,
		name: "Full Name",
		profile: {},
		match_state: 'inactive'
	},

	urlRoot: 'user',

	initialize: function() {
		this.match = new Match(this.attributes.currentMatch);
		this._super("initialize", arguments);
	},
	parse: function(data) {
		data = this._super("parse", arguments);

		this.match.clear({silent: true});

		if (data.currentMatch) {
			this.match.set(data.currentMatch, { parse: true });
		}

		return data;
	},

	createMatch: function() {
		var self = this;
		return App.rpcgw.get('matchCreate')
			.fail(function(data) {
				debugger;
			})
			.done(function(data) {
				var matchData = self.match.parse(data.match);
				self.match.set(matchData);
				self.set({
					match_state: 'active',
					currentMatch: matchData
				});
			});
	},
	leaveMatch: function() {
		var self = this;
		return App.rpcgw.get('matchLeave')
			.done(function(data) {
				self.set({
					match_state: 'inactive',
					currentMatch: null
				}, { parse: true });
			});
	}

}, {
	noun: 'user'
});

module.exports = User;
