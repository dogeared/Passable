Ti.include("helpers/sha1.js");
Ti.include("models/settings_model.js");
Ti.include("controllers/settings_controller.js");
Ti.include("views/animations_view.js");
Ti.include("views/information_view.js");
Titanium.UI.setBackgroundColor('#000');

SettingsController.init();

var win = Titanium.UI.createWindow({
    title: 'Passwd',
    backgroundColor: '#fff'
});

win.orientationModes = [
  Titanium.UI.PORTRAIT,
  Titanium.UI.UPSIDE_PORTRAIT,
  Titanium.UI.LANDSCAPE_LEFT,
  Titanium.UI.LANDSCAPE_RIGHT
];

var android = Ti.Platform.name == 'android';

var base = Ti.UI.createTextField({
  autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
  width: 300,
  top: 10,
  height: android ? 45 : 35,
  borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
  hintText: 'base',
  value: SettingsModel.baseValue,
  autocorrect: false,
  passwordMask: !SettingsModel.rowData[SettingsModel.rowDataIndex.showBase].hasCheck,
  clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
});
win.add(base);

var id = Ti.UI.createTextField({
  autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
  width: 300,
  top: android ? 65 : 55,
  height: android ? 45 : 35,
  borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
  hintText: 'identifier',
  autocorrect: false,
  passwordMask: !SettingsModel.rowData[SettingsModel.rowDataIndex.showIdentifier].hasCheck,
  clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
});
win.add(id);

var hexButton = Titanium.UI.createButton({
  title: 'Hex',
  top: android ? 125 : 105,
  width: 70,
  left: 10,
  height: android ? 45 : 40
});
win.add(hexButton);

var b64Button = Titanium.UI.createButton({
  title: 'B64',
  top: android ? 125 : 105,
  width: 70,
  left: 85,
  height: android ? 45 : 40
});
win.add(b64Button);

var halfLabel = Titanium.UI.createLabel({
  top: android ? 135 : 115,
  left: 160,
  font: { fontSize: 16, fontWeight:'bold', fontFamily:'Arial' },
  color: '#336699',
  width: 50,
  height: 20,
  textAlign: 'center',
  text: 'Half: '
});
win.add(halfLabel);

var halfSwitch = Titanium.UI.createSwitch({
  value: SettingsModel.halfValue,
  top: android ? 130 : 110,
  left: 210
});
win.add(halfSwitch);

var pw = Ti.UI.createTextField({
  autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
  width: 300,
  top: android ? 180 : 155,
  height: android ? 45 : 35,
  font: { fontSize: 13 },
  borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
  editable: false,
  enabled: false,
  visible: SettingsModel.rowData[SettingsModel.rowDataIndex.showPassword].hasCheck,
  hintText: 'Generated Password',
  autocorrect: false
});
win.add(pw);

var tableview = Titanium.UI.createTableView({
  data: SettingsModel.rowData,
  bottom: 30,
  left: 20,
  right: 20,
  height: (SettingsModel.rowData[SettingsModel.rowDataIndex.showPassword].hasCheck) ? 220 : 260,
  'font-size': '10',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: '#336699'
});
win.add(tableview);

var infoImage = Ti.Filesystem.getFile(
  Titanium.Filesystem.resourcesDirectory,'images/info.png');
var infoView = Titanium.UI.createImageView({
  image: infoImage,
  top: 437,
  left: 295,
  width: 23,
  height: 20
});
win.add(infoView);

infoView.addEventListener('click', function(e) {
  InformationView.showInfoWin();
  win.visible = false;
  //setTimeout(function() {win.visible = false;}, 200);
});

tableview.addEventListener('click', function(e)
{
  var index = e.index;
  var section = e.section;
  var row = e.row;
  var rowdata = e.rowData;

  row.hasCheck = !row.hasCheck;
  SettingsModel.rowData[index].hasCheck = row.hasCheck;

  switch (row.title) {
    case "Show Base":
      base.blur();
      base.passwordMask = !row.hasCheck;
      break;
    case "Show Identifier":
      id.blur();
      id.passwordMask = !row.hasCheck;
      break;
    case "Show Password":
      pw.visible = row.hasCheck;
      tableview.height = (pw.visible) ? 220 : 260;
      break;
    case "Save Settings":
      if (!row.hasCheck) {
        SettingsController.wipeSettings();
      }
      break;
  };
  if (SettingsModel.rowData[SettingsModel.rowDataIndex.saveSettings].hasCheck) {
    SettingsController.saveSettings();
  }
});

base.addEventListener('change', function(e) {
  SettingsModel.baseValue = e.value;
  if (SettingsModel.rowData[SettingsModel.rowDataIndex.saveSettings].hasCheck) {
    SettingsController.saveSettings();
  };
});

function generateHandler(pwResult, halfLength) {
  base.blur();
  id.blur();
  
  if (SettingsModel.halfValue) {
    pwResult = pwResult.substring(0, halfLength);
  }
  pw.value = pwResult;
  if (SettingsModel.rowData[SettingsModel.rowDataIndex.clearBase].hasCheck) {
    SettingsModel.baseValue = '';
    base.value = '';
  }

  if (SettingsModel.rowData[SettingsModel.rowDataIndex.clearIdentifier].hasCheck) {
    id.value = '';
  }

  Ti.UI.Clipboard.setText(pwResult);
  AnimationsView.showClipWin();
};

hexButton.addEventListener('click', function() {
  var pwHex = hex_sha1(base.value+id.value);
  generateHandler(pwHex, 20);
});

b64Button.addEventListener('click', function() {
  var pwb64 = b64_sha1(base.value+id.value);
  generateHandler(pwb64, 14);
});

halfSwitch.addEventListener('change', function(e) {
  SettingsModel.halfValue = halfSwitch.value;
  if (SettingsModel.rowData[SettingsModel.rowDataIndex.saveSettings].hasCheck) {
    SettingsController.saveSettings(); 
  }
});

Ti.Gesture.addEventListener('orientationchange', function(e) {
  switch (e.orientation) {
    case Titanium.UI.PORTRAIT:
    case Titanium.UI.UPSIDE_PORTRAIT:
      tableview.visible = true;
      hexButton.left = 10;
      b64Button.left = 85;
      halfLabel.left = 160;
      halfSwitch.left = 210;
      break;
    case Titanium.UI.LANDSCAPE_LEFT:
    case Titanium.UI.LANDSCAPE_RIGHT:
      tableview.visible = false;
      hexButton.left = 90;
      b64Button.left = 165;
      halfLabel.left = 240;
      halfSwitch.left = 290;
      break;
  }
});

AnimationsView.setupClipWin([hexButton, b64Button, halfSwitch]);
InformationView.setupInfoWin(function() {
  win.visible = true;
});
win.open();