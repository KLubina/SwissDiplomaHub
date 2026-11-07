/**
 * CONFIG LOADER - Lädt Studiengang-Konfiguration und Daten
 */

window.StudienplanConfigLoader = {
  async loadStudiengangConfig(studiengang) {
    try {
      const basePath = `model/${studiengang}`;
      const [generalConfig, categoriesConfig, modules] = await Promise.all([
        this.loadJson(`${basePath}/general-config.json`),
        this.loadJson(`${basePath}/standardcategories-config.json`),
        this.loadJson(`${basePath}/modules.json`),
      ]);

      window.StudiengangGeneralConfig = generalConfig;
      window.StudiengangCategoriesConfig = categoriesConfig;
      window.studiengangModules = modules;
      this.renderStudiengang(modules, studiengang);
    } catch (error) {
      console.error(`Error loading study program "${studiengang}":`, error);
    }
  },

  async loadJson(src) {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`Could not load ${src} (${response.status})`);
    }
    return response.json();
  },

  renderStudiengang(modules, studiengang) {
    const mappedModules = this.mapCategoriesToClasses(modules);
    const grouped =
      window.StudienplanUtils.groupModulesByYearAndSemester(mappedModules);

    window.StudienplanLayout.renderLayout(grouped);

    const categories =
      window.StudienplanUtils.getUniqueCategories(mappedModules);
    window.StudienplanLegend.renderLegend(categories);

    this.setTitles(studiengang);

    if (window.StudienplanKPCounter)
      window.StudienplanKPCounter.updateTotalKP();

    console.log("Studienplan gerendert für:", studiengang);
  },

  mapCategoriesToClasses(modules) {
    const categoryMap = {};
    if (window.StudiengangCategoriesConfig?.kategorien) {
      window.StudiengangCategoriesConfig.kategorien.forEach((cat) => {
        categoryMap[cat.name] = cat.klasse;
      });
    }

    return modules.map((module) => ({
      ...module,
      standardcategory:
        categoryMap[module.category] ||
        this.simplifyCategory(module.category || "") ||
        module.standardcategory,
    }));
  },

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

  setTitles() {
    const titleElement = document.getElementById("studienplan-title");
    const subtitleElement = document.getElementById("studienplan-subtitle");
    const config = window.StudiengangGeneralConfig;

    if (config?.title && titleElement) titleElement.textContent = config.title;
    if (config?.subtitle && subtitleElement)
      subtitleElement.textContent = config.subtitle;
  },

  getStudiengangName(studiengang) {
    return studiengang.toUpperCase();
  },
};

window.loadStudiengangConfig =
  window.StudienplanConfigLoader.loadStudiengangConfig.bind(
    window.StudienplanConfigLoader,
  );

window.subModulesReady.configLoader = Promise.resolve();
