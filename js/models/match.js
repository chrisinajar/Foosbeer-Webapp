var App = require('app');
var _ = require('underscore');

var Match = App.Model.extend({
	sit: function(options) {
		var self = this;
		return App.rpcgw.get('matchSit', options)
			.done(function(data) {
				debugger;
				self.set(data.match);
			});
	}
}, {
	noun: 'match'
});

module.exports = Match;
