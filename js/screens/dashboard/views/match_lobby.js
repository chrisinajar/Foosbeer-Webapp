var App = require('app');
var _ = require('underscore');

var MatchLobby = App.View.extend({
	className: 'lobby',

	view_1v1_template: _.template([
		'<div class="row">',
			'<div class="col-xs-5">',
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
			'</div>',
		'</div>',
	].join('')),

	view_2v2_template: _.template([
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

	selecting_2v2_template: _.template([
		'<div class="row">',
			'<div class="col-xs-5">',
				'<div class="btn-group-vertical">',
					'<div class="btn btn-default btn-large joinYellowDefense">Play Defense</div>',
					'<div class="btn btn-default btn-large joinYellowOffense">Play Offense</div>',
				'</div>',
			'</div>',
			'<div class="col-xs-2">',
			'</div>',
			'<div class="col-xs-5">',
				'<div class="btn-group-vertical">',
					'<div class="btn btn-default btn-large joinBlackOffense">Play Offense</div>',
					'<div class="btn btn-default btn-large joinBlackDefense">Play Defense</div>',
				'</div>',
			'</div>',
		'</div>',
	].join('')),

	selecting_1v1_template: _.template([
		'<div class="row">',
			'<div class="col-xs-5">',
				'<div class="btn-group-vertical">',
					'<div class="btn btn-default btn-large joinYellowMixed">Yellow Team</div>',
				'</div>',
			'</div>',
			'<div class="col-xs-2">',
			'</div>',
			'<div class="col-xs-5">',
				'<div class="btn-group-vertical">',
					'<div class="btn btn-default btn-large joinBlackMixed">Black Team</div>',
				'</div>',
			'</div>',
		'</div>',
	].join('')),

	events: {
		'click .joinYellowDefense': 'joinYellowDefense',
		'click .joinYellowOffense': 'joinYellowOffense',
		
		'click .joinBlackDefense': 'joinBlackDefense',
		'click .joinBlackOffense': 'joinBlackOffense',

		'click .joinYellowMixed': 'joinYellowMixed',

		'click .joinBlackMixed': 'joinBlackMixed',

	},

	modelEvents: {
		'change:type': 'resetState'
	},

	stateModelEvents: {
		'change:selecting': 'resetState',
		'change:state': 'render'
	},

	initialize: function() {
		this.stateModel = new App.Model();
		// our model is the actual match. conveeeenient!

		this.resetState();
	},

	getTemplateData: function() {
		var data = this._super("getTemplateData", arguments);

		return data;
	},


	joinYellowDefense: function() {
		this.model.sit({
			team: 0,
			position: 'defense'
		});
	},
	joinYellowOffense: function() {
		this.model.sit({
			team: 0,
			position: 'offense'
		});
	},
	
	joinBlackDefense: function() {
		this.model.sit({
			team: 1,
			position: 'defense'
		});
	},
	joinBlackOffense: function() {
		this.model.sit({
			team: 1,
			position: 'offense'
		});
	},

	joinYellowMixed: function() {
		this.model.sit({
			team: 0,
			position: 'mixed'
		});
	},

	joinBlackMixed: function() {
		this.model.sit({
			team: 1,
			position: 'mixed'
		});
	},

	selectSpot: function() {
		this.stateModel.set({
			selecting: true
		});
	},
	finishSelectingSpot: function() {
		this.stateModel.set({
			selecting: false
		});
	},
	resetState: function() {
		this.stateModel.set({
			state: (this.stateModel.get('selecting') ? 'selecting' : 'view') + '_' + this.model.get('type')
		});
	}
});

module.exports = MatchLobby;
