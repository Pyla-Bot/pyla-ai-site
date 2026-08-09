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

  /* ===== Boot intro + typed hero ===== */
  var boot = document.getElementById("boot-screen");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var playedKey = "pyla_boot_played";
  var hasPlayed = false;
  try { hasPlayed = sessionStorage.getItem(playedKey) === "1"; } catch (e) { hasPlayed = false; }

  function typeHeading(el, text, speed, done) {
    if (!el) { if (done) done(); return; }
    el.textContent = "";
    var caret = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");
    var textNode = document.createTextNode("");
    el.appendChild(textNode);
    el.appendChild(caret);
    var i = 0;
    function step() {
      if (i <= text.length) {
        textNode.nodeValue = text.slice(0, i);
        i += 1;
        var ch = text.charAt(i - 1);
        var jitter = ch === " " ? speed * 0.4 : 0;
        setTimeout(step, speed + jitter);
      } else {
        el.classList.add("is-done");
        if (done) done();
      }
    }
    step();
  }

  function showLine(line, delay) {
    setTimeout(function () { if (line) line.classList.add("is-shown"); }, delay);
  }

  function fillBar(bar, target, delay, duration, done) {
    setTimeout(function () {
      if (!bar) { if (done) done(); return; }
      bar.style.width = target + "%";
      var t = setTimeout(done, duration);
      // no-op cleanup; duration matches CSS transition
      void t;
    }, delay);
  }

  function runBoot() {
    if (!boot) return;
    var head = boot.querySelector(".boot-head");
    var lines = Array.prototype.slice.call(boot.querySelectorAll(".boot-line"));
    var launch = boot.querySelector(".boot-launch");
    var bar = boot.querySelector(".boot-line[data-bar] .bar > span");
    var hero = document.querySelector(".hero-copy");
    var heroH1 = document.querySelector(".typed-h1");
    var heroText = heroH1 ? heroH1.getAttribute("data-text") || heroH1.textContent.trim() : "Pyla AI";

    showLine(head, 80);
    lines.forEach(function (line, i) {
      showLine(line, 220 + i * 360);
    });
    fillBar(bar, 100, 220, 900, function () {
      var okSpan = boot.querySelector(".boot-line[data-ok] .ok");
      if (okSpan) okSpan.textContent = "[ OK ]";
    });
    showLine(launch, 1700);

    setTimeout(function () {
      boot.classList.add("is-done");
      setTimeout(function () { boot.parentNode && boot.parentNode.removeChild(boot); }, 700);
      if (hero) hero.classList.add("is-ready");
      typeHeading(heroH1, heroText, 70);
    }, 2400);
  }

  if (boot && !reduced) {
    // Lock body scroll while booting
    document.documentElement.classList.add("is-booting");
    document.body.style.overflow = "hidden";
    var finishBoot = function () {
      document.documentElement.classList.remove("is-booting");
      document.body.style.overflow = "";
      try { sessionStorage.setItem(playedKey, "1"); } catch (e) { /* ignore */ }
    };
    if (hasPlayed) {
      // Skip the overlay but still run a quick typed effect on the heading for polish
      boot.parentNode && boot.parentNode.removeChild(boot);
      var hero = document.querySelector(".hero-copy");
      var heroH1 = document.querySelector(".typed-h1");
      var heroText = heroH1 ? (heroH1.getAttribute("data-text") || heroH1.textContent.trim()) : "Pyla AI";
      if (hero) hero.classList.add("is-ready");
      setTimeout(function () { typeHeading(heroH1, heroText, 55, finishBoot); }, 120);
    } else {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(runBoot, 60);
        // finishBoot is invoked when the boot overlay fully exits
      } else {
        document.addEventListener("DOMContentLoaded", function () { setTimeout(runBoot, 60); });
      }
      var mo = new MutationObserver(function () {
        if (!boot.isConnected) { finishBoot(); mo.disconnect(); }
      });
      mo.observe(document.body, { childList: true, subtree: false });
      // Safety fallback in case the observer misses
      setTimeout(finishBoot, 8000);
    }
  } else {
    // No boot screen, or reduced motion: just reveal hero immediately
    var hero = document.querySelector(".hero-copy");
    if (hero) hero.classList.add("is-ready");
    var heroH1 = document.querySelector(".typed-h1");
    if (heroH1) {
      // Pre-fill so the heading still reads correctly without typing
      var t = heroH1.getAttribute("data-text") || heroH1.textContent.trim();
      heroH1.textContent = t;
    }
  }
}());
