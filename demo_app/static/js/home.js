$(document).ready(function() {
  (function() {
    // Initial states have to be defined here
    // $(".device_state").css("display", "block")
    // $(".available_operations").css("display", "none")
    $(".device_state").css("display", "none")
    $(".available_operations").css("display", "block")  })()

  $("#show_states").click(function(e) {
    e.preventDefault()
    $(".device_state").css("display", "block")
    $(".available_operations").css("display", "none")
  })

  $("#show_commands").click(function(e) {
    e.preventDefault()
    $(".device_state").css("display", "none")
    $(".available_operations").css("display", "block")
  })

  $("#command_form").submit(function(e) {
    e.preventDefault()
    var command = $("input[name=command_text]").val()
    $.ajax({
      url: "/command",
      method: "POST",
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
