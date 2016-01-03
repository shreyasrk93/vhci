$(document).ready(function() {
  $("#command_form").submit(function(e) {
    e.preventDefault()
    var command = $("input[name=command_text]").val()
    alert(command)
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
})
