var SettingsController = function(){};

SettingsController.saveSettings = function() {
  Titanium.App.Properties.setString('base', SettingsModel.baseValue);
  Titanium.App.Properties.setBool('half', SettingsModel.halfValue);
  for (var j=0; j<SettingsModel.rowData.length; j++) {
    Titanium.App.Properties.setBool(SettingsModel.rowData[j].title, SettingsModel.rowData[j].hasCheck);
  }
};

SettingsController.wipeSettings = function() {
  Titanium.App.Properties.removeProperty('base');
  Titanium.App.Properties.removeProperty('half');
  for (var j=0; j < SettingsModel.rowData.length; j++) {
    Titanium.App.Properties.removeProperty(SettingsModel.rowData[j].title);
  }
};

SettingsController.init = function() {
  if (Titanium.App.Properties.hasProperty('Save Settings')) {
    SettingsModel.baseValue = Titanium.App.Properties.hasProperty('base') ? Titanium.App.Properties.getString('base') : '';
    SettingsModel.halfValue = Titanium.App.Properties.hasProperty('half') ? Titanium.App.Properties.getBool('half') : false;
    for (var i=0; i < SettingsModel.rowData.length; i++) {
      if (Titanium.App.Properties.hasProperty(SettingsModel.rowData[i].title)) {
        SettingsModel.rowData[i].hasCheck = Titanium.App.Properties.getBool(SettingsModel.rowData[i].title);
      }
    }
  }
};
