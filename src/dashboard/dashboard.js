document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("top-navbar-menu-burger")
    .addEventListener("click", (e) => {
      // console.log('5: ', e.target.dataset.target);
      e.target.classList.toggle("is-active");
      document
        .getElementById(e.target.dataset.target)
        .classList.toggle("is-active");
    });

  document
    .getElementById("sidebar-menu-burger")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("is-active");
      document
        .getElementById(e.target.dataset.target)
        .classList.toggle("is-active");
    });
});
