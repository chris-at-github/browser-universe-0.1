Universe.Models.Building = Backbone.Model.extend({
	defaults: {
		name: null
	}
});

// ---

Universe.Collections.Building = Backbone.Collection.extend({
	model: Universe.Models.Building
});

// ---

Universe.Views.Building = Backbone.View.extend({
	template: _.template($('#tmpl-building-container').html()),
	className: 'building',

	render: function() {
		this.$el.html(this.template({building: this.model}));
		return this.el;
	}
});