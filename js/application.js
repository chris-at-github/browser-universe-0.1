Universe.Application.Models.Planet = Backbone.Model.extend({
	defaults: {
		color: 'blue',
		position: {
			x: 0,
			y: 0
		},
		active: false
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

Universe.Application.Views.PlanetModal = Backbone.View.extend({
	template: _.template($('#tmpl-planet-modal').html()),
	tagName: 'div',
	id: 'planet-modal',

	initialize: function() {
		console.log('Tell the Planet');
	},

	render: function() {
		this.$el.html(this.template({planet: this.model}));
		return this.el;
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
		this.listenTo(this.model, 'change', this.render);

		// Modal fuer die Ausgabe registrieren
		this.modal =  new Universe.Application.Views.PlanetModal({
			model: this.model
		});
	},

	render: function() {

		// X / Y Position setzen
		var position = this.model.get('position');
		this.$el.css({
			top: 	position.y,
			left: position.x,
		});

		// aktive Klasse
		if(this.model.get('active') === true) {
			this.$el.addClass('active');
		}

		return this.el;
	},

	onFocus: function() {
		console.log('Activate the Planet');

		// neue Klasse setzen
		this.$el.addClass('active');

		// Modal-Inhalt setzen
		Modal.setBody(this.modal.render());
	}
});

PlanetView = new Universe.Application.Views.Planet({
	model: PlanetModel
});

// ---

Universe.Application.Views.Modal = Backbone.View.extend({
	tagName: 'div',
	id: 'modal',

	initialize: function() {
		console.log('Tell the Universe');
	},

	setBody: function(body) {
		this.$el.html(body);
	},

	render: function() {
		return this.el;
	}
});

Modal = new Universe.Application.Views.Modal();

// ---

$(function() {
	var Page = $('body');
			Page.append(Modal.render());

	var PlanetContainer = $('#planet-container');
			PlanetContainer.append(PlanetView.render());
});