var SettingsModel = function() { };

SettingsModel.rowData = [
  {title: 'Show Base',        hasCheck: false, selectedColor: '#fff'},
  {title: 'Show Identifier',  hasCheck: false, selectedColor: '#fff'},
  {title: 'Show Password',    hasCheck: false, selectedColor: '#fff'},
  {title: 'Clear Base',       hasCheck: true,  selectedColor: '#fff'},
  {title: 'Clear Identifier', hasCheck: true,  selectedColor: '#fff'},
  {title: 'Save Settings',    hasCheck: false, selectedColor: '#fff'}
];

SettingsModel.rowDataIndex = {
  showBase: 0,
  showIdentifier: 1,
  showPassword: 2,
  clearBase: 3,
  clearIdentifier: 4,
  saveSettings: 5
};
  
SettingsModel.baseValue = '';

SettingsModel.halfValue = false;
