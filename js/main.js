require('./plugins');

var App = require('app');

var rpcgw = require('./rpcgw');
var Window = require('./window');

rpcgw.init();

// Queue up window to render async when the dom is done
$(function() {
	Window.view.renderTo($('#view'));
});