document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("top-navbar-menu-burger")
    .addEventListener("click", (e) => {
      // console.log('5: ', e.target.dataset.target);
      e.currentTarget.classList.toggle("is-active");
      document
        .getElementById(e.currentTarget.dataset.target)
        .classList.toggle("is-active");
    });

  document
    .getElementById("sidebar-menu-burger")
    .addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("is-active");
      document
        .getElementById(e.currentTarget.dataset.target)
        .classList.toggle("is-active");
    });
});
