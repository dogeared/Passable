var settings = {
  win: Titanium.UI.currentWindow,
  portraitCoords: {
    tableview: {
      left: 20,
      right: 20,
      height: 310
    }    
  },
  landscapeCoords: {
    tableview: {
      left: 70,
      right: 70,
      height: 150
    }    
  }
};

settings.getCoords = function() {
  switch (Ti.UI.orientation) {
    case Titanium.UI.PORTRAIT:
    case Titanium.UI.UPSIDE_PORTRAIT:
      return settings.portraitCoords;
      break;
    case Titanium.UI.LANDSCAPE_LEFT:
    case Titanium.UI.LANDSCAPE_RIGHT:
      return settings.landscapeCoords;
      break;
    default:
      return settings.portraitCoords;
      break;
  };  
};

settings.setupWin = function() {
  var coords = settings.getCoords();
  
  settings.tableview = Titanium.UI.createTableView({
    data: settings.win.s().rowData,
    left: coords.tableview.left,
    right: coords.tableview.right,
    height: coords.tableview.height,
    'font-size': '10',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#336699',
    backgroundColor: '#ffffff',
  });
  settings.win.add(settings.tableview);
  
  settings.tableview.addEventListener('click', function(e) {
    var index = e.index;
    var row = e.row;
    
    var s = settings.win.s();
  
    row.hasCheck = !row.hasCheck;
    s.rowData[index].hasCheck = row.hasCheck;
  
    Ti.App.fireEvent('settings_controller:update_settings');
    Ti.App.fireEvent('settings_controller:update_base_val');
    Ti.App.fireEvent('main:update_fields');
  }); 
};

Ti.Gesture.addEventListener('orientationchange', function(e) {
  var coords = settings.getCoords();

  settings.tableview.left = coords.tableview.left;
  settings.tableview.right = coords.tableview.right;
  settings.tableview.height = coords.tableview.height;
});

settings.setupWin();
