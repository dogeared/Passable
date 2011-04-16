var AnimationsView = function() {};

AnimationsView.displayElements = [];

AnimationsView.toggleDisplayElements = function(enabled) {
  for (var i=0; i<AnimationsView.displayElements.length; i++) {
    AnimationsView.displayElements[i].enabled = enabled;
  }
};
  
AnimationsView.setupClipWin = function(displayElements) {
  AnimationsView.displayElements = displayElements;
  
  AnimationsView.transformZero = Titanium.UI.create2DMatrix().scale(0);
  AnimationsView.transformBig = Titanium.UI.create2DMatrix().scale(1.1);
  AnimationsView.transformNormal = Titanium.UI.create2DMatrix();

  AnimationsView.animationZero = Titanium.UI.createAnimation({transform: AnimationsView.transformZero, duration: 200});
  AnimationsView.animationBig = Titanium.UI.createAnimation({transform: AnimationsView.transformBig, duration: 200});
  AnimationsView.animationNormal = Titanium.UI.createAnimation({transform: AnimationsView.transformNormal, duration: 200});

  AnimationsView.clipWin = Titanium.UI.createWindow({
    backgroundColor: '#336699',
    opacity: 0.9,
    height: 200,
    width: 250,
    borderRadius: 10,
    transform: AnimationsView.transformZero
  });

  AnimationsView.clipLabel = Titanium.UI.createLabel({
    color: '#000',
    textAlign: 'center',
    font: { fontSize: 26 },
    text: 'Password Copied.\nPaste away!'
  });  
  
  AnimationsView.clipWin.add(AnimationsView.clipLabel);

  AnimationsView.animationBig.addEventListener('complete', function() {
    AnimationsView.clipWin.animate(AnimationsView.animationNormal);
  });
  
  AnimationsView.animationNormal.addEventListener('complete', function() {
    setTimeout(function() {
      AnimationsView.clipWin.close(AnimationsView.animationZero);
      AnimationsView.toggleDisplayElements(true);
    }, 1500);
  });
};
  
AnimationsView.showClipWin = function() {
  AnimationsView.toggleDisplayElements(false);
  AnimationsView.clipWin.open(AnimationsView.animationBig);
};

// clipWin is set to transformZero
// clipWin is opened with animationBig
//   when animation from transformZero to transformBig is complete,
//   clipWin is animated from animationBig to animationNormal
// 1500 millis later, clipWin is closed with animationZero
//   clipWin is animated from animationNormal to animationZero