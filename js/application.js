String.prototype.ucfirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

// ---

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

	// Player
	var playerCollection = new Universe.Application.Collections.Player();
			playerCollection.add(Universe.Application.Fixtures.Player);

	// Planeten
	var planetCollection = new Universe.Application.Collections.Planet();
			planetCollection.add(Universe.Application.Fixtures.Planet);

	var planetCollectionView = new Universe.Application.Views.PlanetCollection({
		collection: planetCollection
	});
	Page.append(planetCollectionView.render());
});