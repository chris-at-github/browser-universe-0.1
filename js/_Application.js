String.prototype.ucfirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

// ---
Universe.Factory = {
	modal: null,
	building: null,
	resource: null,
	resourceWorker: null,

	getModal: function() {
		if(this.modal === null) {
			if(Universe.Views.Modal !== undefined) {
				this.modal = new Universe.Views.Modal();
			}
		}

		return this.modal;
	},

	getBuilding: function() {
		if(this.building === null) {
			if(Universe.Collections.Building !== undefined) {
				this.building = new Universe.Collections.Building(Universe.Fixtures.Building);
			}
		}

		return this.building;
	},

	getResource: function() {
		if(this.resource === null) {
			if(Universe.Collections.Resource !== undefined) {
				this.resource = new Universe.Collections.Resource(Universe.Fixtures.Resource);
			}
		}

		return this.resource;
	},

	getResourceWorker: function() {
		if(this.resourceWorker === null) {
			this.resourceWorker = new Universe.ResourceWorker();
		}

		return this.resourceWorker;
	}
};

// ---

Universe.Views.Sidebar = Backbone.View.extend({
	tagName: 'div',
	id: 'sidebar',
	container: [],

	initialize: function() {
	},

	add: function(container) {
		this.container.push(container);
		this.append(container);
	},

	append: function(container) {
		this.$el.append(container.render());
	},

	render: function() {
		var instance = this;

		_(this.container).each(function(container) {
			instance.append(container);
		});

		return this.el;
	}
});

// ---

Universe.Views.Container = Backbone.View.extend({
	tagName: 'div',
	className: 'container',

	initialize: function() {
	},

	close: function() {
		this.$el.addClass('close');
	},

	setBody: function(body) {
		this.$el.html(body);
	},

	render: function() {
		return this.el;
	}
});

// ---

Universe.Views.Modal = Backbone.View.extend({
	tagName: 'div',
	id: 'modal',
	className: 'closed',
	overlay: true,

	events: {
		'click #modal-overlay': 'close'
	},

	initialize: function() {
		$('body').append(this.render());
	},

	open: function(parameter) {
		if(parameter.body !== undefined) {
			this.setBody(parameter.body);
		}

		this.$el.removeClass('closed');
	},

	close: function() {
		this.$el.addClass('closed');
	},

	setBody: function(body) {
		this.$el.find('#modal-window').html(body);
	},

	render: function() {
		if(this.overlay === true) {
			this.$el.append('<div id="modal-overlay"></div>');
		}

		this.$el.append('<div id="modal-window"></div>');

		return this.el;
	}
});

// ---

$(function() {

	// // Sidebar
	// Universe.Registry.Sidebar = new Universe.Views.Sidebar();

	// var Page = $('body');
	// 		// Page.append(Universe.Modal.render());
	// 		Page.append(Universe.Registry.Sidebar.render());

	// // Player registieren
	// if(Universe.Collections.Player !== undefined) {
	// 	Universe.Registry.PlayerCollection = new Universe.Collections.Player();
	// 	Universe.Registry.PlayerCollection.add(Universe.Fixtures.Player);
	// }

	// // Planeten
	// if(Universe.Collections.Planet !== undefined) {
	// 	var planetCollection = new Universe.Collections.Planet();
	// 			planetCollection.add(Universe.Fixtures.Planet);

	// 	var planetCollectionView = new Universe.Views.PlanetCollection({
	// 		collection: planetCollection
	// 	});
	// 	Page.append(planetCollectionView.render());
	// }

	// // Player ausgeben
	// if(Universe.Collections.Player !== undefined) {
	// 	var playerCollectionView = new Universe.Views.PlayerCollection({
	// 		collection: Universe.Registry.PlayerCollection
	// 	});
	// 	Universe.Registry.Sidebar.add(playerCollectionView);
	// }
});