window.addEventListener("load", function (event) {
  document
    .getElementById("sidebar-menu-burger")
    .addEventListener("click", (e) => {
      document.body.classList.toggle("is-active");
    });
});