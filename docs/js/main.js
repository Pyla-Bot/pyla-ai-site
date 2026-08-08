(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector("#nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
    });
  });

  var sidebarToggle = document.querySelector(".sidebar-toggle");
  var docsSidebar = document.querySelector("#docs-sidebar");
  if (sidebarToggle && docsSidebar) {
    sidebarToggle.addEventListener("click", function () {
      var isOpen = docsSidebar.classList.toggle("is-open");
      sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var docSearch = document.querySelector("#doc-search");
  if (docSearch) {
    var sections = Array.prototype.slice.call(document.querySelectorAll(".doc-section"));
    var noResults = document.querySelector(".no-results");
    docSearch.addEventListener("input", function () {
      var query = docSearch.value.trim().toLowerCase();
      var visibleCount = 0;
      sections.forEach(function (section) {
        var match = !query || section.textContent.toLowerCase().indexOf(query) !== -1;
        section.hidden = !match;
        if (match) visibleCount += 1;
      });
      if (noResults) noResults.hidden = visibleCount !== 0;
    });
  }

  document.querySelectorAll("[data-placeholder-form]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      var form = button.closest("form");
      var note = form ? form.querySelector(".form-note") : null;
      if (note) note.textContent = "Placeholder only: no data was submitted.";
    });
  });

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
}());
