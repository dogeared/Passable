Ti.include("models/settings_model.js");
Ti.include("controllers/settings_controller.js");

SettingsController.init();

Titanium.UI.setBackgroundColor('#fff');

var app = {};

app.win = Titanium.UI.createWindow({
  title: 'Passwd',
  backgroundColor: '#fff'
});

app.win.orientationModes = [
  Titanium.UI.PORTRAIT,
  Titanium.UI.UPSIDE_PORTRAIT,
  Titanium.UI.LANDSCAPE_LEFT,
  Titanium.UI.LANDSCAPE_RIGHT
];

app.tabGroup = Titanium.UI.createTabGroup({
  id: 'tabGroup'
});

app.mainWin = Titanium.UI.createWindow({
  id: 'mainWin',
  s: s
});

app.mainTab = Titanium.UI.createTab({
  id:     'mainTab',
  window: app.mainWin
});

app.settingsWin = Titanium.UI.createWindow({
  id: 'settingsWin',
  s: s
});

app.settingsTab = Titanium.UI.createTab({
  id:     'settingsTab',
  window: app.settingsWin
});

app.infoWin = Titanium.UI.createWindow({
  id: 'infoWin'
});

app.infoTab = Titanium.UI.createTab({
  id:     'infoTab',
  window: app.infoWin
});

app.tabGroup.addTab(app.mainTab);
app.tabGroup.addTab(app.settingsTab);
app.tabGroup.addTab(app.infoTab);

// hack to deal with redraw bug when starting in landscape mode
if (Ti.UI.orientation === Titanium.UI.LANDSCAPE_LEFT || Ti.UI.orientation === Titanium.UI.LANDSCAPE_RIGHT) {
  app.tabGroup.setActiveTab(1);
  app.tabGroup.open({
   transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
  });
  setTimeout(function() {
    app.tabGroup.setActiveTab(0);
  }, 500)
}
else {
  app.tabGroup.setActiveTab(0);
  app.tabGroup.open({
   transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
  });
}