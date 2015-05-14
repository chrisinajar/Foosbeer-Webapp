var App = require('app');
var _ = require('underscore');

var Match = App.Model.extend({
	initialize: function() {
		this.players = new App.Collection(this.get('players'), {
			model: require('./matchPlayer')
		});

		// this.listenTo(this, "change:players", this.resetPlayers);
	},
	parse: function() {
		var data = this._super("parse", arguments);

		this.resetPlayers(data.players);

		return data;
	},
	resetPlayers: function(data) {
		this.players.set(data || this.get('players'));
	},
	getPlayer: function(team, position) {
		var matchPlayer = this.getMatchPlayer(team, position);
		return matchPlayer ? matchPlayer.user : null;
	},
	getMatchPlayer: function(team, position) {		
		var result = this.players.find(function(player) {
			if (position && player.get('position') !== position) {
				return false;
			}
			return player.get('team') === team;
		});
		return result;
	},
	sit: function(options) {
		var self = this;
		return App.rpcgw.get('matchSit', options)
			.done(function(data) {
				self.set(data.match);
				self.resetPlayers();
			});
	}
}, {
	noun: 'match'
});

module.exports = Match;
