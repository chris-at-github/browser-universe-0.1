Universe.Application.Models.Planet = Backbone.Model.extend({
	defaults: {
		color: 'blue',
		position: {
			x: 0,
			y: 0
		}
	},
	initialize: function() {
	  console.log('Welcome to the Universe');
	}
});

PlanetModel = new Universe.Application.Models.Planet({
	color: 'green',
	position: {
		x: 15,
		y: 15
	}
});

// ---

Universe.Application.Views.Planet = Backbone.View.extend({
	tagName: 'div',
	className: 'planet',

	events: {
		'click': 'onFocus',
	},

	initialize: function() {
		console.log('Print the Universe');
	},

	render: function() {

		// X / Y Position setzen
		var position = this.model.get('position');
		this.$el.css({
			top: 	position.y,
			left: position.x,
		});

		return this.el;
	},

	onFocus: function() {
		console.log('Activate the Planet');
	}
});

PlanetView = new Universe.Application.Views.Planet({
	model: PlanetModel
});

// ---

var PlanetContainer = $('#planet-container');
		PlanetContainer.append(PlanetView.render());