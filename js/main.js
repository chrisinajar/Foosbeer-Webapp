require('./plugins');

var App = require('./app');

var Window = require('./window');

$(function() {
	Window.view.renderTo($('#view'));
});
