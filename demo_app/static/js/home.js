$(document).ready(function() {
  $("#command_form").submit(function(e) {
    e.preventDefault()
    var command = $("input[name=command_text]").val()
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
  })

  $("#record_command").click(function() {
    var recording = new webkitSpeechRecognition()
    recording.lang = "en-IN"
    recording.onresult = function(event) {
      $("input[name=command_text]").val(event.results[0][0].transcript)
      console.log(event.results[0][0])
      // Optional
      // $("#command_form").submit()
    }
    recording.start()
  })
})
