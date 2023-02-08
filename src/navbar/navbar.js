document.addEventListener("DOMContentLoaded", () => {
  // Add a click event on each of them
  document.querySelectorAll(".navbar-icon-burger").forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.toggle("is-active");
      document.getElementById(e.dataset.target).classList.toggle("is-active");
    });
  });
});
