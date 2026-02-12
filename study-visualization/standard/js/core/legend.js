/**
 * LEGEND - Farben-Legende
 */

window.StudienplanLegend = {
  // Erstelle Legende basierend auf Kategorien
  renderLegend(categories) {
    const legendContainer = document.getElementById("legende"); // Should be 'farben-legende' usually?
    // Attachment text says 'legende' or 'farben-legende'?
    // The attached HTML template has <div class="farben-legende"> but attachment says getElementById('legende').
    // I should probably fix this to match the HTML template or add the ID to HTML.
    // Let's use querySelector('.farben-legende') if getElementById fails.
    const legendContainerEl =
      document.getElementById("legende") ||
      document.querySelector(".farben-legende");

    if (!legendContainerEl) return;

    const uniqueCategories = Array.from(new Set(categories));

    const legendHTML = uniqueCategories
      .map(
        (category) => `
            <div class="legende-item ${category}">
                <div class="legende-text">${this.getCategoryName(category)}</div>
            </div>
        `,
      )
      .join("");

    legendContainerEl.innerHTML = legendHTML;
  },

  // Übersetze Kategorie-Namen
  getCategoryName(category) {
    if (
      window.StudiengangCategoriesConfig &&
      window.StudiengangCategoriesConfig.kategorien
    ) {
      const cat = window.StudiengangCategoriesConfig.kategorien.find(
        (c) => c.klasse === category,
      );
      if (cat) return cat.name;
    }
    return category; // Fallback
  },
};

// Markiere als geladen
window.subModulesReady.legend = Promise.resolve();
