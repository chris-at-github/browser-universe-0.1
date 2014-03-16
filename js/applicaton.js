Application = Ember.Application.create();

Application.Router.map(function() {
  this.resource('planets', {
  	path: '/'
  });
});

Application.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});