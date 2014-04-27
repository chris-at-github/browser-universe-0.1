Universe.Models.PlanetBuilding = Universe.Models.Building.extend({
	initialize: function() {
		if(this.get('extend') !== null) {
			this.extendBuilding();
		}
	},

	extendBuilding: function() {
		if(this.get('extend') !== null) {
			var extend = null;

			if(Universe.Registry.Building === undefined) {
				Universe.Registry.Building = new Universe.Collections.Building(Universe.Fixtures.Building);
			}

			if(_.isNumber(this.get('extend')) === true) {
				extend = Universe.Registry.Building.get(this.get('extend'));
			}

			if(this.get('extend') instanceof Universe.Models.Building) {
				extend = this.get('extend');
			}

			if(extend instanceof Universe.Models.Building) {
				this.set(_.omit(extend.attributes, 'id'));
			}
		}
	}
});

// ---

Universe.Collections.PlanetBuilding = Backbone.Collection.extend({
	model: Universe.Models.PlanetBuilding
});

// ---

Universe.Views.PlanetBuildingCollection = Backbone.View.extend({
	template: _.template($('#tmpl-planet-building-collection-container').html()),
	planet: null,

	events: {
		'click #button-add-planet-building': 'openAddModal'
	},

	initialize: function() {
		var instance = this;

		this.collection.on('add', function() {
			instance.onAdd();
		});
	},

	render: function() {
		var instance 	= this;
		var objects		= $('<ul class="objects"></ul>');

		// Template rendern
		this.$el.html(this.template());

		// Einzelgebaeude der Liste hinzufuegen
		_(this.collection.models).each(function(buildingModel) {
			var buildingView = new Universe.Views.PlanetBuilding({
				model: buildingModel
			});

			objects.append(buildingView.render());
		});

		// Liste dem Root-Element hinzufuegen
		var buildingContainer = this.$el.find('#planet-building-container');
				buildingContainer.append(objects);

		// this.openAddModal();

		return this.el;
	},

	openAddModal: function() {
		var instance	= this;
		var objects		= $('<ul class="objects"></ul>');
		var buildings	= Universe.Factory.getBuilding();

		_(buildings.models).each(function(buildingModelz) {
			var buildingModel = new Universe.Models.PlanetBuilding({
				extend: 2
			});

			var buildingView = new Universe.Views.PlanetBuilding({
					model: 		buildingModel,
				})
				.setActions({
					'add': {'label': 'Hinzufügen'}
				})
				.setPlanet(instance.planet);

			objects.append(buildingView.render());
		});

		var modal = Universe.Factory.getModal();
				modal.open({
					'body': objects
				});
	},

	setPlanet: function(planet) {
		this.planet = planet;
		return this;
	},

	onAdd: function(argument) {
		this.render();
		Universe.Factory.getModal().close();
	}
});

// ---

Universe.Views.PlanetBuilding = Backbone.View.extend({
	template: _.template($('#tmpl-planet-building-container').html()),
	tagName: 'li',
	actions: null,
	planet: null,

	events: {
		'click .button-action-add': 'onAdd'
	},

	initialize: function() {
		// console.log(this.model);
	},

	render: function() {
		this.$el.html(this.template({
			building: this.model,
			actions: 	this.actions
		}));

		if(this.actions !== null) {
			var actionsContainer = this.$el.find('.form-actions');

			_.each(this.actions, function(data, action) {
				actionsContainer.append('<button class="button button-action-' + action + '">' + data.label + '</button>');
			});
		}

		return this.el;
	},

	setActions: function(actions) {
		this.actions = actions;
		return this;
	},

	setPlanet: function(planet) {
		this.planet = planet;
		return this;
	},

	onAdd: function() {
		if(this.planet !== null) {
			this.planet.setBuilding(this.model);
		}
	}
});