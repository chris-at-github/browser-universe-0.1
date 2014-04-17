Universe.Application.Views.Modal = Backbone.View.extend({
	tagName: 'div',
	id: 'modal',

	initialize: function() {
	},

	close: function() {
		this.$el.html(null);
	},

	setBody: function(body) {
		this.$el.html(body);
	},

	render: function() {
		return this.el;
	}
});

// ---
$(function() {

	// Layout
	Universe.Modal = new Universe.Application.Views.Modal();

	var Page = $('body');
			Page.append(Universe.Modal.render());

	// Planeten
	var planetCollection = new Universe.Application.Collections.Planet();
			planetCollection.add(Universe.Application.Fixtures.Planet);

	var planetCollectionView = new Universe.Application.Views.PlanetCollection({
		collection: planetCollection
	});
	Page.append(planetCollectionView.render());
});