var App = require('app');
var _ = require('underscore');

var MatchLobby = App.View.extend({
	className: 'lobby',

	view_1v1_template: _.template([
		'<% if (players.length === maxPlayers) { %>',
			'<div class="btn btn-large btn-default finishMatch">Complete Match</div>',
		'<% } %>',

		'<div class="row">',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<user-icon model-key="playerOne" />',
				'</div>',
			'</div>',
			'<div class="col-xs-2">',
			'</div>',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<user-icon model-key="playerTwo" />',
				'</div>',
			'</div>',
		'</div>',
	].join('')),

	view_2v2_template: _.template([
		'<% if (players.length === maxPlayers) { %>',
			'<div class="btn btn-large btn-default finishMatch">Complete Match</div>',
		'<% } %>',

		'<div class="row">',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<user-icon model-key="playerOneDefense" />',
				'</div>',
				'<div class="row">',
					'<user-icon model-key="playerOneOffense" />',
				'</div>',
			'</div>',
			'<div class="col-xs-2">',
			'</div>',
			'<div class="col-xs-5">',
				'<div class="row">',
					'<user-icon model-key="playerTwoOffense" />',
				'</div>',
				'<div class="row">',
					'<user-icon model-key="playerTwoDefense" />',
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

	score_template: _.template([
		'<div class="row">',
			'<div class="col-xs-5">',
				'<input type="number" step="1" min="0" required="true" class="scoreOne" placeholder="<%- ~~(Math.random()*10) %>">',
			'</div>',
			'<div class="col-xs-2">',
				'<div class="finishScore">Done</div>',
			'</div>',
			'<div class="col-xs-5">',
				'<input type="number" step="1" min="0" required="true" class="scoreTwo" placeholder="<%- ~~(Math.random()*10) %>">',
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

		'click .finishMatch': 'finishMatch',
		'click .finishScore': 'finishScore'
	},

	modelEvents: {
		'change:type': 'resetState',
		'change:players': 'render'
	},

	stateModelEvents: {
		'change:selecting': 'resetState',
		'change:state': 'render'
	},

	initialize: function() {
		this.stateModel = new App.Model();

		this.listenTo(this.model.players, "change reset add remove", this.render);
		// our model is the actual match. conveeeenient!
		this.resetState();
	},

	getTemplateData: function() {
		var data = this._super("getTemplateData", arguments);

		// debugger;

		switch (data.type) {
			case "1v1":
				data.playerOne = this.model.getPlayer(0, "mixed");
				data.playerTwo = this.model.getPlayer(1, "mixed");
				break;
			case "2v2":
				data.playerOneOffense = this.model.getPlayer(0, "offense");
				data.playerOneDefense = this.model.getPlayer(0, "defense");
				data.playerTwoOffense = this.model.getPlayer(1, "offense");
				data.playerTwoDefense = this.model.getPlayer(1, "defense");
				break;
		}

		return data;
	},

	// render: function() {
	// 	debugger;
	// 	this._super("render", arguments);
	// },

	sit: function(options) {
		var self = this;

		this.model.sit(options)
			.done(this.finishSelectingSpot.bind(this));
	},
	joinYellowDefense: function() {
		this.sit({
			team: 0,
			position: 'defense'
		});
	},
	joinYellowOffense: function() {
		this.sit({
			team: 0,
			position: 'offense'
		});
	},
	
	joinBlackDefense: function() {
		this.sit({
			team: 1,
			position: 'defense'
		});
	},
	joinBlackOffense: function() {
		this.sit({
			team: 1,
			position: 'offense'
		});
	},

	joinYellowMixed: function() {
		this.sit({
			team: 0,
			position: 'mixed'
		});
	},

	joinBlackMixed: function() {
		this.sit({
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

	finishMatch: function() {
		this.stateModel.set({
			state: 'score'
		});
	},
	finishScore: function() {
		this.model.finish(this.$(".scoreOne").val(), this.$(".scoreTwo").val()).done(App.user.fetch.bind(App.user));
	},

	resetState: function() {
		this.stateModel.set({
			state: (this.stateModel.get('selecting') ? 'selecting' : 'view') + '_' + this.model.get('type')
		});
	}
});

module.exports = MatchLobby;
