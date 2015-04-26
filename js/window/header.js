var App = require('app');
var _ = require('underscore');

var Header = App.View.extend({

	tagName: 'nav',
	className: 'header navbar navbar-default navbar-fixed-top',
	// className: 'container-fluid',

	template: _.template([
		'<div class="container-fluid">',
			'<div class="navbar-header">',
				// this is the menu button, i don't really know why it doesn't appear until mobile
				'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">',
					'<span class="sr-only">Toggle navigation</span>',
					'<span class="icon-bar"></span>',
					'<span class="icon-bar"></span>',
					'<span class="icon-bar"></span>',
				'</button>',
				'<a class="navbar-brand" href="#">FoosBeer</a>',
				'</div>',

	  			'<div class="collapse navbar-collapse" id="navbar-collapse">',
					'<ul class="nav navbar-nav" id="top_nav">',
						'<% _(primaryItems).each(function(item) { %>',
							'<li><a href="<%= item.href %>"><%= item.label %></a></li>',
						'<% }) %>',
					'</ul>',
					'<ul class="nav navbar-nav navbar-right">',
						'<% _(secondaryItems).each(function(item) { %>',
							'<li><a href="<%= item.href %>"><%= item.label %></a></li>',
						'<% }) %>',
					'</ul>',
				'</div>',
			'</div>',
		'</div>',
	].join('')),

	initialize: function() {
		this.stateModel = this.getSharedStateModel('window');
		this.collection = new App.Collection();
		this.stateModel.navItemCollection = this.collection;

		App.radio.channel('header').comply({
			add: this.onAdd,
			activate: this.onActivate,
			remove: this.onRemove
		}, this);

		App.radio.channel('header').command('add', {
			type: 'secondary',
			href: '/api/logout',
			label: 'Logout'
		});
	},
	getTemplateData: function() {
		var data = this._super("getTemplateData", arguments);

		data.primaryItems = _.invoke(this.collection.where({
			type: 'primary'
		}), 'toJSON');
		data.secondaryItems = _.invoke(this.collection.where({
			type: 'secondary'
		}), 'toJSON');

		return data;
	},
	onAdd: function(item) {
		this.collection.add(item);
	},
	onActivate: function(name) {
		this.stateModel.set({
			active: name
		});
	},
	onRemove: function(item) {
		this.collection.remove(item);
	}

});

module.exports = Header;