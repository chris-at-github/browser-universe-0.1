Universe.Models.Player = Backbone.Model.extend({
	defaults: {
		id: 0,
		name: null
	},

	initialize: function() {
	}
});

// ---

Universe.Collections.Player = Backbone.Collection.extend({
  model: Universe.Models.Player,
  active: null,

	initialize: function() {
	  this.on('add', this.onAdd, this);
	},

	onAdd: function(player) {
	}
});

// ---

Universe.Views.PlayerCollection = Universe.Views.Container.extend({
	id: 'player-container',

	render: function() {
		var instance = this;

		_(this.collection.models).each(function(playerModel) {
			var playerView = new Universe.Views.Player({
				model: playerModel
			});

			instance.$el.append(playerView.render());
		});

		return this.el;
	}
});

// ---

Universe.Views.Player = Backbone.View.extend({
	className: 'player',

	render: function() {
		this.$el.text(this.model.get('name'));
		return this.el;
	}
});