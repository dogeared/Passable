var SettingsController = function(){};

SettingsController.saveSettings = function() {
  for (var j=0; j<SettingsModel.rowData.length; j++) {
    Titanium.App.Properties.setBool(SettingsModel.rowData[j].title, SettingsModel.rowData[j].hasCheck);
  }
};

SettingsController.wipeSettings = function() {
  for (var j=0; j < SettingsModel.rowData.length; j++) {
    Titanium.App.Properties.removeProperty(SettingsModel.rowData[j].title);
  }
};

SettingsController.saveSecret = function() {
  Titanium.App.Properties.setString('base', SettingsModel.baseValue);
};

SettingsController.wipeSecret = function() {
  Titanium.App.Properties.removeProperty('base');
};

SettingsController.init = function() {
  if (Titanium.App.Properties.hasProperty('Save Settings')) {
    for (var i=0; i < SettingsModel.rowData.length; i++) {
      if (Titanium.App.Properties.hasProperty(SettingsModel.rowData[i].title)) {
        SettingsModel.rowData[i].hasCheck = Titanium.App.Properties.getBool(SettingsModel.rowData[i].title);
      }
    }
  }
  if (Titanium.App.Properties.hasProperty('Save Secret')) {
    SettingsModel.baseValue = Titanium.App.Properties.hasProperty('base') ? Titanium.App.Properties.getString('base') : '';
  }
};

Ti.App.addEventListener('settings_controller:update_settings', function(e) {
  if (SettingsModel.rowData[SettingsModel.rowDataIndex.saveSettings].hasCheck) {
    SettingsController.saveSettings();
  }
  else {
    SettingsController.wipeSettings();
  }
});

Ti.App.addEventListener('settings_controller:update_base_val', function(e) {
  if (SettingsModel.rowData[SettingsModel.rowDataIndex.saveSecret].hasCheck) {
    SettingsController.saveSecret();
  }
  else {
    SettingsController.wipeSecret();
  }
});
