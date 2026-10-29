// Affiche le français ou l'anglais selon la langue du navigateur (ou ?lang=fr / ?lang=en).
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var wanted = new URLSearchParams(location.search).get("lang");
  if (!wanted) {
    try { wanted = localStorage.getItem("tetrapop-lang"); } catch (e) {}
  }
  if (!wanted) {
    wanted = (navigator.language || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }
  function show(lang) {
    if (lang !== "fr") lang = "en";
    root.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.classList.toggle("on", el.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.value === lang ? "true" : "false");
    });
    try { localStorage.setItem("tetrapop-lang", lang); } catch (e) {}
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () { show(b.value); });
    });
    show(wanted);
  });
})();
