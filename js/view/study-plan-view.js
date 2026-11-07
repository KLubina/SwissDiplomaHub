/**
 * Study plan view.
 */

window.StudyPlanView = {
  render(model) {
    this.renderTitle(model.generalConfig);
    this.renderLinks(model.generalConfig);
    if (model.layout === "legacy-grid") {
      this.renderLegacyGrid(model);
      return;
    }
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
    config = config || {};
    const title = document.getElementById("studienplan-title");
    const subtitle = document.getElementById("studienplan-subtitle");
    if (title && config.title) title.textContent = config.title;
    if (subtitle && config.subtitle) subtitle.textContent = config.subtitle;
    if (config.title) document.title = config.title;
  },

  renderLinks(config) {
    const container = document.getElementById("studienplan-links");
    if (!container) return;
    const links = config?.links || [];
    container.innerHTML = links
      .map(
        (link) =>
          `<a href="${this.escape(link.url)}" target="_blank" rel="noopener noreferrer">${this.escape(link.label)}</a>`,
      )
      .join(" | ");
    container.hidden = links.length === 0;
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

  renderLegacyGrid(model) {
    const container = document.getElementById("studienplan");
    if (!container) return;

    container.innerHTML = `
      ${model.infoUrl ? `<div class="info-text">Für ausführlichere Infos zu den einzelnen Modulen besuchen Sie die Seite <a href="${this.escape(model.infoUrl)}" target="_blank" rel="noopener noreferrer">modulbaukasten.ch</a>.</div>` : ""}
      ${model.sections.map((section) => `
        ${section.name ? `<div class="semester-bar">${this.escape(section.name)}</div>` : ""}
        <div class="content-row">
          ${section.columns.map((column) => `
            <div class="column">
              ${column.modules
                .map((module) => this.renderLegacyModule(module, column.styleClass))
                .join("")}
              ${column.label ? `<div class="box label-box ${this.escape(column.styleClass)}">${this.escape(column.label)}</div>` : ""}
            </div>
          `).join("")}
        </div>
      `).join("")}
    `;
  },

  renderLegacyModule(module, columnStyleClass) {
    const content = this.escape(module.name).replace(/\s*\n\s*/g, " ");
    const classes = `${module.styleClass || ""} ${columnStyleClass || ""}`.trim();
    const element = module.url
      ? `<a class="box ${this.escape(classes)}" href="${this.escape(module.url)}" target="_blank" rel="noopener noreferrer">${content}</a>`
      : `<div class="box ${this.escape(classes)}">${content}</div>`;
    return element;
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
           style="--module-size: ${size}px;">
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
