/**
 * Study plan model access.
 */

window.StudyPlanModel = {
  async load(studyProgram) {
    if (studyProgram.startsWith("rest/")) {
      const path = `model/${studyProgram}.json`;
      return {
        ...(await this.loadJson(path)),
        layout: "legacy-grid",
      };
    }

    const basePath = `model/hf/${encodeURIComponent(studyProgram)}`;
    const [generalConfig, categoriesConfig, modules] = await Promise.all([
      this.loadJson(`${basePath}/general-config.json`),
      this.loadJson(`${basePath}/standardcategories-config.json`),
      this.loadJson(`${basePath}/modules.json`),
    ]);

    if (!Array.isArray(modules)) {
      throw new Error("Die Moduldaten müssen ein Array sein.");
    }

    return { generalConfig, categoriesConfig, modules };
  },

  async loadJson(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`${path} konnte nicht geladen werden (${response.status}).`);
    }
    return response.json();
  },
};
