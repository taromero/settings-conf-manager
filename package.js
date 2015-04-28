Package.describe({
  name: 'canotto90:settings-conf-manager',
  summary: 'Lets you see and change app settings (both public and private)',
  version: '0.1.3',
  git: 'https://github.com/taromero/settings-conf-manager',
  debugOnly: true
})

Package.onUse(function(api) {
  api.versionsFrom('1.0.1')
  api.use('canotto90:swal-forms@0.1.1', 'client')
  api.addFiles('client.js', 'client')
  api.addFiles('server.js', 'server')
})
