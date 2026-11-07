/**
 * Study plan controller.
 */

window.StudyPlanController = {
  async start() {
    const studyProgram =
      new URLSearchParams(window.location.search).get("studiengang") ||
      document.body.dataset.studiengang;
    if (!studyProgram) return this.fail("Kein Studiengang angegeben.");

    window.StudyPlanView.renderLoading();
    this.loadStyles(studyProgram);

    try {
      const model = await window.StudyPlanModel.load(studyProgram);
      if (model.layout !== "legacy-grid") {
        model.modules = this.mapCategories(model.modules, model.categoriesConfig);
      }
      window.StudyPlanView.render(model);
    } catch (error) {
      console.error("Studienplan konnte nicht geladen werden:", error);
      this.fail("Der Studienplan konnte nicht geladen werden.");
    }
  },

  mapCategories(modules, config) {
    const categories = new Map(
      (config.kategorien || []).map((category) => [
        category.name,
        category.klasse,
      ]),
    );
    return modules.map((module) => ({
      ...module,
      standardcategory:
        categories.get(module.category) ||
        module.standardcategory ||
        this.simplify(module.category),
    }));
  },

  loadStyles(studyProgram) {
    const isLegacy = studyProgram.startsWith("rest/");
    document.body.classList.toggle("legacy-grid", isLegacy);
    document.body.classList.toggle("modern-study-plan", !isLegacy);
    if (studyProgram.startsWith("rest/")) {
      const stylesheet = document.getElementById("rest-layout-css");
      if (stylesheet) stylesheet.href = "css/program-specific/rest/legacy-grid.css";
      return;
    }

    const stylesheet = document.getElementById("rest-layout-css");
    if (stylesheet) stylesheet.removeAttribute("href");
    const path = encodeURIComponent(studyProgram);
    const colors = document.getElementById("program-colors-css");
    const classes = document.getElementById("program-classes-css");
    if (colors) colors.href = `css/program-specific/hf/${path}/colors.css`;
    if (classes) classes.href = `css/program-specific/hf/${path}/classes.css`;
  },

  simplify(category = "") {
    return category
      .toLowerCase()
      .replace(/obligatorische\s+/g, "")
      .replace(/fächer/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  },

  fail(message) {
    window.StudyPlanView.renderError(message);
  },
};
