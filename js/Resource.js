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

// ---

Universe.Collections.StorageResource = Universe.Collections.Resource.extend({
	model: Universe.Models.StorageResource
});

// ---

Universe.Views.StorageResourceCollection = Backbone.View.extend({
	className: 'container',
	render: function() {
		var instance = this;

		if(this.collection !== undefined) {
			_(this.collection.models).each(function(model) {
				var view = new Universe.Views.StorageResource({
					model: model
				});

				instance.$el.append(view.render());
			});
		}

		return this.el;
	}
});

// ---

Universe.Views.StorageResource = Backbone.View.extend({
	template: _.template($('#tmpl-storage-resource').html()),
	className: 'resource',
	lastSyncValue: null,

	initialize: function() {
		var instance = this;

		this.lastSyncValue = this.model.get('value');

		this.model.on('change', function(model) {
			if(Math.floor(instance.lastSyncValue) < Math.floor(model.get('value')) || Math.floor(instance.lastSyncValue) > Math.floor(model.get('value'))) {
				instance.lastSyncValue = model.get('value');
				instance.render();
			}
		});
	},

	render: function() {
		this.$el.html(this.template({resource: this.model}));
		return this.el;
	}
});