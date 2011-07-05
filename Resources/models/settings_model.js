var SettingsModel = {};

SettingsModel.rowData = [
  {title: 'Show Secret',    hasCheck: false, selectedColor: '#fff'},
  {title: 'Show Nickname',  hasCheck: true,  selectedColor: '#fff'},
  {title: 'Show Password',  hasCheck: false, selectedColor: '#fff'},
  {title: 'Clear Secret',   hasCheck: false, selectedColor: '#fff'},
  {title: 'Clear Nickname', hasCheck: true,  selectedColor: '#fff'},
  {title: 'Save Settings',  hasCheck: false, selectedColor: '#fff'}
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

var s = function() {
  return SettingsModel;
}
