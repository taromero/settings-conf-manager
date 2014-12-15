window.SettingsManager = {
  crudSettings: function() {
    var self = this
    Meteor.call('settings_conf_manager_getSettings', function(err, settings) {
      if (err) {
        return swal('Error while fetching Meteor settings from server', err, 'error')
      }
      // save settings to we can later update them
      self.settings = settings

      swal.withForm({
        title: 'Update your settings',
        text: 'This will update both client and server settings. Changes will be lost on app restart',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Update',
        closeOnConfirm: false,
        formFields: self.toFormFields(settings)
      }, function(isConfirm) {
        if (isConfirm) {
          var newSettings = self.toSettingsJson(this.swalForm)
          // update client settings
          _.extend(Meteor.settings.public, newSettings.public)
          // update setting on the server
          Meteor.call('settings_conf_manager_updateSettings', newSettings, function(err, res) {
            if (err) {
              return swal('Error updating Meteor settings on the server', err, 'error')
            }

            swal('Success updating Meteor.settings', '', 'success')
          })
        }
      })
    })
  },
  toFormFields: function(settings) {
    // translate from Meteor.settings object to form tags that swal-forms expect (id/value)
    var formTags = []
    Object.keys(settings).forEach(function(settingKey) {
      var fullKey = ''
      traverseObjectToGetFormTag(settings, settingKey, fullKey)
    })
    return formTags

    function traverseObjectToGetFormTag(obj, key, fullKey) {
      // recursive. Stop condition: obj[key] is of a primitive type
      if (typeof obj[key] === 'object') {
        fullKey += key + '.'
        Object.keys(obj[key]).forEach(function(objKey) {
          traverseObjectToGetFormTag(obj[key], objKey, fullKey)
        })
      } else {
        formTags.push({ id: fullKey + key, value: obj[key] })
      }
    }
  },
  toSettingsJson: function(form) {
    var self = this
    Object.keys(form).forEach(function(key) {
      fieldToJson(key, form[key], self.settings)
    })

    return this.settings

    function fieldToJson(id, value, settings) {
      var splittedId = id.split('.')
      var firstIdPart = splittedId.shift()
      if (firstIdPart == id) {
        settings[firstIdPart] = value
      } else {
        fieldToJson(splittedId.join('.'), value, settings[firstIdPart])
      }
    }
  }
}
