const dataLogin = require('../data/login.data');
const LoginPage = require('../pageobjects/login.page');
const DashboardPage = require('../pageobjects/dashboard.page');

//Ingreso a modulo Dashboard
async function ingresarAlModuloDashboard() {
    await browser.url('/login'); 
    await LoginPage.login('testeradl@test.com', 'Tester@2025');
}

//Ingreso a modulo Articulos
async function ingresarAlModuloArticulos() {
    await ingresarAlModuloDashboard(); 
    await DashboardPage.irAArticulos();
}

// Devuelve el valor real de una clave simbólica usada en los escenarios Gherkin.
function obtenerDatoDesdeClave(clave) {
    const campos = {
        usuarioValido: dataLogin.usuarioValido.email,
        passwordValido: dataLogin.usuarioValido.password,
        usuarioInvalido: dataLogin.usuarioInvalido.email,
        passwordInvalido: dataLogin.usuarioInvalido.password,
        usuarioVacio: dataLogin.camposVacios.email,
        passwordVacio: dataLogin.camposVacios.password
    };

    return campos[clave] ?? clave;
}

module.exports = { obtenerDatoDesdeClave, ingresarAlModuloDashboard, ingresarAlModuloArticulos };