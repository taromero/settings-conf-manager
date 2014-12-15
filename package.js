Package.describe({
  name: 'canotto90:settings-conf-manager',
  summary: 'Lets you see and change app settings (both public and private). Meant for tunning settings without going to the file.',
  version: '0.0.1',
  git: 'https://github.com/taromero/settings-conf-manager'
})

Package.onUse(function(api) {
  api.versionsFrom('1.0.1')
  api.use([
    'kevohagan:sweetalert@0.3.2',
    'canotto90:swal-forms@0.0.5'
  ], 'client')
  api.addFiles('client.js', 'client')
  api.addFiles('server.js', 'server')
})
