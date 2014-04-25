Universe.Models.PlanetBuilding = Universe.Models.Building.extend({
	initialize: function() {
		if(this.get('extend') !== null) {
			this.extendBuilding();
		}
	},

	extendBuilding: function() {
		if(this.get('extend') !== null) {
			if(Universe.Registry.Building === undefined) {
				Universe.Registry.Building = new Universe.Collections.Building(Universe.Fixtures.Building);
			}

			this.set(Universe.Registry.Building.get(this.get('extend')).attributes);
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

	events: {
		'click #button-add-planet-building': 'openAddModal'
	},

	initialize: function() {
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

		return this.el;
	},

	openAddModal: function() {
		var modal = Universe.Factory.getModal();
				modal.open({
					'body': 'jfkjdfklj dsjf jdf sjfkjsd fjasf dsjflkjas fdjsklf ads'
				});
	}
});

// ---

Universe.Views.PlanetBuilding = Backbone.View.extend({
	template: _.template($('#tmpl-planet-building-container').html()),
	tagName: 'li',



	render: function() {
		this.$el.html(this.template({building: this.model}));
		return this.el;
	}
});