var App = require('app');
var Model = require('./model');
var _ = require('lodash');

module.exports = Model.extend({
	noIoBind: false,
	initialize: function () {
		_.bindAll(this, 'serverChange', 'serverDelete', 'modelCleanup');

		/*!
		 * if we are creating a new model to push to the server we don't want
		 * to iobind as we only bind new models from the server. This is because
		 * the server assigns the id.
		 */
		if (!this.noIoBind) {
			this.ioBind('update', window.socket, this.serverChange, this);
			this.ioBind('delete', window.socket, this.serverDelete, this);
			this.bindCustom();


			console.log(this.constructor.noun);
			socket.roomAdd(this.constructor.noun, function() {
				// done! cool.
			})
		}
	},
	bindCustom: function() {
		//overwrite me w/ custom event bindings for this model
	},
	serverChange: function (data) {
		// Useful to prevent loops when dealing with client-side updates (ie: forms).
		data.fromServer = true;
		this.set(data);
		this.trigger('serverUpdate', data);
	},
	serverDelete: function (data) {
		if (this.collection) {
			this.collection.remove(this);
		} else {
			this.trigger('remove', this);
		}
		this.modelCleanup();
	},
	modelCleanup: function () {
		this.ioUnbindAll();
		return this;
	}
});