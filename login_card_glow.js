(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', initGlowEffect);
  window.addEventListener('load', initGlowEffect);
  
  // Try initializing after a short delay as well (backup)
  setTimeout(initGlowEffect, 1000);
  
  function initGlowEffect() {
    // Make sure we only initialize once
    if (window.glowEffectInitialized) return;
    
    console.log("Attempting to setup login card glow effect...");
    
    // Find the login card element
    const loginCard = document.querySelector('.card');
    const cardBody = document.querySelector('.card-body');
    
    if (!loginCard || !cardBody) {
      console.error("Login card elements not found. Will retry in 500ms...");
      setTimeout(initGlowEffect, 500);
      return;
    }
    
    console.log("Login card found. Setting up glow effect...");
    window.glowEffectInitialized = true;
    
    // Parameters for the glow effect
    const config = {
      inactiveZoneRadius: 100, // Radius of the inactive zone (px)
      transitionSpeed: 0.3,    // Animation speed (seconds)
      glowThickness: 4,        // Thickness of the glow (px)
      glowBlur: 15,            // Blur amount for the glow (px)
      glowColors: [
        'rgba(62, 180, 255, 0.8)',   // Blue
        'rgba(255, 105, 180, 0.8)',  // Pink
        'rgba(111, 78, 255, 0.8)'    // Purple
      ]
    };
    
    // Create and add style element
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .glow-border-container {
        position: relative;
        overflow: visible !important;
      }
      
      .glow-border-element {
        position: absolute;
        top: -${config.glowThickness * 2}px;
        left: -${config.glowThickness * 2}px;
        right: -${config.glowThickness * 2}px;
        bottom: -${config.glowThickness * 2}px;
        z-index: -1;
        border-radius: 8px;
        opacity: 0;
        transition: opacity 0.5s ease;
        filter: blur(${config.glowBlur}px);
        background: conic-gradient(
          ${config.glowColors[0]},
          ${config.glowColors[1]},
          ${config.glowColors[2]},
          ${config.glowColors[0]}
        );
        transform: rotate(0deg);
        transition: transform ${config.transitionSpeed}s ease-out;
      }
      
      .glow-active .glow-border-element {
        opacity: 1;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Setup the glow container
    const originalPosition = window.getComputedStyle(loginCard).position;
    if (originalPosition === 'static') {
      loginCard.style.position = 'relative';
    }
    
    loginCard.classList.add('glow-border-container');
    
    // Create glow element
    const glowElement = document.createElement('div');
    glowElement.className = 'glow-border-element';
    loginCard.appendChild(glowElement);
    
    // Track glow state
    let isGlowActive = false;
    let glowTimeout;
    
    // Helper functions
    function getAngle(centerX, centerY, pointX, pointY) {
      return Math.atan2(pointY - centerY, pointX - centerX) * (180 / Math.PI);
    }
    
    function getDistance(centerX, centerY, pointX, pointY) {
      return Math.sqrt(Math.pow(pointX - centerX, 2) + Math.pow(pointY - centerY, 2));
    }
    
    function activateGlow() {
      loginCard.classList.add('glow-active');
      isGlowActive = true;
      
      if (glowTimeout) {
        clearTimeout(glowTimeout);
        glowTimeout = null;
      }
    }
    
    function deactivateGlow() {
      if (glowTimeout) {
        clearTimeout(glowTimeout);
      }
      
      glowTimeout = setTimeout(function() {
        loginCard.classList.remove('glow-active');
        isGlowActive = false;
      }, 1500);
    }
    
    // Add mouse move listener
    document.addEventListener('mousemove', function(event) {
      const rect = loginCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      // Calculate distance from center
      const distance = getDistance(centerX, centerY, mouseX, mouseY);
      
      // Check if mouse is outside the inactive zone but near the element
      if (distance > config.inactiveZoneRadius && 
          mouseX >= rect.left - 100 && mouseX <= rect.right + 100 && 
          mouseY >= rect.top - 100 && mouseY <= rect.bottom + 100) {
        
        // Calculate the angle for the glow
        const angle = getAngle(centerX, centerY, mouseX, mouseY);
        
        // Update the glow position
        glowElement.style.transform = `rotate(${angle}deg)`;
        
        // Activate the glow
        activateGlow();
      } else if (isGlowActive) {
        deactivateGlow();
      }
    });
    
    // Add hover effect to form elements
    const formElements = cardBody.querySelectorAll('input, button');
    formElements.forEach(function(element) {
      element.addEventListener('mouseenter', activateGlow);
      element.addEventListener('mouseleave', deactivateGlow);
    });
    
    console.log("Glowing border effect successfully set up for login card.");
  }
})();
