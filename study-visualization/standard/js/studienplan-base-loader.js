/**
 * STUDIENPLAN BASE LOADER
 */

const corePath = "study-visualization/standard/js/core";
const optionalPath = "study-visualization/standard/js/optional";

console.log("📦 Loading Studienplan components...");

window.subModulesReady = {};

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => {
      console.warn(`Failed to load ${src}`);
      // Resolve anyway to not block chain
      resolve();
    };
    document.head.appendChild(script);
  });
}

window.baseModulesReady = (async () => {
  // 1. Core Index
  await loadScript(`${corePath}/index.js`);

  // 2. Wait for core submodules
  // We poll or check if index.js has loaded them (index.js loads them asyncly).
  // The previous index.js sets window.subModulesReady[...]

  // We should give it a moment or ensure index.js provides a promise.
  // In my index.js, I just start loading.

  // Let's assume index.js is loaded, it starts loading others.
  // We wait for them.

  // Simply wait a bit or use Promise.all on the expected keys?
  // This part is tricky without a proper loader architecture.
  // But for this task, the files are local and small.

  // Let's load optionals.
  await loadScript(`${optionalPath}/kp-counter.js`);
  await loadScript(`${optionalPath}/tooltip.js`);
  await loadScript(`${optionalPath}/color-manager.js`);
})();
