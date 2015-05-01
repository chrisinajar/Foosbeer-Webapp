// rpcgw. handle login, rely on static login page for login
var App = require('app');
var User = require('./models/user');


App.logout = function() {
	return $.ajax({
		url: '/api/logout',
		type: 'get',
		data: {},
		xhrFields: {
			withCredentials: true
		}
	});
};

var rpcgw = App.rpcgw = {
	init: function() {
		var deferr = new $.Deferred();

		App.apiServer = location.protocol+'//'+location.host + '/api/';
		if (localStorage.foosbeer_apiserver) {
			App.apiServer = localStorage.foosbeer_apiserver;
		}

		rpcgw.client = new actionheroClient();
		rpcgw.client.on('connected', function() {
			console.log("Connected to action hero!");
		});
		rpcgw.client.on('error', function() {
			console.error("Action Hero threw an error!", arguments);
		});


		$.getJSON('/api/hello', function(data) {
			console.log(data);
				rpcgw.client.connect(function(err, details) {
					if (err != null) { //jshint ignore:line
						console.log(err);
						deferr.reject(err);
					} else {
						console.log(details);
						App.user = new User(data.user);

						deferr.resolve(App.user);
					}
				});
			})
			.fail(function() {
				deferr.reject.apply(deferr, arguments);
			});

		return deferr.promise();
	},

	get: function(api, data) {
		var self = this,
			deff = new $.Deferred(),
			promise;

		rpcgw.client.action(api, data, function(result) {
			if (result.error) {
				if (result.message) {
					console.warn("API error:", result.message);
				}
				deff.reject(result);
			} else {
				deff.resolve(result);
			}
		});

		promise = deff.promise();

		return promise;
	}
};

module.exports = App.rpcgw;
