Universe.Views.OreMine = Backbone.Marionette.ItemView.extend({
  template: '#tmpl-planet-oremine',
  consume: null,
  produce: null,
  worker: [],

  ui: {
  	consumeContainer: '.container-resource-consume',
  	produceContainer: '.container-resource-produce'
  },

  initialize: function(arguments) {
  	var instance = this;

  	// Verbrauch verarbeiten
  	this.consume = new Universe.Views.StorageResourceCollection({
  		collection: new Universe.Collections.StorageResource()
	  });

		if(this.model.get('consume') !== null) {
			this.consume.collection = this.model.get('consume');
		}

		_.each(this.consume.collection.models, function(consume) {
			var worker = new Universe.ResourceWorkerItem({
				model: consume,
				value: consume.get('value'),
				rate: -0.5,
				min: 0,

				onMin: function() {
					// OreWorker.set('pause', true);
				}
			});

			instance.worker.push(worker);
			Universe.Factory.getResourceWorker().add(worker);
		});

	  // Erzeugung anzeigen
  	this.produce = new Universe.Views.StorageResourceCollection({
  		collection: new Universe.Collections.StorageResource()
	  });

		if(this.model.get('produce') !== null) {
			this.produce.collection = this.model.get('produce');
		}

		_.each(this.produce.collection.models, function(produce) {
			worker = new Universe.ResourceWorkerItem({
				model: produce,
				value: produce.get('value'),
				rate: 0.5,
				max: 3,

				onMax: function() {
					_.each(instance.worker, function(worker) {
						worker.set('pause', true);
					});
				}
			});

			instance.worker.push(worker);
			Universe.Factory.getResourceWorker().add(worker);
		});
  },

  serializeData: function() {
    return {
    	building: this.model
    };
  },

  onRender: function() {
  	this.ui.consumeContainer.append(this.consume.render().el);
  	this.ui.produceContainer.append(this.produce.render().el);
  }
});

// ---

Universe.Models.OreMine = Backbone.Model.extend({
	defaults: {
		consume: [],
		produce: []
	},
	storage: {
		consume: null,
		produce: null
	},

	get: function (attr) {
		var getter = 'get' + attr.ucfirst();

		if(typeof this[getter] === 'function') {
			return this[getter]();
		}
		return Backbone.Model.prototype.get.call(this, attr);
	},

	getStorageResources: function(resources) {
		var collection 	= null;

		if(resources.length !== 0) {
			collection = new Universe.Collections.StorageResource();

			_.each(resources, function(resource) {
				var model = new Universe.Models.StorageResource({id: resource});
						model.fetch();

				collection.add(model);
			});
		}

		return collection;
	},

	getConsume: function() {
		if(this.storage.consume === null) {
			this.storage.consume = this.getStorageResources(Backbone.Model.prototype.get.call(this, 'consume'));
		}

		return this.storage.consume;
	},

	getProduce: function() {
		if(this.storage.produce === null) {
			this.storage.produce = this.getStorageResources(Backbone.Model.prototype.get.call(this, 'produce'));
		}

		return this.storage.produce;
	}
});

// ---

Universe.Models.StorageResource = Backbone.Model.extend({
	localStorage: new Backbone.LocalStorage('StorageResource')
});

Universe.Collections.StorageResource = Backbone.Collection.extend({
	model: Universe.Models.StorageResource,
	localStorage: new Backbone.LocalStorage('StorageResource')
});

// ---

Universe.Views.StorageResource = Backbone.Marionette.ItemView.extend({
	className: 'resource clearfix',
  template: '#tmpl-storage-resource',
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
});

Universe.Views.StorageResourceCollection = Backbone.Marionette.CollectionView.extend({
  itemView: Universe.Views.StorageResource
});

// ---

$(function() {
	// var oreDeposit = new Universe.Models.StorageResource({
	// 	id: '6316c0f4-e414-2d60-10f8-429f5bfa424d'
	// });

	// var oreStorage = new Universe.Models.StorageResource({
	// 	id: '199aa3a0-66c3-3282-4de9-325e3d576d02'
	// });

	// var fixtureOreDeposit = new Universe.Models.StorageResource({
	// 	id: 13,
	// 	name: 'Erzvorkommen',
	// 	value: 743
	// });

	// var fixtureOre = new Universe.Models.StorageResource({
	// 	id: 33,
	// 	name: 'Roherz',
	// 	value: 3
	// });

	// // var fixtures 		= ['6316c0f4-e414-2d60-10f8-429f5bfa424d'];
	// var collection 	= new Universe.Collections.StorageResource(oreDeposit);
	// 		collection.fetch();

	// console.log(collection);


	var fixtureOreMine	= new Universe.Models.OreMine({
		id: 7,
		name: 'Erzmine',
		consume: ['6316c0f4-e414-2d60-10f8-429f5bfa424d'],
		produce: ['199aa3a0-66c3-3282-4de9-325e3d576d02']
	});

	var page		= $('.modal-placeholder');
	var oreMine = new Universe.Views.OreMine({
		model: fixtureOreMine,
		// consume: [fixtureOreDeposit]
	});

	page.append(oreMine.render().el);
	// // page.append(xyz.render().el);
});