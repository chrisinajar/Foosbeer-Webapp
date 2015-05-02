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

		App.sync = rpcgw.sync;

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
				console.warn("API error:", api, result.message || result.error);

				deff.reject(result);
			} else {
				console.debug("API success:", api, result);
				deff.resolve(result);
			}
		});

		promise = deff.promise();

		return promise;
	},

	sync: function(action, model, options, errcb) {
		var deferr = new $.Deferred(),
			noun = model.constructor.noun;


		if (typeof options == 'function') {
			options = {
				success: options,
				error: errcb
			};
		}

		function success(result) {
			if (options.success) {
				options.success(result);
			}
		}

		function error(result) {
			if (options.error) {
				options.error(result);
			}
		}
		switch (action) {
			case "update": // save":
				rpcgw.get(noun + 'Update', model.saveData ? model.saveData() : model.toJSON())
					.done(deferr.resolve)
					.fail(deferr.reject);

		}

		deferr.done(success).fail(error);

		return deferr.promise();
	}
};

module.exports = App.rpcgw;
