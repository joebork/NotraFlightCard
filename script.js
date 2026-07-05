// NOTRA Flight Card — interactive behavior (vanilla JS, no dependencies)

(function () {
  "use strict";

  // Print / Save PDF
  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // Date: mark empty so it prints as a blank line (no mm/dd/yyyy placeholder)
  const dateInput = document.querySelector('input[type="date"]');
  function syncDateEmpty() {
    if (dateInput) dateInput.classList.toggle("empty", dateInput.value === "");
  }
  if (dateInput) {
    dateInput.addEventListener("input", syncDateEmpty);
    dateInput.addEventListener("change", syncDateEmpty);
  }
  window.addEventListener("beforeprint", syncDateEmpty);
  syncDateEmpty();

  // Rod/Rail: dropdown drives which static value is outlined
  const rodrailSelect = document.getElementById("rodrailSelect");

  function applyRodRail(value) {
    document.querySelectorAll(".rodrail-value").forEach((el) => {
      el.classList.toggle("selected", el.dataset.value === value);
    });
  }
  if (rodrailSelect) {
    rodrailSelect.addEventListener("change", function () {
      applyRodRail(rodrailSelect.value);
    });
  }

  // Clear all fields
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (!window.confirm("Clear all fields on this card?")) return;
      document
        .querySelectorAll('input[type="text"], input[type="date"]')
        .forEach((el) => (el.value = ""));
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((el) => (el.checked = false));
      if (rodrailSelect) rodrailSelect.value = "";
      applyRodRail("");
      syncDateEmpty();
    });
  }
})();
