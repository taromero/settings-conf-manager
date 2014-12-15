window.SettingsManager = {
  crudSettings: function() {
    var self = this
    Meteor.call('settings_conf_manager_getSettings', function(err, settings) {
      if (err) {
        return console.error('Error while fetching Meteor settings from server', err)
      }
      self.settings = settings

      swal.withForm({
        title: 'Update your settings',
        formFields: self.toFormFields(settings)
      }, function(isConfirm) {
        if (isConfirm) {
          var newSettings = self.toSettingsJson(this.swalForm)
          _.extend(Meteor.settings.public, newSettings.public)
          Meteor.call('settings_conf_manager_updateSettings', newSettings, function(err, res) {
            if (err) {
              return console.log('Error updating Meteor settings on the server', err)
            }

            console.log(res)
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
