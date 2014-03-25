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
	  this.on('change:active', function(object, value) {
	  	if(value === true) {
	  		this.trigger('focus');

	  	} else {
	  		this.trigger('blur');
	  	}
	  });
	}
});

// ---

Universe.Application.Collections.Planet = Backbone.Collection.extend({
  model: Universe.Application.Models.Planet,

	initialize: function() {
	  this.on('add', this.onAdd, this);

	  console.log('Collect the Universe');
	},

	onAdd: function(planet) {
		_.bindAll(this, 'toggleActive');
		planet.on('focus', this.toggleActive);
	},

  findActive: function() {
  	return _.find(this.models, function(planet) {
  		if(planet.get('active') === true) {
  			return planet;
  		}
  	});
  },

  toggleActive: function() {
  	var active = this.findActive();

  	if(active !== undefined) {
  		active.set('active', false);
  	}
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
		// this.listenTo(this.model, 'blur', function() {
		// 	alert(2);
		// });

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

		} else {
			this.$el.removeClass('active');
		}

		return this.el;
	},

	onFocus: function() {
		console.log('Activate the Planet');

		// Event werfen
		this.model.set('active', true);

		// Modal-Inhalt setzen
		Universe.Modal.setBody(this.modal.render());
	}
});

// ---

Universe.Application.Views.PlanetCollection = Backbone.View.extend({
	tagName: 'div',
	id: 'planet-container',

	initialize: function() {
		console.log('Print the hole Universe');
	},

	render: function() {
		var self = this;

		_(this.collection.models).each(function(planetModel) {
			var planetView = new Universe.Application.Views.Planet({
				model: planetModel
			});

			self.$el.append(planetView.render());
		});

		return this.el;
	}
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