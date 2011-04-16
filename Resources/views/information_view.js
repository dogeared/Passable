var InformationView = function() {};

InformationView.transformZero = Titanium.UI.create2DMatrix().scale(0);
InformationView.transformBig = Titanium.UI.create2DMatrix().scale(1.1);
InformationView.transformNormal = Titanium.UI.create2DMatrix();

InformationView.animationZero = Titanium.UI.createAnimation({transform: InformationView.transformZero, duration: 200});
InformationView.animationBig = Titanium.UI.createAnimation({transform: InformationView.transformBig, duration: 200});
InformationView.animationNormal = Titanium.UI.createAnimation({transform: InformationView.transformNormal, duration: 200});


InformationView.timeoutId = 0;

InformationView.infoText = 
  "Passable\n\n" +
  "Developed by Micah Silverman\n" +
  "With the smooth stylings\nof Robert Malko\n" +
  "Copyright 2011\n" +
  "http://afitnerd.com\n\n" +
  "Javascript Sha1 implementation\nby Paul Johnston, et al.\n" +
  "http://pajhome.org.uk/crypt/md5\n\n" +
  "Original idea by Brad Tilley\n16 Systems\n" +
  "http://16s.us/sha1_pass/\n\n" +
  "Brief overview:\n\n" +
  "Memorizing lots of passwords sucks.\n" +
  "Writing down passwords sucks.\n" +
  "Using the same password sucks.\n" +
  "Server side password solutions suck.\n" +
  "Two factor authentication is expensive.\nAnd, therefore, sucks.\n\n" +
  "With the Passable app, you remember a long base phrase that only you know.\n\n" +
  "For each password protected site, you have a short identifier.\n\n" +
  "A very strong SHA1 hash is generated using these two pieces of information.\n\n" +
  "It's easy to regenerate the password with information that only you " + 
  "know and can easily remember.\n\n" +
  "The identifier makes sure that every site gets a unique password.\n" +
  "Check out http://16s.us/sha1_pass/ for a more detailed (and better) explanation.";

InformationView.clipWin = Titanium.UI.createWindow({
  backgroundColor: '#FFFFFF',
  opacity: 0.9,
  height: 400,
  width: 300,
  borderRadius: 10,
  transform: InformationView.transformZero
});

InformationView.clipWin.orientationModes = [
  Titanium.UI.PORTRAIT,
  Titanium.UI.UPSIDE_PORTRAIT,
  Titanium.UI.LANDSCAPE_LEFT,
  Titanium.UI.LANDSCAPE_RIGHT
];

InformationView.clipLabel = Titanium.UI.createLabel({
  color: '#000',
  textAlign: 'center',
  font: { fontSize: 16 },
  text: InformationView.infoText
});

InformationView.scrollView = Titanium.UI.createScrollView({
    contentWidth:'300',
    contentHeight:'900',
    top:0,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true
});

InformationView.scrollView.add(InformationView.clipLabel);
  
InformationView.setupInfoWin = function(callback) {
  InformationView.clipWin.add(InformationView.scrollView);

  InformationView.animationBig.addEventListener('complete', function() {
    InformationView.clipWin.animate(InformationView.animationNormal);
  });

  InformationView.scrollView.addEventListener('singletap', function() {
    InformationView.clipWin.close(InformationView.animationZero);
    setTimeout(callback, 200);
  });
};
  
InformationView.showInfoWin = function() {
  InformationView.clipWin.open(InformationView.animationBig);
};