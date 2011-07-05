var android = (Ti.Platform.name === 'android');

var main = {
  win: Titanium.UI.currentWindow,
  portraitCoords: {
    base: {
      top: 10,
      width: 300,
      height: (android)?40:35
    },
    id: {
      top: 55,
      width: 300,
      height: (android)?40:35,
    },
    pw: {
      top: 100,
      width: 300,
      height: (android)?40:35,
      visible: true
    },
    slider: {
      top: 140,
      left: 10,
      right: 10
    },
    strength: {
      top: 100,
      height: 150
    },
    imageViewP: {
      visible: true,
      top: 200,
      width: 150,
      height: 150,
    },
    imageViewL: {
      visible: false,
      top: 140,
      width: 75,
      height: 75,
    }    
  },
  landscapeCoords: {
    base: {
      top: 10,
      width: 300,
      height: 35
    },
    id: {
      top: 55,
      width: 300,
      height: 35,      
    },
    pw: {
      top: 100,
      width: 300,
      height: 35,
      visible: false
    },
    slider: {
      top: 95,
      left: 80,
      right: 80
    },
    strength: {
      top: 50,
      height: 150
    },
    imageViewP: {
      visible: false,
      top: 200,
      width: 150,
      height: 150,
    },
    imageViewL: {
      visible: true,
      top: 140,
      width: 75,
      height: 75,
    }    
  }
};