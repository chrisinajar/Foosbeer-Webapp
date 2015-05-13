var App = require('app');
var _ = require('underscore');
var User = require('./user');

// match player model is for players in the match. This contains team and type and player, exposes player as a model

module.exports = App.Model.extend({
	initialize: function() {
		this.resetUser();
	},
	parse: function() {
		var data = this._super("parse", arguments);

		this.resetUser();

		return data;
	},
	resetUser: function() {
		var playerData = this.get('player');
		if (typeof playerData !== 'object') {
			playerData = {
				_id: playerData
			};
		}
		if (!this.user) {
			this.user = new User(playerData);
		} else {
			this.user.reset(playerData);
		}

		if (_(this.user.get('profile')).isEmpty()) {
			this.user.fetch();
		}
	}
});
