require('./plugins');

var App = require('app');

var rpcgw = require('./rpcgw');
var Window = require('./window');

require('./screens');

rpcgw.init()
	.done(function() {
		// Queue up window to render async when the dom is done, it probably is already done, so this probably isn't async...
		// people who use document ready are NERDS
		$(function() {
			Window.view.renderTo($('#view'));
			// debugger;
			App.router.history.start();
		});
	})
	.fail(function() {
		console.log("Fail!!", arguments);
		debugger; //jshint ignore:line
		location.href = "/login.html";
	});
