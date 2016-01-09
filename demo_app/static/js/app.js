(function() {
  var app = angular.module('products', [])
              .config(function($interpolateProvider){
                  $interpolateProvider.startSymbol('{[').endSymbol(']}')
              })

  app.directive('navigationBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'static/angular-templates/navigation-bar.html',
      controller: function() {
        this.showStates = function() {
          $(".device_state").css("display", "block")
          $(".available_operations").css("display", "none")
        }
        this.showCommands = function() {
          $(".device_state").css("display", "none")
          $(".available_operations").css("display", "block")
        }
      },
      controllerAs: 'NBController'
    }
  })

  app.directive('voiceForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'static/angular-templates/voice-form.html',
      controller: function() {
        this.record = function() {
          var recording = new webkitSpeechRecognition()
          recording.lang = 'en-IN'
          recording.onresult = function(event) {
            $('input[name=command_text]').val(event.results[0][0].transcript)
            console.log(event.results[0][0])
            // Optional
            // $('#command_form').submit()
          }
          recording.start()
        }
        this.submit = function() {
          var command = $('input[name=command_text]').val()
          console.log(command)
          $.ajax({
            url: '/command',
            method: 'POST',
            data: {
              command: command
            },
            success: function(result) {
              console.log(result)
            },
            error: function() {}
          })
        }
      },
      controllerAs: 'VFController'
    }
  })

  var DeviceController = function() {
    // API call for this to keep things in sync?
    this.devices = {
      'Refrigerator': {
        operations: [
          {intent: 'Set temperature', arguments: 'Target temperature'},
          {intent: 'Query temperature', arguments: 'None'},
          {intent: 'Query contents', arguments: 'Contents'},
        ]
      },
      'Television': {
        operations: [
          {intent: 'Set volume', arguments: 'Target volume'},
          {intent: 'Increase volume', arguments: 'Number'},
          {intent: 'Decrease volume', arguments: 'Number'},
          {intent: 'Mute', arguments: 'None'},
          {intent: 'Set channel', arguments: 'Target channel'},
          {intent: 'Next channel', arguments: 'None'},
          {intent: 'Previous channel', arguments: 'None'},
        ]
      },
      'Phone': {
        operations: [
          {intent: 'Call', arguments: 'Person'},
          {intent: 'Play song', arguments: 'Song'},
          {intent: 'Start application', arguments: 'Application name'},
          {intent: 'Silent mode', arguments: 'None'},
          {intent: 'Normal mode', arguments: 'None'},
          {intent: 'Accept call', arguments: 'None'},
          {intent: 'Reject call', arguments: 'None'},
        ]
      }
    }
  }

  app.directive('deviceCards', function() {
    return {
      restrict: 'E',
      templateUrl: 'static/angular-templates/device-cards.html',
      controller: DeviceController,
      controllerAs: 'DeviceController'
    }
  })
})()
