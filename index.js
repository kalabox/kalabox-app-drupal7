'use strict';

var _ = require('lodash');

module.exports = function(kbox) {

  var deps = kbox.core.deps;

  // Declare our app to the world
  kbox.create.add('drupal7', {
    task: {
      name: 'Drupal 7',
      module: 'kalabox-app-drupal7',
      description: 'Creates a Drupal 7 app.'
    }
  });

  // Add an option
  kbox.create.add('drupal7', {
    option: {
      name: 'name',
      weight: -99,
      task: {
        name: 'name',
        alias: 'n',
        kind: 'string',
        description: 'The name of your app.',
      },
      properties: {
        message: 'Name this app'.rainbow,
        required: true,
        type: 'string',
        validator: /^[a-z0-9 ]+$/i,
        warning: 'App name must be alphanumeric.',
        default: 'My Drupal 7 App',
        before: function(value) { return _.kebabCase(value); }
      },
      conf: {
        type: 'global',
        key: 'appName'
      }
    }
  });

  require('./node_modules/kalabox-plugin-drush/create.js')(kbox, 'drupal7');
  require('./node_modules/kalabox-plugin-git/create.js')(kbox, 'drupal7');

  // Task to create kalabox apps
  kbox.tasks.add(function(task) {
    kbox.create.buildTask(task, 'drupal7');
  });

};
