  function updateOutput() {
    //takes the HTML and CSS contents from their panels and reads/runs them thru the output iframe
    $("iframe").contents().find("html").html("<html><head><style type = 'text/css'>" + $("#cssText").val() + "</style></head><body>" + $("#htmlText").val() + "</body></html>");
    //takes JS content from its panel and runs thru output frame
    document.getElementById("outputText").contentWindow.eval($("#jsText").val());
    //runs JS in the iframe itself; has to be seperate (security reasons)
    //eval($("#jsText").val());
  }
  //button hover effects (highlight color)
  $(".toggleButtons").hover(function() {
    $(this).addClass("highlightedButton");
  }, function() {
    $(this).removeClass("highlightedButton");
  });
  //button 'on-click' action effects
  $(".toggleButtons").click(function() {
    $(this).toggleClass("active");
    $(this).removeClass("highlightedButton");
    var panelId = $(this).attr("id") + "Text";
    $("#" + panelId).toggleClass("hidden");
    //counts number of elements that have the class 'hidden'
    var closedPanels = $('.hidden').length
    //adjusts panel width depending on how many pannes are closed vs open
    $(".panel").width(($(window).width() / (4 - closedPanels)) - 10);
  });
  //adjusts starting window height and width
  $(".panel").height($(window).height() - $("#topBar").height() - 15);
  $(".panel").width(($(window).width() / 2) - 4);
  //calls function to run and display HTML,CSS, and JS contents in iframe
  updateOutput();
  //runs HTML, CSS and JS within browser; updates on every 'keyup' (keystroke)
  $("textarea").on('change keyup paste', function() {
    updateOutput();
  });
