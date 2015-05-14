var App = require('app');
var _ = require('underscore');

var UserIcon = App.View.extend({
	template: _.template([
		'<img src="<%- url %>" />'
	].join('')),

	modelEvents: {
		"change": "render"
	},

	initialize: function() {
		if (this.model && _(this.model.get('profile')).isEmpty() && !this.model.promise) {
			this.model.fetch();
		}
	},

	getTemplateData: function() {
		var data = this._super("getTemplateData", arguments);

		data.url = null;

		if (data.profile && data.profile._json) {
			if (data.profile._json.avatar_url) {
				data.url = data.profile._json.avatar_url;
			} else {
				// what's your avatar?
				debugger;
			}
		}

		return data;
	}
});

App.registerElement('user-icon', UserIcon);
