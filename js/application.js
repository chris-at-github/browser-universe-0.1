Universe.Application.Models.Planet = Backbone.Model.extend({
	defaults: {
		name: null,
		type: null,
		position: {
			x: 0,
			y: 0
		},
		active: false
	},

	initialize: function() {
	  this.on('change:active', function(object, value) {
	  	if(value === true) {
	  		this.trigger('activate');

	  	} else {
	  		this.trigger('deactivate');
	  	}
	  });
	}
});

// ---

Universe.Application.Collections.Planet = Backbone.Collection.extend({
  model: Universe.Application.Models.Planet,
  active: null,

	initialize: function() {
	  this.on('add', this.onAdd, this);
	},

	onAdd: function(planet) {
		var instance = this;

		planet.on('activate', function() {
			instance.toggleActive(this);
		});
	},

  findActive: function() {
  	return _.find(this.models, function(planet) {
  		if(planet.get('active') === true) {
  			return planet;
  		}
  	});
  },

  toggleActive: function(planet) {
  	if(this.active !== null) {
  		this.active.set('active', false);
  	}

  	this.active = planet;
  }
});

// ---

Universe.Application.Views.PlanetModal = Backbone.View.extend({
	template: _.template($('#tmpl-planet-modal').html()),
	tagName: 'div',
	id: 'planet-modal',

	initialize: function() {
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
		'click': 'onActivate',
	},

	initialize: function() {
		var instance = this;

		this.model
			.on('activate', function() {
				instance.onActivate();
			})
			.on('deactivate', function() {
				instance.onDeactivate();
			});

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

	onActivate: function(e) {

		// Click-Event stoppen
		if(e !== undefined) {
			e.stopImmediatePropagation();
		}

		// Event werfen
		if(this.model.get('active') === false) {
			this.model.set('active', true);
		}

		// View neu rendern
		this.render();

		// Modal-Inhalt setzen
		Universe.Modal.setBody(this.modal.render());
	},

	onDeactivate: function(e) {

		// Click-Event stoppen
		if(e !== undefined) {
			e.stopImmediatePropagation();
		}

		// Event werfen
		if(this.model.get('active') === true) {
			this.model.set('active', false);
		}

		// View neu rendern
		this.render();

		// Modal-Inhalt setzen
		Universe.Modal.close();
	}
});

// ---

Universe.Application.Views.PlanetCollection = Backbone.View.extend({
	tagName: 'div',
	id: 'planet-container',

	events: {
		'click': 'onClick',
	},

	initialize: function() {
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
	},

	onClick: function() {
		this.collection.toggleActive(null);
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