/**
 * Study plan view.
 */

window.StudyPlanView = {
  render(model) {
    this.renderTitle(model.generalConfig);
    this.renderPlan(model.modules);
    this.renderLegend(model.modules, model.categoriesConfig);
    this.updateTotal();
  },

  renderLoading() {
    const container = document.getElementById("studienplan");
    if (container) container.innerHTML = "<p>Lade Studienplan...</p>";
  },

  renderError(message) {
    const container = document.getElementById("studienplan");
    if (!container) return;
    container.innerHTML = "";
    const error = document.createElement("p");
    error.className = "study-plan-error";
    error.textContent = message;
    container.appendChild(error);
  },

  renderTitle(config) {
    const title = document.getElementById("studienplan-title");
    const subtitle = document.getElementById("studienplan-subtitle");
    if (title && config.title) title.textContent = config.title;
    if (subtitle && config.subtitle) subtitle.textContent = config.subtitle;
    if (config.title) document.title = config.title;
  },

  renderPlan(modules) {
    const container = document.getElementById("studienplan");
    if (!container) return;

    const grouped = modules.reduce((years, module) => {
      years[module.year] ??= {};
      years[module.year][module.semester] ??= [];
      years[module.year][module.semester].push(module);
      return years;
    }, {});

    container.innerHTML = Object.keys(grouped)
      .sort((a, b) => Number(a) - Number(b))
      .map((year) => this.renderYear(year, grouped[year]))
      .join("");
  },

  renderYear(year, semesters) {
    return `
      <div class="jahr" data-year="${this.escape(year)}">
        <h3 class="year-title">${this.escape(`${year}. Jahr`)}</h3>
        ${Object.keys(semesters)
          .sort((a, b) => Number(a) - Number(b))
          .map((semester) => this.renderSemester(semester, semesters[semester]))
          .join("")}
      </div>
    `;
  },

  renderSemester(semester, modules) {
    const name =
      Number(semester) % 2 ? "Herbstsemester" : "Frühlingssemester";
    return `
      <div class="semester" data-semester="${this.escape(semester)}">
        <h4 class="semester-title">${name}</h4>
        <div class="module-container">
          ${modules.map((module) => this.renderModule(module)).join("")}
        </div>
      </div>
    `;
  },

  renderModule(module) {
    const value = Number(module.lektionen || module.ects || 0);
    const size = 80 * Math.sqrt(Math.max(value, 1) / 20);
    const category = module.standardcategory || "unknown";
    return `
      <div class="modul ${this.escape(category)}" data-ects="${value}"
           style="width: ${size}px; height: ${size}px;">
        <div class="modul-titel">${this.escape(module.name || "Unbekanntes Modul")}</div>
        <div class="modul-kp">${this.escape(module.einheiten || `${value} L`)}</div>
      </div>
    `;
  },

  renderLegend(modules, config) {
    const container =
      document.getElementById("legende") ||
      document.querySelector(".farben-legende");
    if (!container) return;

    const names = new Map(
      (config.kategorien || []).map((category) => [
        category.klasse,
        category.name,
      ]),
    );
    const categories = [
      ...new Set(modules.map((module) => module.standardcategory).filter(Boolean)),
    ];
    container.innerHTML = `
      <h3>Legende</h3>
      ${categories
        .map(
          (category) => `
            <div class="legende-item ${this.escape(category)}">
              <div class="legende-text">${this.escape(
                names.get(category) || category,
              )}</div>
            </div>
          `,
        )
        .join("")}
    `;
  },

  updateTotal() {
    let counter = document.getElementById("kp-counter");
    if (!counter) {
      const legend = document.getElementById("legende") ||
        document.querySelector(".farben-legende");
      if (!legend) return;
      counter = document.createElement("div");
      counter.id = "kp-counter";
      counter.className = "kp-counter-box";
      legend.appendChild(counter);
    }
    const total = [...document.querySelectorAll(".modul")].reduce(
      (sum, module) => sum + (Number(module.dataset.ects) || 0),
      0,
    );
    counter.innerHTML = `<div id="kp-total">Gesamt: <strong>${total}</strong> (Lektionen / KP)</div>`;
  },

  escape(value) {
    const element = document.createElement("div");
    element.textContent = String(value);
    return element.innerHTML.replace(/"/g, "&quot;");
  },
};
