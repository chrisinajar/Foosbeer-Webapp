var App = require('app');
var _ = require('underscore');

var MatchLobby = App.View.extend({
	className: 'lobby',

	view_template: _.template([
		'<div class="row">',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<user-icon />',
				'</div>',
				'<div class="row">',
					'<user-icon />',
				'</div>',
			'</div>',
			'<div class="col-xs-2">',
			'</div>',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<user-icon />',
				'</div>',
				'<div class="row">',
					'<user-icon />',
				'</div>',
			'</div>',
		'</div>',
	].join('')),

	selecting_template: _.template([
		'<div class="row">',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<div class="btn btn-default btn-large">Play Defense</div>',
				'</div>',
				'<div class="row">',
					'<div class="btn btn-default btn-large">Play Offense</div>',
				'</div>',
			'</div>',
			'<div class="col-xs-2">',
			'</div>',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<div class="btn btn-default btn-large">Play Offense</div>',
				'</div>',
				'<div class="row">',
					'<div class="btn btn-default btn-large">Play Defense</div>',
				'</div>',
			'</div>',
		'</div>',
	].join('')),

	stateModelEvents: {
		'change:state': 'render'
	},

	initialize: function() {
		this.stateModel = new App.Model({
			state: 'view'
		});
		// our model is the actual match. conveeeenient!
	},

	selectSpot: function() {
		this.stateModel.set({
			state: 'selecting'
		});
	},
	finishSelectingSpot: function() {
		this.stateModel.set({
			state: 'view'
		});
	}
});

module.exports = MatchLobby;
