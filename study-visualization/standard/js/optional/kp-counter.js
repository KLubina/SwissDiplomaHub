/**
 * KP COUNTER - Optionale KP-Zähl-Funktionalität
 */

window.StudienplanKPCounter = {
  initialize() {
    if (this._initialized) return;
    this._initialized = true;
    this.createCounterBox();
    this.updateTotalKP();
    this.startMutationObserver();
  },

  createCounterBox() {
    if (document.getElementById("kp-counter")) return;

    const counterBox = document.createElement("div");
    counterBox.id = "kp-counter";
    counterBox.className = "kp-counter-box";

    const legendeContainer =
      document.querySelector(".farben-legende") ||
      document.getElementById("legende");
    if (legendeContainer) {
      legendeContainer.appendChild(counterBox);
    }
  },

  updateTotalKP() {
    const modules = document.querySelectorAll(".modul");
    let total = 0;

    modules.forEach((module) => {
      const val = parseInt(module.dataset.ects) || 0;
      total += val;
    });

    const counterBox = document.getElementById("kp-counter");
    if (counterBox) {
      // Using generic label or checking config?
      // User input has "Lektionen". 'KP' usually assumes ECTS.
      // But let's just display the number.
      counterBox.innerHTML = `<div id="kp-total">Gesamt: <strong>${total}</strong> (Lektionen / KP)</div>`;
    }
  },

  startMutationObserver() {
    if (this._observer) return;
    const observer = new MutationObserver((mutations) => {
      if (this._debounceTimer) clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => {
        this.updateTotalKP();
      }, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    this._observer = observer;
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () =>
    window.StudienplanKPCounter.initialize(),
  );
} else {
  window.StudienplanKPCounter.initialize();
}

window.subModulesReady["kp-counter"] = Promise.resolve();
