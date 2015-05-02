var App = require('app');
var Match = require('./match');

var User = App.Model.extend({
	defaults: {
		email: null,
		mmr: 500,
		name: "Full Name",
		profile: {},
		match_state: 'inactive'
	},

	initialize: function() {
		this.match = new Match(this.attributes.currentMatch);
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
				self.set({
					match_state: 'active',
					currentMatch: data.match
				}, { parse: true });
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

});

module.exports = User;
