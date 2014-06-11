Ti.include("../helpers/sha1.js");
Ti.include("animations_view.js");
Ti.include("main_coords.js");

main.getCoords = function() {
  switch (Ti.UI.orientation) {
    case Titanium.UI.PORTRAIT:
    case Titanium.UI.UPSIDE_PORTRAIT:
      return main.portraitCoords;
      break;
    case Titanium.UI.LANDSCAPE_LEFT:
    case Titanium.UI.LANDSCAPE_RIGHT:
      return main.landscapeCoords;
      break;
    default:
      return main.portraitCoords;
      break;   
  };
};

main.generateHandler = function(encoder, plaintext, divisor) {
  var settings = main.win.s();
  
  main.base.blur();
  main.id.blur();
  
  var pwResult = encoder(plaintext);
  main.pw.value = pwResult.substring(0, pwResult.length/divisor);
  if (settings.rowData[settings.rowDataIndex.clearBase].hasCheck) {
    main.base.value = '';
  }

  if (settings.rowData[settings.rowDataIndex.clearIdentifier].hasCheck) {
    main.id.value = '';
  }

  Ti.UI.Clipboard.setText(main.pw.value);
  AnimationsView.showClipWin();
};

main.setupWin = function() {
  var settings = main.win.s();
  var coords = main.getCoords();
  
  main.base = Ti.UI.createTextField({
    autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
    top: coords.base.top,
    width: coords.base.width,
    height: coords.base.height,
    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Secret Phrase',
    value: settings.baseValue,
    autocorrect: false,
    passwordMask: !settings.rowData[settings.rowDataIndex.showBase].hasCheck,
    clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
  });
  main.win.add(main.base);
  
  main.id = Ti.UI.createTextField({
    autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
    top: coords.id.top,
    width: coords.id.width,
    height: coords.id.height,
    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Account Nickname',
    autocorrect: false,
    passwordMask: !settings.rowData[settings.rowDataIndex.showIdentifier].hasCheck,
    clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
  });
  main.win.add(main.id);
  
  main.pw = Ti.UI.createTextField({
    autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
    top: coords.pw.top,
    width: coords.pw.width,
    height: coords.pw.height,
    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    editable: false,
    enabled: true,
    hintText: 'Generated Password',
    autocorrect: false,
    visible: coords.pw.visible,
    passwordMask: !settings.rowData[settings.rowDataIndex.showPassword].hasCheck,
  });
  main.win.add(main.pw);
  
  main.slider = Ti.UI.createSlider({
    top: coords.slider.top,
    value: 40,
    min: 0,
    max: 40,
    left: coords.slider.left,
    right: coords.slider.right
  });
  main.win.add(main.slider);
  
  main.strength = Ti.UI.createLabel({
    id: 'font_label_test',
    text: L('superman_strong'),
    top: coords.strength.top,
    height: coords.strength.height,
    color: '#336699',
    textAlign: 'center'
  });
  main.win.add(main.strength);
  
  main.keyButton = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,
    'images/KeyButton.png');
  
  main.imageViewP = Titanium.UI.createImageView({
    image: main.keyButton,
    borderColor: '#336699',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    top: coords.imageViewP.top,
    width: coords.imageViewP.width,
    height: coords.imageViewP.height,
    visible: coords.imageViewP.visible
  });
  
  main.imageViewL = Titanium.UI.createImageView({
    image: main.keyButton,
    borderColor: '#336699',
    borderRadius: 10,
    top: coords.imageViewL.top,
    width: coords.imageViewL.width,
    height: coords.imageViewL.height,
    visible: coords.imageViewL.visible
  }); 
 
  main.win.add(main.imageViewP);
  main.win.add(main.imageViewL);
  
  AnimationsView.setupClipWin([main.imageViewP, main.imageViewL]);
  
  main.slider.addEventListener('change', function(e) {
    if (main.slider.value > 30) {
      main.strength.text = L('superman_strong');
    }
    else if (main.slider.value > 20 && main.slider.value <= 30) {
      main.strength.text = L('extremely_strong');
    }
    else if (main.slider.value > 10 && main.slider.value <= 20) {
      main.strength.text = L('very_strong');
    }
    else {
      main.strength.text = L('strong');
    }
  });
  
  imageViewHandler = function() {
    var plaintext = main.base.value+main.id.value;
    if (main.slider.value > 30) {
      main.generateHandler(hex_sha1, plaintext, 1);
    }
    else if (main.slider.value > 20 && main.slider.value <= 30) {
      main.generateHandler(b64_sha1, plaintext, 1);  
    }
    else if (main.slider.value > 10 && main.slider.value <= 20) {
      main.generateHandler(hex_sha1, plaintext, 2);
    }
    else {
      main.generateHandler(b64_sha1, plaintext, 2);
    }
  };
  
  main.imageViewP.addEventListener('click', imageViewHandler);
  main.imageViewL.addEventListener('click', imageViewHandler);
  
  main.base.addEventListener('blur', function() {
    if (settings.rowData[settings.rowDataIndex.saveSecret].hasCheck) {
      settings.baseValue = main.base.value;
      Ti.App.fireEvent('settings_controller:update_base_val');
    }
  });
};

Ti.App.addEventListener('main:update_fields', function(e) {
  var settings = main.win.s();
  
  main.base.blur();
  main.base.passwordMask = !settings.rowData[settings.rowDataIndex.showBase].hasCheck;
  
  main.id.blur();
  main.id.passwordMask = !settings.rowData[settings.rowDataIndex.showIdentifier].hasCheck;
  
  main.pw.passwordMask = !settings.rowData[settings.rowDataIndex.showPassword].hasCheck;
});

Ti.Gesture.addEventListener('orientationchange', function(e) {
  var coords = main.getCoords();
  main.strength.top = coords.strength.top;
  main.slider.top = coords.slider.top;
  main.slider.left = coords.slider.left;
  main.slider.right = coords.slider.right;
  main.pw.visible = coords.pw.visible;
  main.imageViewP.visible = coords.imageViewP.visible;
  main.imageViewL.visible = coords.imageViewL.visible;
});

main.setupWin();