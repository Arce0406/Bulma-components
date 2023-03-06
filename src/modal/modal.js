function closeModal($el) {
  $el.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

function openModal($el) {
  // modal
  $el.classList.add("is-active");
}

function modalLoaded() {
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".modal-button") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button:is(.btn-cancel)"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.key === 'Escape') {
      // Escape key
      closeAllModals();
    }
  });
}

// document.addEventListener("DOMContentLoaded", () => {});

export {
  modalLoaded,
  closeAllModals,
  openModal,
};
