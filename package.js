Package.describe({
  name: 'cottz:flow-router-query',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Simple package to easily manipulate the route query with Flow-router',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Goluis/cottz-flow-router-query',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use('kadira:flow-router@2.0.0');
  api.use('blaze');

  api.addFiles('query.js', 'client');
});