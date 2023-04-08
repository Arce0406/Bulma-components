document.addEventListener("DOMContentLoaded", function () {
    navbar_burger();
});

function navbar_burger() {
    (document.querySelectorAll(".navbar-burger") || []).forEach(b => {
        b.addEventListener("click", function (e) {
            const target = e.currentTarget.dataset.target;
            if (!target) return;
            e.currentTarget.classList.toggle("is-active");
            document.getElementById(target).classList.toggle("is-active");
        });
    });

}