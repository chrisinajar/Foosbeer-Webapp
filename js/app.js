var App = require('discus').createClone();

// expose common objects
App.Collection = require('./common/collection');
App.Model = require('./common/model');
App.Object = require('./common/object');
App.Screen = require('./common/screen');
App.View = require('./common/view');

// quick reference to the global radio
App.radio = require('backbone.radio');

module.exports = App;