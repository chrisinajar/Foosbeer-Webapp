var App = require('discus').createClone();

// expose common objects
App.Collection = require('./common/collection');
App.Model = require('./common/model');
App.SocketCollection = require('./common/socketCollection');
App.SocketModel = require('./common/socketModel');
App.Object = require('./common/object');
App.Screen = require('./common/screen');
App.View = require('./common/view');
App.Router = require('./common/router');

// quick reference to the global radio
App.radio = require('backbone.radio');

window.App = App;

App.addRouter = function(Type) {
	var instance = new Type();
	App.router = instance; // fuckit

	// do something with instance?
};

module.exports = App;
