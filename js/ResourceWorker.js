Universe.ResourceWorker = function() {
	this.initialize();
};

_.extend(Universe.ResourceWorker.prototype, {
	autostart: true,
	collection: {},

	initialize: function() {
		if(this.autostart === true) {
			this.start();
		}
	},

	start: function() {
		var interval = setInterval(function() {
			// console.log(1);
		}, 1000);
	},

	pass: function() {
		if(this.collection !== null) {
			_.each(this.collection, function(item, id) {

			});
		}
	},

	add: function(item) {
		this.collection[item.id] = item;
	}
});

// ---

Universe.ResourceWorkerItem = function() {
	this.id = _.uniqueId('rw');
	this.initialize();
};

_.extend(Universe.ResourceWorkerItem.prototype, {
	value: 0,
	min: null,
	max: null,
	rate: 0,

	initialize: function() {
	}
});