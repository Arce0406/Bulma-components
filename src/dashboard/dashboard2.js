document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("top-navbar-menu-burger")
    .addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("is-active");
      document
        .getElementById(e.currentTarget.dataset.target)
        .classList.toggle("is-active");
    });

//   document.getElementById("sidebar-burger").addEventListener("click", (e) => {
//     console.log(e.currentTarget.dataset.target);
//     e.currentTarget.classList.toggle("is-active");
//     document
//       .getElementById(e.currentTarget.dataset.target)
//       .classList.toggle("is-active");      
//   });
});

function sidebar_expand(status){
    if(status){
        document.querySelector('html.has-aside-left').classList.toggle('has-aside-expanded')
    }
}
