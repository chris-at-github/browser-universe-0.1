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
			x: 30,
			y: 30
		}
	},
	{
		id: 3,
		color: 'blue',
		position: {
			x: 45,
			y: 45
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