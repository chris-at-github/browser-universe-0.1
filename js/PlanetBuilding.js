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