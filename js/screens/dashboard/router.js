var App = require('app');
var Dashboard = require('./screen');

var DashboardRouter = App.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard'
	},

	home: function() {
		//           To? really?
		this.redirectTo('dashboard');
	},

	dashboard: function() {
		var dashboard = new Dashboard();
		App.window.setView(dashboard);
	}
});

module.exports = DashboardRouter;
