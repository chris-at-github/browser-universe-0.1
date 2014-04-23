Universe.Application.Models.PlanetBuilding = Universe.Application.Models.Building.extend({
	initialize: function() {
		if(this.get('extend') !== null) {
			this.extendBuilding();
		}
	},

	extendBuilding: function() {
		if(this.get('extend') !== null) {
			if(Universe.Registry.Building === undefined) {
				Universe.Registry.Building = new Universe.Application.Collections.Building(Universe.Application.Fixtures.Building);
			}

			this.set(Universe.Registry.Building.get(this.get('extend')).attributes);
		}
	}
});

// ---

Universe.Application.Collections.PlanetBuilding = Backbone.Collection.extend({
	model: Universe.Application.Models.PlanetBuilding
});

// ---

Universe.Application.Views.PlanetBuildingCollection = Backbone.View.extend({
	tagName: 'ul',
	className: 'objects',

	initialize: function() {
	},

	render: function() {
		var instance = this;

		_(this.collection.models).each(function(buildingModel) {
			var buildingView = new Universe.Application.Views.PlanetBuilding({
				model: buildingModel
			});

			instance.$el.append(buildingView.render());
		});

		return this.el;
	}
});

// ---

Universe.Application.Views.PlanetBuilding = Backbone.View.extend({
	template: _.template($('#tmpl-planet-building-container').html()),
	tagName: 'li',

	render: function() {
		this.$el.html(this.template({building: this.model}));
		return this.el;
	}
});