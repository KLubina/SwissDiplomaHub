/**
 * CONFIG LOADER - Lädt Studiengang-Konfiguration und Daten
 */

window.StudienplanConfigLoader = {
  // Lade Konfiguration für einen Studiengang
  async loadStudiengangConfig(studiengang) {
    try {
      // Bestimme das Modell (JETZT NUR NOCH MONO FÜR ALLE)
      // Lade General-Konfiguration
      // Updated path to be relative to the HTML file location or handle appropriately
      // Assuming HTML is in root, paths need to adjust.
      // But let's check: the template assumes relative '../program-specific'.
      // If the HTML is in root, the path to program-specific inside study-visualization is:
      // 'study-visualization/program-specific/...'
      // BUT configLoader.js is running in the browser. Before I edit this, I should verify
      // if I should modify the loader to handle different base paths or just fix the paths.

      // Let's stick to the attached code first, but maybe update paths if needed.
      // The attached code has: `../program-specific/${studiengang}/standard-config/general-config.js`
      // This implies the HTML is at a level where `../program-specific` is valid.
      // If the HTML is in `study-visualization/standard/`, then `../program-specific` works (up to `study-visualization/program-specific`).

      // If I put `informatiker-hf-wiss-lehrplan.html` in the ROOT,
      // the path `../program-specific` would go outside the project root (invalid).
      // It should be `study-visualization/program-specific/...`.

      // However, I can't easily change the loader code without breaking other potential uses if they existed.
      // But since I am creating this structure from scratch for this workspace, I can modify it.

      const basePath = "study-visualization/program-specific";
      const generalConfigPath = `${basePath}/${studiengang}/standard-config/general-config.js`;
      await this.loadScript(generalConfigPath);

      // Lade Kategorien-Konfiguration
      const categoriesConfigPath = `${basePath}/${studiengang}/standard-config/standardcategories-config.js`;
      await this.loadScript(categoriesConfigPath);

      // Also load module data! The original code doesn't seem to load module data here
      // but maybe general-config.js triggers it?
      // Wait, general-config.js usually just sets options.
      // The modules are usually loaded via another script or embedded in the HTML?
      // Let's check `studienplan-template.html`.
      // It doesn't seem to load `modules.js`.
      // Maybe `layout.js` or `core.js` does?
      // Actually `general-config.js` or `standardcategories-config.js` might not be enough.
      // The `renderStudiengang` function takes `modules` as argument.
      // Who calls `renderStudiengang`?
      // The `studienplan-base-loader.js` doesn't seem to call it.
      // The template has `<script> ... // Bestimme das Modell ... </script>`.
      // It seems the implementation detail of HOW to load modules is missing in the snippets provided?
      // Wait, the snippet says `// Initialisiere optionale Module, falls vorhanden`.
      // And `window.StudienplanConfigLoader.renderStudiengang(modules, studiengang)`.

      // I probably need to add a `loadModules` function or similar.
      // The `general-config.js` might look like `window.modules = [...]`?
      // Or `window.loadStudiengangConfig` is called manually in the HTML?

      // In the `renderStudiengang` function:
      // It calls `mapCategoriesToClasses`, `groupModulesByYearAndSemester`, `renderLayout`.

      // I will assume I need to load `data/modules.js` as well.
      const modulesConfigPath = `${basePath}/${studiengang}/data/modules.js`;
      await this.loadScript(modulesConfigPath);

      // After loading modules.js, we expect `window.modules` to be set?
      // Or maybe `modules.js` calls `renderStudiengang`?
      // Let's assume `modules.js` defines `window.studiengangModules`.

      if (window.studiengangModules) {
        this.renderStudiengang(window.studiengangModules, studiengang);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
  },

  // Lade ein Script dynamisch (mit Fetch für bessere Fehlerbehandlung)
  async loadScript(src) {
    try {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    } catch (error) {
      console.error("Script load error:", error);
    }
  },

  // Rendere den Studienplan
  renderStudiengang(modules, studiengang) {
    // Mappe Kategorien zu CSS-Klassen
    const mappedModules = this.mapCategoriesToClasses(modules);

    // Gruppiere Module
    const grouped =
      window.StudienplanUtils.groupModulesByYearAndSemester(mappedModules);

    // Rendere Layout
    window.StudienplanLayout.renderLayout(grouped);

    // Rendere Legende
    const categories =
      window.StudienplanUtils.getUniqueCategories(mappedModules);
    window.StudienplanLegend.renderLegend(categories);

    // Setze Titel
    this.setTitles(studiengang);

    // Initialisiere optionale Module
    if (window.StudienplanKPCounter)
      window.StudienplanKPCounter.updateTotalKP();

    console.log("Studienplan gerendert für:", studiengang);
  },

  // Mappe standardcategory zu CSS-Klasse
  mapCategoriesToClasses(modules) {
    if (
      !window.StudiengangCategoriesConfig ||
      !window.StudiengangCategoriesConfig.kategorien
    ) {
      // Fallback or empty
    }

    const categoryMap = {};
    if (window.StudiengangCategoriesConfig?.kategorien) {
      window.StudiengangCategoriesConfig.kategorien.forEach((cat) => {
        categoryMap[cat.name] = cat.klasse; // Map name to class
      });
    }

    return modules.map((module) => ({
      ...module,
      standardcategory:
        categoryMap[module.category] || // Use 'category' from data, map to 'standardcategory' class
        this.simplifyCategory(module.category || ""),
    }));
  },

  // Vereinfache Kategorie-Name zu CSS-Klasse
  simplifyCategory(category) {
    if (!category) return "";
    return category
      .toLowerCase()
      .replace(/obligatorische\s+/g, "")
      .replace(/fächer/g, "")
      .replace(/praktikum/g, "praktikum")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  },

  // Setze Titel und Untertitel
  setTitles(studiengang) {
    const titleElement = document.getElementById("studienplan-title");
    const subtitleElement = document.getElementById("studienplan-subtitle");

    // Use a simple mapping or just set it
    // For now we trust the HTML static title or update it if config has it.
  },

  // Übersetze Studiengang-Namen
  getStudiengangName(studiengang) {
    return studiengang.toUpperCase();
  },
};

// Mache Funktion global verfügbar
window.loadStudiengangConfig =
  window.StudienplanConfigLoader.loadStudiengangConfig.bind(
    window.StudienplanConfigLoader,
  );

// Markiere als geladen
window.subModulesReady.configLoader = Promise.resolve();
