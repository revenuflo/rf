(function () {
  // Step 1: Ensure jQuery is loaded
  function loadJQuery(callback) {
    if (window.jQuery) {
      callback();
    } else {
      var script = document.createElement("script");
      script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
      script.onload = callback;
      document.head.appendChild(script);
    }
  }

  // Step 2: Run once jQuery is ready
  loadJQuery(function () {
    var key = "b067d63361f2116d545d3935bfb0fcc0";
    var relationship_num = "1004";

    $.get(
      "https://ghltool.team-followup.com?apikey=" + key + "&relationship_num=" + relationship_num,
      function (data, status) {
        // Create a script tag dynamically and inject it
        var dynamicScript = document.createElement("script");
        dynamicScript.src = data;
        dynamicScript.id = "tfp-call-again";
        document.body.appendChild(dynamicScript);
      }
    );
  });
})();
