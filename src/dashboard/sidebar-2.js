import * as modal from "../modal/modal.js";

function load() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading...");
    sidebar_init();
    modal.modalLoaded();
  });
}

function sidebar_init() {
  document
    .getElementById("sidebar-menu-burger")
    .addEventListener("click", (e) => {
      //
      e.currentTarget.classList.toggle("is-active");
      //
      document
        .getElementById(e.currentTarget.dataset.target)
        .classList.toggle("is-active");
      //
      document
        .getElementById(e.currentTarget.dataset.brand)
        .classList.toggle("is-active");
      //
      document
        .getElementById(e.currentTarget.dataset.content)
        .classList.toggle("is-active");
    });
}

load();