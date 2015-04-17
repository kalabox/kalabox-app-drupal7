'use strict';

var prompt = require('prompt');
var chalk = require('chalk');
var _ = require('lodash');
var APPNAME = 'drupal7';
var ncp = require('ncp').ncp;
var path = require('path');

module.exports = function(kbox) {

  var deps = kbox.core.deps;

  var createApp = function(opts, callback) {
    var source = path.resolve(__dirname, '..', 'kalabox-app-drupal7');
    var dest = path.join(deps.lookup('config').appsRoot, opts.name);
    ncp(source, dest, function(err) {
      if (err) {
        callback(err);
      }
      else {
        console.log('done');
        callback();
      }
    });
  };

  // Declare our app to the world
  kbox.create.createTask(APPNAME, {
    name: 'Drupal 7',
    module: 'kalabox-app-drupal7',
    description: 'Creates a Drupal 7 app.'
  });

  // Add an option
  kbox.create.createTaskOption(APPNAME, {
    name: 'name',
    alias: 'n',
    kind: 'string',
    description: 'The name of your app.',
    properties: {
      message: 'Name this app: '.rainbow,
      required: true,
      type: 'string',
      validator: /^[a-z0-9 ]+$/i,
      warning: 'Answer must be alphanumeric.',
      default: 'My Drupal 7 App',
      before: function(value) { return _.kebabCase(value); }
    }
  });

  //require('./node_modules/kalabox-plugin-dbenv/create.js')(kbox);

  // Task to create kalabox apps
  kbox.tasks.add(function(task) {
    var app = kbox.create.getCreateTask(APPNAME);
    task.path = ['create', APPNAME];
    task.description = app.task.description;
    var props = {};
    app.opts.forEach(function(opt) {
      props[opt.name] = opt.properties;
      delete opt.properties;
      task.options.push(opt);
    });
    task.func = function(done) {
      prompt.override = this.options;
      prompt.start();
      prompt.get({
        properties: props
      },
      function(err, result) {
        if (err) {
          done(err);
        }
        else {
          createApp(result, done);
        }
      });
    };
  });

};
