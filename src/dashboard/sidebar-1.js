document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("sidebar-menu-burger")
    .addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("is-active");
      document
        .getElementById(e.currentTarget.dataset.target)
        .classList.toggle("is-active");
    });
});
