String.prototype.ucfirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

// ---

Universe.Application.Views.Sidebar = Backbone.View.extend({
	tagName: 'div',
	id: 'sidebar',
	container: [],

	initialize: function() {
	},

	add: function(container) {
		this.container.push(container);
		this.append(container);
	},

	append: function(container) {
		this.$el.append(container.render());
	},

	render: function() {
		var instance = this;

		_(this.container).each(function(container) {
			instance.append(container);
		});

		return this.el;
	}
});

// ---

Universe.Application.Views.Container = Backbone.View.extend({
	tagName: 'div',
	className: 'container',

	initialize: function() {
	},

	close: function() {
		this.$el.addClass('close');
	},

	setBody: function(body) {
		this.$el.html(body);
	},

	render: function() {
		return this.el;
	}
});

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
	// Universe.Modal = new Universe.Application.Views.Modal();

	// Sidebar
	Universe.Registry.Sidebar = new Universe.Application.Views.Sidebar();

	var Page = $('body');
			// Page.append(Universe.Modal.render());
			Page.append(Universe.Registry.Sidebar.render());

	// Player
	Universe.Registry.PlayerCollection = new Universe.Application.Collections.Player();
	Universe.Registry.PlayerCollection.add(Universe.Application.Fixtures.Player);

	// Planeten
	var planetCollection = new Universe.Application.Collections.Planet();
			planetCollection.add(Universe.Application.Fixtures.Planet);

	var planetCollectionView = new Universe.Application.Views.PlanetCollection({
		collection: planetCollection
	});
	Page.append(planetCollectionView.render());
});