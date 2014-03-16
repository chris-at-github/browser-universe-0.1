Application = Ember.Application.create();
Application.ApplicationAdapter = DS.FixtureAdapter.extend();

Application.Router.map(function() {
  this.resource('planet-layer', {
  	path: '/'
  });
});

Application.PlanetsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('planet');
	}
});

Application.Planet = DS.Model.extend({
  color: DS.attr('string')
});

Application.Planet.FIXTURES = [
	{
		id: 1,
		color: 'blue'
	},
	{
		id: 2,
		color: 'blue'
	},
	{
		id: 3,
		color: 'blue'
	},
];