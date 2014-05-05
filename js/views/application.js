define(['jquery', 'underscore', 'backbone', 'marionette'], function($) {
	view = Marionette.ItemView.extend({
		template: '#tmpl-application'
	});

	return new view();
});