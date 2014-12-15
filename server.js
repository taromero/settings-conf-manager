Meteor.methods({
  settings_conf_manager_getSettings: function() {
    return Meteor.settings
  },
  settings_conf_manager_updateSettings: function(updateAttributes) {
    console.log('updateAttributes ' , updateAttributes);
    _.extend(Meteor.settings, updateAttributes)
    return Meteor.settings
  }
})
