/**
 * 使用 tabs、tab-contents 的子項目索引進行mapping。
 * tabs > ul > li 的 index，需要與 tab-contents > tab-content 的 index 一致。
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tabs").forEach((tabs) => {
    if(!tabs.dataset.contents) return;
    const tab_contents = document.getElementById(tabs.dataset.contents);
    tabs.querySelectorAll("ul li").forEach((li) => {    
      const index = Array.prototype.indexOf.call(li.parentElement.children, li);
      li.addEventListener("click", () => {        
        tab_contents.querySelectorAll(".tab-content").forEach((t) => {
          console.log(t);
          t.classList.remove("is-active");
        });
        tab_contents.children.item(index).classList.add("is-active");
      });
    });
  });
});
