Universe.Application.Models.Player = Backbone.Model.extend({
	defaults: {
		id: 0,
		name: null
	},

	initialize: function() {
	}
});

// ---

Universe.Application.Collections.Player = Backbone.Collection.extend({
  model: Universe.Application.Models.Player,
  active: null,

	initialize: function() {
	  this.on('add', this.onAdd, this);
	},

	onAdd: function(player) {
	}
});