document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".has-subnav > a");

  navLinks.forEach((link) => {
    const subNav = document.getElementById(link.getAttribute("aria-controls"));

    link.addEventListener("focusin", () => {
      link.setAttribute("aria-expanded", "true");
      subNav.hidden = false;
    });

    link.addEventListener("blur", () => {
      setTimeout(() => {
        if (
          !document.activeElement.closest(".has-subnav") &&
          !subNav.contains(document.activeElement)
        ) {
          link.setAttribute("aria-expanded", "false");
          subNav.hidden = true;
        }
      }, 0);
    });
  });

  document.addEventListener("focusin", (event) => {
    navLinks.forEach((link) => {
      const subNav = document.getElementById(
        link.getAttribute("aria-controls")
      );
      if (!link.contains(event.target) && !subNav.contains(event.target)) {
        link.setAttribute("aria-expanded", "false");
        subNav.hidden = true;
      }
    });
  });
});
