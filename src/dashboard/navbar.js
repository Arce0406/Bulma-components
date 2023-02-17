document.addEventListener("DOMContentLoaded", () => {
  // navbar
  document
    .getElementById("top-navbar-menu-burger")
    .addEventListener("click", (e) => {
      // console.log('5: ', e.target.dataset.target);
      e.currentTarget.classList.toggle("is-active");
      document
        .getElementById(e.currentTarget.dataset.target)
        .classList.toggle("is-active");
    });

  // tab-panel content
  document.querySelectorAll(".is-collapse-button").forEach((e) => {
    e.addEventListener("click", () => {
      const target = e.parentElement.parentElement.querySelector(
        ".is-collapse-content"
      );
      if (target.classList.contains("is-active")) {
        target.style.height = 0;
        e.children.item(0).textContent = "expand_more";
        target.dataset.expanded = false;
        target.classList.toggle("is-active");
      } else {
        target.style.height = target.scrollHeight + "px";
        e.children.item(0).textContent = "expand_less";
        target.dataset.expanded = true;
        target.classList.toggle("is-active");
      }
    });
  });
});
