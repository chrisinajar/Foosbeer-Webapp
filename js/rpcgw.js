// rpcgw. handle login, rely on static login page for login
var App = require('app');

var rpcgw = App.rpcgw = {
	init: function() {
		App.apiServer = location.protocol+'//'+location.host + '/api/';
		if (localStorage.foosbeer_apiserver) {
			App.apiServer = localStorage.foosbeer_apiserver;
		}

		rpcgw.client = new actionheroClient();
		rpcgw.client.on('connected', function() {
			console.log("Connected to action hero!");
		});
		rpcgw.client.on('error', function() {
			console.error("ah error!", arguments);
		});

		$.getJSON('/api/hello', function(data) {
			console.log(data);
				rpcgw.client.connect(function(err, details) {
					if (err != null) { //jshint ignore:line
						console.log(err);
					} else {
						console.log(details);
					}
				});
			})
			.fail(function() {
				console.log("Fail!!", arguments);
				debugger;
				location.href = "/login.html";
			});
	},

	get: function(api, data) {
		var self = this,
			deff = new $.Deferred(),
			promise;

		rpcgw.client.action(api, data, function(result) {
			if (result.error) {
				deff.reject(result.error);
			} else {
				deff.resolve(result);
			}
		});

		promise = deff.promise();

		return promise;
	}
};

module.exports = App.rpcgw;
