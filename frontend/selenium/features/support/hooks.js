const { Before, After } = require('@wdio/cucumber-framework');

Before(async (scenario) => {
  console.log(`\nIniciando escenario: "${scenario.pickle.name}"`);
  await browser.reloadSession(); // Limpia la sesión para cada prueba
  await browser.setWindowSize(1280, 800); // Establece tamaño de ventana
});

After(async function (scenario) {
  console.log(`Finalizando escenario: "${scenario.pickle.name}"`);

  if (scenario.result?.status === 'FAILED') {
    const screenshot = await browser.takeScreenshot();
    await this.attach(screenshot, 'image/png'); // Adjunta imagen al reporte Allure
  }
  // Puedes agregar limpieza de sesión o logout aquí si lo deseas
});