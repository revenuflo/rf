  const observer = new MutationObserver(() => {
    let link = document.getElementById("sb_reputation");
    if (link) {
      let newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
</script>

<!-- Icon Bar Injection and Functionality -->
<script>
$(document).ready(function () {
  // Check if the Icon Bar is already injected
  if ($("#dock-icon-bar").length > 0) {
    console.log("Icon Bar already exists. No need to add it again.");
    return;
  }
  console.log("Icon Bar not found. Injecting now...");

  // Inject Icon Bar styles (vertical layout fixed on right with tooltips on left)
  var iconBarStyles = `
    <style id="dock-icon-bar-styles">
      .icon-bar {
        --scale: 1;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background-color: #141414;
        box-shadow: hsla(0, 0%, 4%, 0.25) 0rem 0.5rem 1rem,
                    hsla(0, 0%, 4%, 0.25) 0rem 0.75rem 1.5rem,
                    hsla(0, 0%, 4%, 0.25) 0rem 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 99999;
        backdrop-filter: blur(0.25rem);
        -webkit-backdrop-filter: blur(0.25rem);
      }
      .icon-wrapper {
        font-size: calc(1rem * var(--scale));
        margin: 0.25rem 0;
        padding: 0.5rem;
        cursor: default;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 15ms all ease-out;
        border-radius: 100%;
        background-color: #F9441F;
      }
      .icon-wrapper svg {
        width: 1em;
        height: 1em;
        fill: #FFFFFF;
      }
      @keyframes loading {
        0%,100% {transform: translateY(0rem);}
        60% {transform: translateY(-2.5rem);}
      }
      /* Position tooltip to the left of each icon */
      .icon-wrapper .tooltip {
        position: absolute;
        right: calc(100% + 0.5rem);
        top: 50%;
        transform: translateY(-50%);
        background-color: #1F1F1F;
        color: #FFFFFF;
        padding: 0.25rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 15ms ease-in-out, visibility 15ms ease-in-out;
      }
      .icon-wrapper:hover .tooltip {
        opacity: 1;
        visibility: visible;
      }
    </style>
  `;
  $("head").append(iconBarStyles);

  // Define the Icon Bar HTML with new structure and unique IDs (using the "dock-" prefix)
  var iconBarHtml = `
    <div id="dock-icon-bar" class="icon-bar">
      <div class="icon-wrapper" id="dock-power-dialer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7.73,1.15C7.37.28,6.42-.18,5.51.07L1.38,1.19c-.82.22-1.38.97-1.38,1.81,0,11.6,9.4,21,21,21,.84,0,1.58-.57,1.81-1.38l1.12-4.12c.25-.91-.22-1.86-1.09-2.22l-4.5-1.87c-.76-.32-1.65-.1-2.17.54l-1.89,2.31c-3.3-1.56-5.97-4.23-7.53-7.53l2.31-1.89c.64-.52.86-1.41.54-2.17l-1.87-4.5h0Z"/>
        </svg>
        <div class="tooltip">Power Dialer</div>
      </div>
      <div class="icon-wrapper" id="dock-onboarding">
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0 A8 8 0 1 0 8 16 A8 8 0 1 0 8 0"/>
        </svg>
        <div class="tooltip">Onboarding</div>
      </div>
      <div class="icon-wrapper" id="dock-pipeline">
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0 A8 8 0 1 0 8 16 A8 8 0 1 0 8 0"/>
        </svg>
        <div class="tooltip">Pipeline</div>
      </div>
      <div class="icon-wrapper" id="dock-calendar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M6,0h2.4v2.4h7.2V0h2.4v2.4h6v16.8c0,2.65-2.15,4.8-4.8,4.8H4.8c-2.65,0-4.8-2.15-4.8-4.8V2.4h6V0ZM21.6,10.85H2.4v8.35c0,1.33,1.07,2.4,2.4,2.4h14.4c1.33,0,2.4-1.07,2.4-2.4v-8.35ZM21.6,4.8H2.4v3.6h19.2v-3.6Z"/>
        </svg>
        <div class="tooltip">Calendar</div>
      </div>
      <div class="icon-wrapper" id="dock-tasks">
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0 A8 8 0 1 0 8 16 A8 8 0 1 0 8 0"/>
        </svg>
        <div class="tooltip">Tasks</div>
      </div>
    </div>
  `;
  
  // Inject the Icon Bar into the page (insert before #CalendarsFeatureDiscovery if it exists)
  var targetElement = $("#CalendarsFeatureDiscovery");
  if (targetElement.length > 0) {
    targetElement.before(iconBarHtml);
    console.log("Icon Bar injected before #CalendarsFeatureDiscovery.");
  } else {
    $("body").append(iconBarHtml);
    console.log("Icon Bar injected at the end of <body>.");
  }

  // Assign click event handlers to each icon for pushState navigation.
  $("#dock-power-dialer").on("click", function () {
    console.log("Power Dialer button clicked!");
    const targetURL = "/v2/location/F7UgFDXmYhmt4WMeMjzs/conversations/manual_actions";
    history.pushState({}, '', targetURL);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  });
  
  // --- Updated Onboarding Button Functionality ---
  $("#dock-onboarding").on("click", function () {
    console.log("Onboarding button clicked!");
    showGuideModal();
  });
  // -------------------------------------------

  $("#dock-pipeline").on("click", function () {
    console.log("Pipeline button clicked!");
    const targetURL = "/v2/location/F7UgFDXmYhmt4WMeMjzs/opportunities/list";
    history.pushState({}, '', targetURL);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  });
  
  $("#dock-calendar").on("click", function () {
    console.log("Calendar button clicked!");
    const targetURL = "/v2/location/F7UgFDXmYhmt4WMeMjzs/calendars/view";
    history.pushState({}, '', targetURL);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  });
  
  $("#dock-tasks").on("click", function () {
    console.log("Tasks button clicked!");
    const targetURL = "/v2/location/F7UgFDXmYhmt4WMeMjzs/tasks";
    history.pushState({}, '', targetURL);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  });
  
  // Integrate the mousemove scaling behavior (vertical version).
  document.querySelectorAll('.icon-wrapper').forEach(div => {
    div.addEventListener('mousemove', e => {
      let item = e.target;
      if(item.tagName.toLowerCase() === 'svg' || item.tagName.toLowerCase() === 'path'){
        item = item.closest('.icon-wrapper');
      }
      let itemRect = item.getBoundingClientRect();
      let offset = Math.abs(e.clientY - itemRect.top) / itemRect.height;
      let prev = item.previousElementSibling || null;
      let next = item.nextElementSibling || null;
      let scale = 0.6;
      resetScale();
      if(prev){
        prev.style.setProperty('--scale', 1 + scale * Math.abs(offset - 1));
      }
      item.style.setProperty('--scale', 1 + scale);
      if(next){
        next.style.setProperty('--scale', 1 + scale * offset);
      }
    });
  });
  document.querySelector('.icon-bar').addEventListener('mouseleave', e => {
    resetScale();
  });
  function resetScale(){
    document.querySelectorAll('.icon-wrapper').forEach(div => {
      div.style.setProperty('--scale', 1);
    });
  }
});
</script>

<!-- Onboarding Modal Functionality (from SCRIPT B) -->
<script>
function showGuideModal() {
  // Remove any existing modal before adding a new one
  $("#guide-modal").remove();

  // Small delay to ensure latest input values are captured
  setTimeout(() => {
    let firstName = $("input[name='contact.first_name']").val() || "Guest";
    let lastName = $("input[name='contact.last_name']").val() || "";
    let email = $("input[name='contact.email']").val() || "";
    let phone = $("input[name='contact.phone']").val() || "";

    // Force fresh iframe load by adding a timestamp parameter
    let iframeURL = `https://link.revenuflo.com/widget/form/5fg4D9GXOijtCGrgp1GZ?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&_ts=${Date.now()}`;

    console.log("Dynamic Iframe URL:", iframeURL);

    // Create the modal container
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

    // Create the close button
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

    // Remove any old iframe before adding a new one
    $("#modal-iframe").remove();

    // Create a new iframe with a forced reload after a short delay
    setTimeout(() => {
      var iframe = $("<iframe></iframe>")
        .attr("id", "modal-iframe")
        .attr("src", iframeURL)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("frameborder", "0")
        .css({
          "border-radius": "10px",
          width: "100%",
          height: "90%",
        });

      // Append the close button and iframe to the modal
      modal.append(closeButton, iframe);
    }, 100);

    // Inject the modal into the body
    $("body").append(modal);
  }, 50);
}
