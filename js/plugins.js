// External stuff. don't load local modules here..

// global
window.jQuery = window.$ = require('jquery');
window.Backbone = require('backbone');
Backbone.$ = $;

// local
var _ = require('underscore');

// Fuck you require, I don't know why it fails to find these modules for discus, but it does
// so we define this to catch the modules it fails to load..
// this MUST be before discus is included..
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

// execute
require('discus');
require('bootstrap');
require('webcomponents.js');
require('backbone.iobind');

// our stuff
require('./components');
require('./screens');
