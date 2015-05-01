var App = require('app');

var User = App.Model.extend({
	defaults: {
		email: null,
		mmr: 500,
		name: "Full Name",
		profile: {},
		match_state: 'inactive'
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
				});
			});
	}

});

module.exports = User;
