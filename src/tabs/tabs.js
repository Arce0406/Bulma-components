document.addEventListener("DOMContentLoaded", () => {
  
  function on_tab_click(tab, tab_contents) {
    tab.querySelectorAll("ul li").forEach((li) => {
      const index = Array.prototype.indexOf.call(li.parentElement.children, li);
      li.addEventListener("click", () => {
        tab_contents.querySelectorAll(".tab-content").forEach((t) => {
          t.classList.remove("is-active");
        });
        tab_contents.children.item(index).classList.add("is-active");
      });
    });
  }

  /**
   * 【Way 1】
   * 使用 tabs、tab-contents 的子項目索引進行mapping，需要指定 data-contents
   * tabs > ul > li 的 index，需要與 tab-contents > tab-content 的 index 一致。
   */
  // document.querySelectorAll(".tabs").forEach((tab) => {
  //   if (!tab.dataset.contents) return;
  //   const tab_contents = document.getElementById(tab.dataset.contents);
  //   if (!tab_contents) return;
  //   on_tab_click(tab, tab_contents);
  // });

  /**
   * 【Way 2】
   * Use element.nextElementSibling to get '.tab-content'.
   * (element.nextSibling will include text with space, not good for compiler formatter)
   * No need 'data-contents', but '.tabs' and '.tab-content' must be neighbouring.
   */
  document.querySelectorAll(".tabs").forEach((tab) => {
    const tab_contents = tab.nextElementSibling;
    if (!tab_contents) return;
    on_tab_click(tab, tab_contents);
  });
});
