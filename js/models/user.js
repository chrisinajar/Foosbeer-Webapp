var App = require('../app');

var User = App.Model.extend({
	defaults: {
		email: null,
		mmr: 500,
		name: "Full Name",
		profile: {}
	}

});

module.exports = User;
