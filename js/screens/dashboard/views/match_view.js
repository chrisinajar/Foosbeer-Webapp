var App = require('app');
var _ = require('underscore');

var MatchView = App.View.extend({
	// we use different templates depending on what mode we're currently in
	// this is maintained by stateModel.state
	inactive_template: _.template([
		'<div class="btn btn-default btn-large createMatch">Create Match</div>'
	].join('')),

	active_template: _.template([
		'<div class="btn btn-default btn-large leaveMatch">Leave Match</div>'
	].join('')),

	modelEvents: {
		'change:name change:mmr': 'render',
		'change:match_state': 'resetState'
	},
	stateModelEvents: {
		'change:state': 'render'
	},

	events: {
		'click .createMatch': 'createMatch',
		'click .leaveMatch': 'leaveMatch',
	},

	initialize: function() {
		this.stateModel = new App.Model();
		// setup state from our model. this is automatically done with the modelEvent up above, as well
		this.resetState();
	},

	createMatch: function() {
		this.model.createMatch();
	},
	leaveMatch: function() {
		this.model.leaveMatch();
	},

	resetState: function() {
		this.stateModel.set({
			state: this.model.get('match_state')
		});
	}
});

module.exports = MatchView;
