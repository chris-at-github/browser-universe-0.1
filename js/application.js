App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.ObjectTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

App.Planet = DS.Model.extend({
  color: DS.attr('string'),
  position: DS.attr('object'),
	style: function() {
	    return 'top:' + this.get('position').y + 'px; left:' + this.get('position').x + 'px;';
	  }.property('style'),
	active: DS.attr('boolean', {defaultValue: false})
});

App.Planet.FIXTURES = [
	{
		id: 1,
		color: 'blue',
		position: {
			x: 15,
			y: 15
		}
	},
	{
		id: 2,
		color: 'blue',
		position: {
			x: 125,
			y: 30
		},
		active: true
	},
	{
		id: 3,
		color: 'blue',
		position: {
			x: 57,
			y: 90
		}
	},
];

App.PlanetsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('planet');
	}
});

App.Router.map(function() {
  this.resource('planets', { path: '/' });
});

App.PlanetController = Ember.ObjectController.extend({
  isActivated: function(key, value) {
    var model = this.get('model');

    console.log(45465);

    if (value === undefined) {
      // property being used as a getter
      return model.get('active');

    } else {
      // property being used as a setter
      model.set('active', value);
      model.save();
      return value;
    }
  }.property('model.active')
});