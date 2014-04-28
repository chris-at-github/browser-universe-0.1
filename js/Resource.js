Universe.Models.Resource = Backbone.Model.extend({
	defaults: {
		name: null
	}
});

// ---

Universe.Collections.Resource = Backbone.Collection.extend({
	model: Universe.Models.Resource
});

// ---

Universe.Models.StorageResource = Universe.Models.Resource.extend({
	defaults: {
		value: 0.0
	},

	initialize: function() {
		if(this.get('extend') !== null) {
			this.extendResource();
		}
	},

	extendResource: function() {
		if(this.get('extend') !== null) {
			var extend = null;

			if(_.isNumber(this.get('extend')) === true) {
				extend = Universe.Factory.getResource().get(this.get('extend'));
			}

			if(this.get('extend') instanceof Universe.Models.Resource) {
				extend = this.get('extend');
			}

			if(extend instanceof Universe.Models.Resource) {
				this.set(_.omit(extend.attributes, 'id'));
			}
		}
	}
});