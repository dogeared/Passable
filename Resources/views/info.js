Ti.App.addEventListener('open_url', function(e){
    Ti.Platform.openURL(e.url);
});

var info = {
  win: Titanium.UI.currentWindow,
  orientation: Ti.UI.orientation
};

info.orientationChanged = function() {
  var curOrientation = Ti.UI.orientation;
  if (curOrientation !== info.orientation) {
    info.orientation = curOrientation;
    return true;
  }
  else {
    return false;
  }
}

info.webview = Titanium.UI.createWebView({url:'info.html'});
info.win.add(info.webview);

Ti.Gesture.addEventListener('orientationchange', function(e) {
  if (info.orientationChanged()) {
    info.win.remove(info.webview);
    info.webview = Titanium.UI.createWebView({url:'info.html'});
    info.win.add(info.webview);
  }
});
