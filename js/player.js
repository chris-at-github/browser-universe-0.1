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

// ---

Universe.Application.Views.PlayerCollection = Universe.Application.Views.Container.extend({
	id: 'player-container',

	render: function() {
		var instance = this;

		_(this.collection.models).each(function(playerModel) {
			var playerView = new Universe.Application.Views.Player({
				model: playerModel
			});

			instance.$el.append(playerView.render());
		});

		return this.el;
	}
});

// ---

Universe.Application.Views.Player = Backbone.View.extend({
	className: 'player',

	render: function() {
		this.$el.text(this.model.get('name'));
		return this.el;
	}
});