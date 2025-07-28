const fs = require('fs');
const path = require('path');

const allureResultsDir = path.join(__dirname, 'reports', 'allure-results');

// Crea la carpeta si no existe
if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir, { recursive: true });
}

// === ENVIRONMENT.PROPERTIES ===
const environmentContent = `
Ambiente=QA
Tester=Maribella
Navegador=Chrome
Sistema Operativo=Windows 10
`.trim();

fs.writeFileSync(path.join(allureResultsDir, 'environment.properties'), environmentContent);
console.log('Archivo environment.properties generado');

// === EXECUTOR.JSON ===
const executorContent = {
  name: "Ejecución local WebDriverIO",
  type: "manual",
  reportName: "Allure Report Frontend TAE",
  url: "https://test-adl.leonardojose.dev"
};

fs.writeFileSync(
  path.join(allureResultsDir, 'executor.json'),
  JSON.stringify(executorContent, null, 2)
);
console.log('Archivo executor.json generado');