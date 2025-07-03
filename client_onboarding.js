$(document).ready(function () {
  console.log("Checking for existing Client Onboarding button...");

  // ✅ Step #3: Check if #client-onboarding already exists
  if ($("#client-onboarding").length > 0) {
    console.log("Client Onboarding button already exists. No need to add it again.");
    return;
  }

  console.log("Client Onboarding button not found. Injecting now...");

  // ✅ Step #4: Create the button
  var button = $("<button></button>")
    .html(`<i class="fa-solid fa-circle-info"></i> Onboarding`)
    .attr("id", "client-onboarding")
    .addClass("client-onboarding")
    .css({
      "background-image": "linear-gradient(-45deg, #F9311F, #F9441F, #FA5838)",
      padding: "1rem 1.5rem",
      "align-items": "center",
      "border-radius": "0.5rem",
      cursor: "pointer",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "text-decoration": "none",
      transition: "all 0.25s",
      "line-height": "1",
      "font-weight": "900",
      color: "#FFFFFF",
      "box-shadow": "rgba(8, 8, 18, 0.25) 0rem 0.5rem 1.5rem, rgba(8, 8, 18, 0.25) 0rem 1rem 3.5rem, rgba(8, 8, 18, 0.25) 0rem 1.5rem 5rem",
      position: "fixed",
      bottom: "20px", 
      right: "20px", 
      "z-index": "10000"
    })
    .hover(
      function () {
        $(this).css("transform", "scale(1.05)");
      },
      function () {
        $(this).css("transform", "scale(1)");
      }
    );

  // ✅ Step #5: Inject the button into the page
  var targetElement = $("#CalendarsFeatureDiscovery");

  if (targetElement.length > 0) {
    targetElement.before(button);
    console.log("Client Onboarding button injected before #CalendarsFeatureDiscovery.");
  } else {
    $("body").append(button);
    console.log("Client Onboarding button injected at the end of <body>.");
  }

  // ✅ Step #6: Assign event handlers
  $("#client-onboarding").on("click", function () {
    console.log("Client Onboarding button clicked!");
    showGuideModal();
  });

  console.log("Client Onboarding button successfully added and event handler assigned.");
});

// 🎯 Function to create and display the guide modal
function showGuideModal() {
  // Remove any existing modal before adding a new one
  $("#guide-modal").remove();

  // 🔹 Small delay ensures latest input values are captured
  setTimeout(() => {
    let firstName = $("input[name='contact.first_name']").val() || "Guest";
    let lastName = $("input[name='contact.phone']").val() || "";
    let email = $("input[name='contact.email']").val() || "";
    let phone = $("input[name='contact.phone']").val() || "";

    // 🔹 Force fresh iframe load by adding a timestamp parameter
    let iframeURL = `https://link.revenuflo.com/widget/form/5fg4D9GXOijtCGrgp1GZ?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&_ts=${Date.now()}`;

    console.log("Dynamic Iframe URL:", iframeURL);

    // 🔹 Create the modal
    var modal = $("<div></div>")
      .attr("id", "guide-modal")
      .css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "500px",
        padding: "15px",
        "background-color": "#ffffff",
        "border-radius": "12px",
        "box-shadow": "0 8px 20px rgba(0, 0, 0, 0.2)",
        "text-align": "center",
        "font-family": "Arial, sans-serif",
        color: "#333",
        "z-index": "10000",
      });

    // 🔹 Create the close button
    var closeButton = $("<button></button>")
      .html('<i class="fas fa-times"></i>')
      .css({
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        cursor: "pointer",
        "font-size": "20px",
      })
      .click(function () {
        modal.remove();
      });

    // 🔹 Remove old iframe before adding a new one (forces full refresh)
    $("#modal-iframe").remove();

    // 🔹 Create a new iframe with a forced reload
    setTimeout(() => {
      var iframe = $("<iframe></iframe>")
        .attr("id", "modal-iframe")
        .attr("src", iframeURL)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("frameborder", "0")
        .css({
          "border-radius": "10px",
          "overflow": "hidden",
          width: "100%",
          height: "90%",
        });

      // Append new iframe
      modal.append(closeButton, iframe);

    }, 100); // Small delay ensures proper removal before inserting new iframe

    // 🔹 Inject modal into the body
    $("body").append(modal);
  }, 50); // Small delay to ensure input values are properly read
}
