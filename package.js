Package.describe({
  name: 'canotto90:settings-conf-manager',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles('canotto90:settings-conf-manager.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('canotto90:settings-conf-manager');
  api.addFiles('canotto90:settings-conf-manager-tests.js');
});
