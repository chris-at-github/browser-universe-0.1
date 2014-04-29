Universe.ResourceWorker = function() {
	this.initialize();
};

_.extend(Universe.ResourceWorker.prototype, {
	autostart: false,
	collection: {},
	interval: null,

	initialize: function() {
		if(this.autostart === true) {
			this.start();
		}
	},

	start: function() {
		var instance 	= this;

		this.interval = setInterval(function() {
			instance.pass();
		}, 1000);

		return this;
	},

	stop: function() {
		clearInterval(this.interval);
	},

	pass: function() {
		var instance = this;

		if(this.collection !== null) {
			_.each(this.collection, function(item, id) {
				instance.calculate(item);
			});
		}
	},

	add: function(item) {
		this.collection[item.id] = item;
		return this;
	},

	calculate: function(item) {
		console.log(item);

		item.value += item.rate;
	}
});

// ---

Universe.ResourceWorkerItem = function(attributes) {
	this.id = _.uniqueId('rw');

	if(attributes !== undefined) {
		this.set(attributes);
	}

	this.initialize();
};

_.extend(Universe.ResourceWorkerItem.prototype, {
	value: 0,
	min: null,
	max: null,
	rate: 0,

	initialize: function() {
	},

	set: function(attributes) {
		_.extend(this, attributes);
	}
});