require.config({
	baseUrl: '/js',
	paths: {
		'jquery': 'libraries/jquery-2.1.0.min',
		'underscore': 'libraries/underscore-1.6.0',
		'backbone': 'libraries/backbone-1.1.2',
		'marionette': 'libraries/backbone.marionette-1.8.4',
		'backbone.localstorage': 'libraries/backbone.localstorage-1.1.7',
	},
	shim: {
		'underscore': {
			exports: '_'
		},

		'backbone' : {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},

		'marionette': {
			deps: ['jquery', 'underscore', 'backbone'],
			exports: 'Marionette'
		}
	}
});

require(['views/application'], function(Application) {
	$('body').append(Application.render().el);
});