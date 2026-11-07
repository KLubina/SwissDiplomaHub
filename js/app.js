/**
 * Study plan application entry point.
 */

(async () => {
  try {
    await Promise.all([
      loadScript("js/data/study-plan-model.js"),
      loadScript("js/view/study-plan-view.js"),
    ]);
    await loadScript("js/controller/study-plan-controller.js");
    await window.StudyPlanController.start();
  } catch (error) {
    console.error("Studienplan-Anwendung konnte nicht gestartet werden:", error);
  }
})();

function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = path;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Fehler beim Laden von ${path}`));
    document.head.appendChild(script);
  });
}
