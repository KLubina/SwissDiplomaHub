/**
 * Study plan controller.
 */

window.StudyPlanController = {
  async start() {
    const studyProgram = document.body.dataset.studiengang;
    if (!studyProgram) return this.fail("Kein Studiengang angegeben.");

    window.StudyPlanView.renderLoading();
    this.loadStyles(studyProgram);

    try {
      const model = await window.StudyPlanModel.load(studyProgram);
      model.modules = this.mapCategories(model.modules, model.categoriesConfig);
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
    const path = encodeURIComponent(studyProgram);
    const colors = document.getElementById("program-colors-css");
    const classes = document.getElementById("program-classes-css");
    if (colors) colors.href = `css/program-specific/${path}/colors.css`;
    if (classes) classes.href = `css/program-specific/${path}/classes.css`;
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
