### Settings Manager

Exposes a `SettingsManager.crudSettings` method that opens a sweet alert (with swal-forms) modal where you can see your Meteor.settings (both public and not public) and you can also update them.

This updates don't persist anywhere, so any app restart will erase them. It's meant to help tunning the settings.