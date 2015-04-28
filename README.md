### Settings Manager

Exposes a `SettingsManager.crudSettings` method that opens a sweet alert modal (using [swal-forms](https://github.com/taromero/swal-forms)) where you can see your `Meteor.settings` (both public and not public) and you can also update them.

This updates don't persist anywhere, so any app restart will erase them. It's meant to help tunning the settings.

This package is marked as a `debugOnly` package so it shouldn't be packaged with your production app.

#### Screenshot

![Example](https://raw.githubusercontent.com/taromero/settings-conf-manager/master/sample-screenshot.png)
