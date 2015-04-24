window.jQuery = window.$ = require('jquery');
window.Backbone = require('backbone');

var _ = require('lodash');

var _require = require;

window.require = function(name) {
	switch (name) {
		case "backbone":
			return Backbone;
		case "underscore":
			return _;
		case "jquery":
			return $;
		default:
			throw new Error("Module shim does not contain " + name);
	}
};

require('discus');

require('bootstrap');

var App = require('./app');

var Window = require('./window');
