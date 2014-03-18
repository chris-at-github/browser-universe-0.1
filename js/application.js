Universe.Application.Models.Planet = Backbone.Model.extend({
	defaults: {
		color: 'blue'
	},
	initialize: function() {
	  console.log('Welcome to the Universe');
	}
});

PlanetModel = new Universe.Application.Models.Planet({
	color: 'green'
});

// ---

Universe.Application.Views.Planet = Backbone.View.extend({
	tagName: 'div',
	className: 'planet',

	initialize: function() {
		console.log('Print the Universe', this.model);
	},

	render: function() {
		return this.el;
	}
});

PlanetView = new Universe.Application.Views.Planet({
	model: PlanetModel
});

// ---

var PlanetContainer = $('#planet-container');
		PlanetContainer.append(PlanetView.render());