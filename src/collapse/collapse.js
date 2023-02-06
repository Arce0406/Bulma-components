document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".is-collapse-button").forEach((e) => {
    e.addEventListener("click", ()=>{
        if(!e.dataset.target){
            console.log('Please specify "data-target".');
            return;
        }
        const target = document.getElementById(e.dataset.target);        
        // console.log(target.classList.contains('is-active'), e.children.item(0).textContent);
        if (target.classList.contains('is-active')) {
            e.children.item(0).textContent = 'expand_less';
            target.dataset.expanded = false;
            target.classList.toggle('is-active');
        } else {
            e.children.item(0).textContent = 'expand_more';
            target.dataset.expanded = true;
            target.classList.toggle('is-active');
        }
    });
  });
});
