
var app = {
    
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
    
    var push = PushNotification.init({
                                       "android": {
                                       "senderID": "681259973617"
                                       // "icon": "fit_icon",
                                       // "iconColor": "#4a4354"
                                       },
                                       "ios":
                                       {"alert": "true",
                                       "badge": "true",
                                       "sound": "true",
                                       "clearBadge": "true"
                                       },
                                       "windows": {}
      });   //End of push Initialization

      push.on('registration', function(data) {  // called for registering device for getting token for push notification
              localStorage.setItem('deviceToken',data.registrationId);
              console.log(data.registrationId);
//              Nativealert(data.registrationId,"Device Token");
      }); //End of Push Registration.

      push.on('notification', function(data) {   //called when push notification received
            var AppStatus = data.additionalData.foreground;
            var d_type =  localStorage.getItem('deviceType');
            var url1 = location.href.split('#')[0];
            location.href = url1+'#/notification-scenario/';

      push.finish(function () {
        console.log('finish successfully called');
      }); // End of Pus On Finish
      });   // End of Push On Notification

      push.on('error', function(e) {
              console.log("push error");
      });  // End of Push On Error
    }  // End of DeviceReady Function
}; //End of app

app.initialize();
function Android_Loader(){
    if(localStorage.getItem('deviceType') == "Android") {
        window.plugins.spinnerDialog.show(null, null, true);
        setTimeout(function(){
            window.plugins.spinnerDialog.hide();
        }, 6000);
    }
} // End of Android_Loader() Function
