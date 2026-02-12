/**
 * MODULE RENDERING - Modul-Darstellung
 */

window.StudienplanModule = {
  // Erstelle HTML für ein einzelnes Modul
  renderModule(module) {
    const ects = module.ects || 0;
    // User provided "Lektionen", not ECTS.
    // I will map "Lektionen" to "ects" property in data, or use lektionen property if present.
    // But for size calculation, I need a number.

    const sizeValue = module.lektionen || module.ects || 0;

    const category = module.standardcategory || "unknown";
    const name = module.name || "Unbekanntes Modul";

    // Berechne Größe basierend auf Wert (4 ECTS = 100px approx, or 20 Lektionen = 100px?)
    // Let's assume 1 ECTS ~ 25-30 hours work, but lesson count is usually smaller.
    // User said "module grösse proportional sind".
    // Base size 100px for some unit.
    // If lektionen: 16, 24, 60.
    // Maybe sqrt(lektionen / 10) * 100?
    // sqrt(16/10) = 1.26 * 100 = 126px
    // sqrt(60/10) = 2.44 * 100 = 244px (quite big)

    // Let's stick to sqrt mapping for proportionality.
    // The original code used: const scale = Math.sqrt(ects / 4);

    // If I use lektionen as is:
    // Lektionen range 8 to 60.
    // 8 -> sqrt(8) ~ 2.8
    // 60 -> sqrt(60) ~ 7.7
    // Size difference 2.8x.

    // Let's use a factor.
    const factor = 20; // 20 lektionen = base size
    const scale = Math.sqrt(sizeValue / factor);
    const baseSize = 80; // slightly smaller base
    const size = baseSize * scale;

    const style = `width: ${size}px; height: ${size}px;`;

    return `
            <div class="modul ${category}" data-ects="${sizeValue}" style="${style}">
                <div class="modul-titel">${name}</div>
                <div class="modul-kp">${sizeValue} L</div>
            </div>
        `;
  },

  // Erstelle HTML für eine Semester-Liste von Modulen
  renderSemesterModules(modules) {
    return modules.map((module) => this.renderModule(module)).join("");
  },
};

// Markiere als geladen
window.subModulesReady.module = Promise.resolve();
