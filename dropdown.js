    const observer = new MutationObserver(() => {
        let navContainer = document.querySelector("#sidebar-v2 nav");

        if (navContainer) {
            console.log("✅ Navigation found - Injecting Drop-Down Menu Item...");

            // Check if the dropdown already exists
            if (document.getElementById("sb_custom_dropdown")) {
                console.log("⚠️ Drop-Down already exists. Stopping observer.");
                observer.disconnect();
                return;
            }

            // Create the main drop-down menu item
            let dropdownItem = document.createElement("a");
            dropdownItem.id = "sb_custom_dropdown";
            dropdownItem.href = "#"; // Placeholder
            dropdownItem.setAttribute("meta", "custom-dropdown");
            dropdownItem.className = "w-full group px-3 flex items-center justify-start text-sm font-medium rounded-md cursor-pointer font-medium opacity-70 hover:opacity-100 py-2 md:py-2";

            // Create the icon
            let iconImg = document.createElement("img");
            iconImg.src = "https://storage.googleapis.com/msgsndr/F7UgFDXmYhmt4WMeMjzs/media/67ce409d3d10881696d962d9.svg"; // Updated icon URL
            iconImg.alt = "Drop-Down Icon";
            iconImg.className = "md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2";

            // Create text label
            let textSpan = document.createElement("span");
            textSpan.className = "hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block";
            textSpan.innerText = "Drop-Down";

            // Create drop-down indicator (GHL drop-down icon)
            let dropdownIcon = document.createElement("i");
            dropdownIcon.className = "ml-auto fas fa-angle-down transition-transform duration-300"; // Fixed right alignment

            // Create the drop-down container (initially hidden)
            let dropdownMenu = document.createElement("div");
            dropdownMenu.id = "sb_custom_dropdown_menu";
            dropdownMenu.style.display = "none"; // Ensure it starts closed
            dropdownMenu.style.paddingLeft = "10px"; // Indent submenu
            dropdownMenu.className = "w-full flex flex-col"; // Match sidebar styling

            // Create submenu links (with the same classes as other menu items)
            let submenuLinks = [
                { text: "Link 1", href: "/v2/location/F7UgFDXmYhmt4WMeMjzs/dashboard", id: "sb-sub-custom-1" },
                { text: "Link 2", href: "/v2/location/F7UgFDXmYhmt4WMeMjzs/dashboard", id: "sb-sub-custom-2" },
                { text: "Link 3", href: "/v2/location/F7UgFDXmYhmt4WMeMjzs/dashboard", id: "sb-sub-custom-3" }
            ];

            submenuLinks.forEach(linkData => {
                let subLink = document.createElement("a");
                subLink.href = linkData.href;
                subLink.id = linkData.id;
                subLink.setAttribute("meta", "custom-submenu");

                // Assign the same classes as the other sidebar menu items
                subLink.className = "w-full px-3 flex items-center justify-start lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer font-medium opacity-70 hover:opacity-100 py-2 md:py-2";
                
                subLink.innerText = linkData.text;

                // Click event for submenu items
                subLink.addEventListener("click", function (event) {
                    event.preventDefault(); // Prevent full reload

                    // Remove "active" class from all other submenu items
                    let allSubLinks = document.querySelectorAll("#sb_custom_dropdown_menu a");
                    allSubLinks.forEach(link => link.classList.remove("exact-active-class", "active"));

                    // Mark the clicked submenu item as active
                    subLink.classList.add("exact-active-class", "active");
                    console.log(`✅ ${subLink.innerText} is now active!`);

                    // SPA navigation using pushState (matches existing sidebar behavior)
                    setTimeout(() => {
                        history.pushState({ key: Date.now() }, '', subLink.href);
                        window.dispatchEvent(new PopStateEvent('popstate')); // Simulate SPA navigation event
                    }, 100);
                });

                dropdownMenu.appendChild(subLink);
            });

            // Click event to toggle drop-down visibility
            dropdownItem.addEventListener("click", function (event) {
                event.preventDefault();

                // Toggle drop-down visibility
                if (dropdownMenu.style.display === "none") {
                    dropdownMenu.style.display = "block";
                    dropdownIcon.style.transform = "rotate(180deg)"; // Rotate arrow down
                } else {
                    dropdownMenu.style.display = "none";
                    dropdownIcon.style.transform = "rotate(0deg)"; // Reset arrow
                }
            });

            // Append elements to the drop-down item
            dropdownItem.appendChild(iconImg);
            dropdownItem.appendChild(textSpan);
            dropdownItem.appendChild(dropdownIcon);

            // Append the drop-down menu to the navigation
            navContainer.appendChild(dropdownItem);
            navContainer.appendChild(dropdownMenu);

            console.log("✅ Drop-Down added successfully!");

            // Stop observing once added
            observer.disconnect();
        }
    });

    // Observe the document for changes
    observer.observe(document.body, { childList: true, subtree: true });
</script>

<script>
    const observer = new MutationObserver(() => {
        let tabsContainer = document.querySelector("#contacts-right-tabs-bar-wrapper ul.nav-tabs");

        if (tabsContainer) {
            console.log("✅ Tabs container found - Injecting new tab...");

            // Check if the custom tab already exists
            if (document.getElementById("custom-tab")) {
                console.log("⚠️ Custom tab already exists. Stopping observer.");
                observer.disconnect();
                return;
            }

            // Create the new nav item
            let newTabItem = document.createElement("li");
            newTabItem.className = "nav-item";

            // Create the div wrapper
            let tabWrapper = document.createElement("div");
            tabWrapper.style.position = "relative";

            // Create the anchor tag
            let newTabLink = document.createElement("a");
            newTabLink.id = "custom-tab";
            newTabLink.href = "#custom";
            newTabLink.setAttribute("data-toggle", "tab");
            newTabLink.setAttribute("role", "tab");
            newTabLink.setAttribute("aria-controls", "custom");
            newTabLink.setAttribute("aria-selected", "false");
            newTabLink.className = "nav-link contact-tab-item";

            // Create the icon
            let iconSpan = document.createElement("span");
            let iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            iconSvg.setAttribute("width", "20");
            iconSvg.setAttribute("height", "20");
            iconSvg.setAttribute("fill", "none");
            iconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            iconSvg.innerHTML = `<path d="M10 2.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm0 1.667A5.833 5.833 0 1010 15a5.833 5.833 0 000-11.666zm.417 3.75v3.333h3.333v1.667h-5V7.917h1.667z" stroke="currentColor" stroke-width="1.667" stroke-linecap="round" stroke-linejoin="round"/>`;
            iconSpan.appendChild(iconSvg);

            // Append elements
            newTabLink.appendChild(iconSpan);
            newTabLink.appendChild(document.createTextNode(" Custom Tab"));
            tabWrapper.appendChild(newTabLink);
            newTabItem.appendChild(tabWrapper);

            // Append the new tab to the tabs container
            tabsContainer.appendChild(newTabItem);

            console.log("✅ Custom tab added successfully!");

            // Stop observing once added
            observer.disconnect();
        }
    });

    // Observe the document for changes
    observer.observe(document.body, { childList: true, subtree: true });
</script>

<script>
const observer = new MutationObserver(() => {
    document.querySelectorAll(".hl-wrapper-container").forEach(el => {
        el.classList.remove("full-screen"); // Remove conflicting class
        el.style.setProperty("background-color", "#1F1F1F", "important");
    });
});

// Observe the entire body for changes
observer.observe(document.body, { childList: true, subtree: true });

console.log("✅ MutationObserver is running to apply background fix.");
