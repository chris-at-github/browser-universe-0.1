Universe.ResourceWorker = function() {
	this.initialize();
};

_.extend(Universe.ResourceWorker.prototype, {
	autostart: true,
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
		if(item.pause === true) {
			return false;
		}

		item.value += item.rate;

		if(item.equals != null) {
			if(item.value === item.equals) {
				item.onEquals();
			}
		}

		if(item.lowerThan != null) {
			if(item.value <= item.lowerThan) {
				item.onLowerThan();
			}
		}

		if(item.greaterThan != null) {
			if(item.value >= item.greaterThan) {
				item.onGreaterThan();
			}
		}

		if(item.min !== null && item.value <= item.min) {
			item.pause = true;
			item.onMin();
		}

		if(item.max !== null && item.value >= item.max) {
			item.pause = true;
			item.onMax();
		}

		if(item.sync === true && item.model !== null) {
			item.model.set('value', item.value);
		}
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
	model: null,
	value: 0,
	min: null,
	max: null,
	equals: null,
	lowerThan: null,
	greaterThan: null,
	rate: 0,
	sync: true,
	pause: false,

	initialize: function() {
	},

	set: function(key, value) {
		if(_.isObject(key) === true) {
			_.extend(this, key);

		} else {
			this[key] = value;
		}

		return this;
	},

	get: function(attribute) {
		return this[attribute];
	},

	onMin: function() {
	},

	onMax: function() {
	},

	onEquals: function() {
	},

	onLowerThan: function() {
	},

	onGreaterThan: function() {
	},
});