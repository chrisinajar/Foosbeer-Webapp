var App = require('app');
var _ = require('underscore');

var MatchList = App.View.extend({
	template: _.template([
		'<div class="btn btn-default btn-large joinMatch" data-id="<%- id %>">',
			'<%- players.length %>/<%- maxPlayers %>',
		'</div>',
	].join('')),

	events: {
		'click .joinMatch': 'joinMatch'
	},

	initialize: function() {
		this.collection = this.options.collection;

		this.listenTo(this.collection, "add remove reset", _(this.render).debounce());
	},

	render: function() {
		var self = this;
		this.collection.each(function(match) {
			self.$el.append(self.template(match.toJSON()));
		});
	},

	joinMatch: function(e) {
		var target = $(e.target);

		App.user.joinMatch(target.data('id'));
	}
});

module.exports = MatchList;