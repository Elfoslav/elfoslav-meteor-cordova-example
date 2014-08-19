if (Meteor.isClient) {
  //lazy load file when URL contains query /?platform=cordova-2-8.1
  LazyLoad.addFile('/android/cordova-2.8.1.js', 'cordova-2.8.1');
  //lazy load file when URL contains query /?platform=cordova-3.5.0
  LazyLoad.addFile([
    '/android/cordova-3.5.0.js',
    '/android/cordova-plugin-dialogs.js',
    '/android/cordova-plugin-vibration.js'
  ], 'cordova-3.5.0');

  Template.hello.greeting = function () {
    return "Welcome to elfoslav-cordova";
  };

  Template.hello.deviceready = function() {
    return meteorCordova.isReady();
  };

  Template.hello.events({
    'click .cordova-alert': function () {
      //meteorCordova.alert(message, alertCallback, [title], [buttonName])
      meteorCordova.alert("Hello Cordova Alert", function() {
        console.log('Alert is closed');
      }, 'Greeting', 'Ok');
    },

    'click .cordova-confirm': function () {
      //meteorCordova.confirm(message, confirmCallback, title, buttonLabels)
      meteorCordova.confirm("Hello Cordova Confirm", function(val) {
        console.log('Confirm is closed: ', val);
      }, 'Greeting', ['A', 'B', 'C']);
    },

    'click .cordova-prompt': function () {
      //meteorCordova.prompt(message, promptCallback, title, buttonLabels, defaultText)
      meteorCordova.prompt("Hello Cordova Prompt", function(val) {
        console.log('Prompt is closed: ', val);
      }, 'Greeting',  ['A', 'B', 'C'], 'Some default text');
    },

    'click .cordova-beep': function () {
      //meteorCordova.beep(times)
      meteorCordova.beep(1);
    },

    'click .cordova-vibrate': function () {
      console.log('it should vibrate for 1 second');
      meteorCordova.vibrate(1000);
    }
  });

  Meteor.startup(function () {

    LazyLoad.require(LazyLoad.queryString['platform'], function() {
      console.log('Loaded files for ' + LazyLoad.queryString['platform'] + ' platform');
    });

    meteorCordova.call('console.log', ['Hello world']);

    meteorCordova.addEventListener('deviceready', function() {
      meteorCordova.call('console.log', ['device ready from Meteor']);
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
