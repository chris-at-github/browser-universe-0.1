Universe.Application.Models.Planet = Backbone.Model.extend({
	defaults: {
		name: null,
		type: null,
		position: {
			x: 0,
			y: 0
		},
		active: false,
		size: {
			width: 34,
			height: 34
		},
		player: null
	},

	initialize: function() {
		this.on('change:active', function(object, value) {
			if(value === true) {
				this.trigger('activate');

			} else {
				this.trigger('deactivate');
			}
		});
	},

	get: function (attr) {
		var getter = 'get' + attr.ucfirst();

		if(typeof this[getter] === 'function') {
			return this[getter]();
		}
		return Backbone.Model.prototype.get.call(this, attr);
	},

	getPlayer: function() {
		player = Backbone.Model.prototype.get.call(this, 'player');

		if(player !== null) {
			player = Universe.Registry.PlayerCollection.get(player);
		}

		return player;
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
		var instance 	= this;

		if(planet.get('active') === true) {
			this.active = planet;
		}

		planet.on('activate', function() {
			instance.toggleActive(this);
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

Universe.Application.Views.PlanetContainer = Universe.Application.Views.Container.extend({
	template: _.template($('#tmpl-planet-container').html()),

	render: function(model) {
		if(model === undefined) {
			model = this.model;
		}

		this.$el.html(this.template({planet: model}));
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

		// Modal fuer die Ausgabe registrieren
		if(Universe.Registry.PlanetContainer === undefined) {
			Universe.Registry.PlanetContainer = new Universe.Application.Views.PlanetContainer({
				model: this.model
			});
			Universe.Registry.Sidebar.add(Universe.Registry.PlanetContainer);
		}
		this.container = Universe.Registry.PlanetContainer;

		this.model
			.on('activate', function() {
				instance.onActivate();
			})
			.on('deactivate', function() {
				instance.onDeactivate();
			});

		if(this.model.get('active') === true) {
			this.onActivate();
		}
	},

	getRenderPosition: function() {
		var position 	= this.model.get('position');
		var size			= this.model.get('size');

		return {
			top: 	position.y - (size.height / 2),
			left: position.x - (size.width / 2)
		}
	},

	render: function() {

		// X / Y Position setzen
		this.$el.css(this.getRenderPosition());

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

		// Sidebar-Inhalt setzen
		this.container.render(this.model);
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
		this.container.close();
	}
});

// ---

Universe.Application.Views.PlanetCollection = Backbone.View.extend({
	tagName: 'div',
	id: 'planet-layer',

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