var App = require('app');
var _ = require('underscore');

var Match = App.Model.extend({
	initialize: function() {
		this.players = new App.Collection(this.get('players'), {
			model: require('./user')
		});
	},
	parse: function() {
		var data = this._super("parse", arguments);

		this.players.reset(data.players);

		return data;
	},
	getPlayer: function(team, position) {
		var result = this.players.find(function(player) {
			if (position && player.get('position') !== position) {
				return false;
			}
			return player.get('team') === team;
		});
		debugger;
		return result;
	},
	sit: function(options) {
		var self = this;
		return App.rpcgw.get('matchSit', options)
			.done(function(data) {
				self.set(data.match);
			});
	}
}, {
	noun: 'match'
});

module.exports = Match;
