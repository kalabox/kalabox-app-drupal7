'use strict';

module.exports = function(kbox) {

  // Declare our app to the world
  kbox.create.add('drupal7', {
    name: 'Drupal 7',
    module: 'kalabox-app-drupal7'
  });

  // Task to create kalabox apps
  kbox.tasks.add(function(task) {
    task.path = ['create', 'drupal7'];
    task.description = 'Creates a Drupal 7 app.';
    task.func = function(done) {
      console.log('I am the sultan of the sea!');
    };
  });

};
