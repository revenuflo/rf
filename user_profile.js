// Shared menu items array to prevent duplication
const submenuItems = [
  {
    text: "Profile",
    href: "/v2/location/F7UgFDXmYhmt4WMeMjzs/settings/profile",
    id: "sb-user-sub-1",
    icon: "https://storage.googleapis.com/msgsndr/F7UgFDXmYhmt4WMeMjzs/media/67dfc5614bc20a31540c6080.svg"
  },
  {
    text: "Log Out",
    href: "#signout",
    id: "sb-user-sub-2",
    icon: "https://storage.googleapis.com/msgsndr/F7UgFDXmYhmt4WMeMjzs/media/67dfc5614bc20a31540c6080.svg"
  }
];

// Create a mutation observer to watch for DOM changes
const sidebarCustomizationObserver = new MutationObserver(() => {
  const appMarketplaceItem = document.getElementById("sb_app-marketplace");
  const settingsItem = document.getElementById("sb_settings");
  const headerAvatar = document.querySelector(".hl_header--avatar .avatar");
  const headerUsername = document.querySelector(".hl_header--dropdown .dropdown-menu .text-gray-900");

  if (!appMarketplaceItem || !settingsItem || !headerAvatar || !headerUsername) return;

  if (document.getElementById("sb_user-profile")) {
    console.log("⚠️ Sidebar customization already applied. Disconnecting observer.");
    sidebarCustomizationObserver.disconnect();
    return;
  }

  console.log("✅ All required elements found! Starting sidebar customization...");

  try {
    const navContainer = document.querySelector("#sidebar-v2 nav");
    if (!navContainer) return;

    const settingsClone = settingsItem.cloneNode(true);
    settingsClone.id = "sb_settings_moved";
    appMarketplaceItem.parentNode.replaceChild(settingsClone, appMarketplaceItem);

    const userProfileItem = document.createElement("a");
    userProfileItem.href = "#";
    userProfileItem.id = "sb_user-profile";
    userProfileItem.className = settingsItem.className;
    userProfileItem.setAttribute("meta", "user-profile");
    userProfileItem.setAttribute("exact-path-active-class", settingsItem.getAttribute("exact-path-active-class"));

    const avatarImgEl = headerAvatar.querySelector("img");
    if (!avatarImgEl) return;

    const avatarImg = document.createElement("img");
    avatarImg.src = avatarImgEl.src;
    avatarImg.className = "md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2";
    avatarImg.style.borderRadius = "50%";
    avatarImg.style.objectFit = "cover";

    const usernameSpan = document.createElement("span");
    usernameSpan.className = "hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block";
    usernameSpan.textContent = headerUsername.textContent.trim();

    const dropdownIcon = document.createElement("i");
    dropdownIcon.className = "ml-auto fas fa-angle-down transition-transform duration-300";

    userProfileItem.appendChild(avatarImg);
    userProfileItem.appendChild(usernameSpan);
    userProfileItem.appendChild(dropdownIcon);

    const userProfileMenu = document.createElement("div");
    userProfileMenu.id = "sb_user-profile_menu";
    userProfileMenu.className = "w-full flex flex-row";
    userProfileMenu.style.display = "none";
    userProfileMenu.style.paddingLeft = "10px";
    userProfileMenu.style.justifyContent = "center";
    userProfileMenu.style.gap = "10px";

    submenuItems.forEach(item => {
      const submenuLink = document.createElement("a");
      submenuLink.href = item.href;
      submenuLink.id = item.id;
      submenuLink.setAttribute("meta", "user-submenu");
      submenuLink.className = "flex flex-col items-center justify-center px-4 py-2 rounded-md cursor-pointer opacity-70 hover:opacity-100";

      const iconImg = document.createElement("img");
      iconImg.src = item.icon;
      iconImg.alt = item.text + " icon";
      iconImg.className = "w-5 h-5 mb-1";

      const textSpan = document.createElement("span");
      textSpan.className = "text-xs font-medium";
      textSpan.innerText = item.text;

      submenuLink.append(iconImg, textSpan);

      if (item.id === "sb-user-sub-2") {
        submenuLink.addEventListener("click", function (event) {
          event.preventDefault();
          const signOutLink = document.querySelector(".hl_header--dropdown .dropdown-menu .dropdown-item:last-child");
          if (signOutLink) signOutLink.click();
        });
      } else {
        submenuLink.addEventListener("click", function (event) {
          event.preventDefault();
          setTimeout(() => {
            history.pushState({ key: Date.now() }, '', submenuLink.href);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }, 100);
        });
      }

      userProfileMenu.appendChild(submenuLink);
    });

    settingsItem.parentNode.replaceChild(userProfileItem, settingsItem);
    userProfileItem.parentNode.insertBefore(userProfileMenu, userProfileItem.nextSibling);

    userProfileItem.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      const isVisible = userProfileMenu.style.display === "flex";
      userProfileMenu.style.display = isVisible ? "none" : "flex";
      dropdownIcon.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
    };

    const styleElement = document.createElement("style");
    styleElement.textContent = `
      #sb_user-profile img {
        width: 2rem !important;
        height: 2rem !important;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 8px;
        display: inline-block;
        vertical-align: middle;
      }
      #sb_user-profile {
        display: flex;
        align-items: center;
      }
      #sb_user-profile .hl_text-overflow {
        margin-left: 8px;
      }
      #sb_user-profile_menu {
        transition: all 0.3s ease;
        padding: 10px;
      }
      #sb_user-profile_menu a {
        transition: all 0.2s ease;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        width: 80px;
      }
      #sb_user-profile_menu a:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(styleElement);

    document.addEventListener("click", function (event) {
      if (!userProfileItem.contains(event.target) && !userProfileMenu.contains(event.target)) {
        userProfileMenu.style.display = "none";
        dropdownIcon.style.transform = "rotate(0deg)";
      }
    }, { passive: true });

    sidebarCustomizationObserver.disconnect();
  } catch (error) {
    console.error("❌ Error during sidebar customization:", error);
  }
});

// Observe sidebar container instead of entire body (optional improvement)
const sidebarContainer = document.querySelector("#sidebar-v2") || document.body;
sidebarCustomizationObserver.observe(sidebarContainer, {
  childList: true,
  subtree: true
});

// Fallback after full page load
window.addEventListener("load", function () {
  setTimeout(function () {
    const userProfileItem = document.getElementById("sb_user-profile");
    let userProfileMenu = document.getElementById("sb_user-profile_menu");

    if (userProfileItem && (!userProfileMenu || userProfileMenu.previousElementSibling !== userProfileItem)) {
      console.log("🔄 Fixing user profile dropdown menu positioning...");
      if (userProfileMenu) userProfileMenu.remove();

      userProfileMenu = document.createElement("div");
      userProfileMenu.id = "sb_user-profile_menu";
      userProfileMenu.className = "w-full flex flex-row justify-center gap-2";
      userProfileMenu.style.display = "none";
      userProfileMenu.style.padding = "10px";

      submenuItems.forEach(item => {
        const menuLink = document.createElement("a");
        menuLink.href = item.href;
        menuLink.id = item.id;
        menuLink.className = "flex flex-col items-center justify-center px-4 py-2 rounded-md cursor-pointer opacity-70 hover:opacity-100 bg-opacity-5 bg-white w-20";

        const iconImg = document.createElement("img");
        iconImg.src = item.icon;
        iconImg.alt = item.text + " icon";
        iconImg.className = "w-5 h-5 mb-1";

        const textSpan = document.createElement("span");
        textSpan.className = "text-xs font-medium";
        textSpan.innerText = item.text;

        menuLink.append(iconImg, textSpan);

        if (item.id === "sb-user-sub-2") {
          menuLink.onclick = function (e) {
            e.preventDefault();
            const signOut = document.querySelector(".hl_header--dropdown .dropdown-menu .dropdown-item:last-child");
            if (signOut) signOut.click();
          };
        } else {
          menuLink.onclick = function (e) {
            e.preventDefault();
            setTimeout(() => {
              history.pushState({ key: Date.now() }, '', menuLink.href);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }, 100);
          };
        }

        userProfileMenu.appendChild(menuLink);
      });

      userProfileItem.parentNode.insertBefore(userProfileMenu, userProfileItem.nextSibling);

      let dropdownIcon = userProfileItem.querySelector(".fa-angle-down");
      if (!dropdownIcon) {
        dropdownIcon = document.createElement("i");
        dropdownIcon.className = "ml-auto fas fa-angle-down transition-transform duration-300";
        userProfileItem.appendChild(dropdownIcon);
      }

      userProfileItem.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isVisible = userProfileMenu.style.display === "flex";
        userProfileMenu.style.display = isVisible ? "none" : "flex";
        dropdownIcon.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
      };

      console.log("✅ User profile dropdown menu positioning fixed!");
    }
  }, 3000);
});
