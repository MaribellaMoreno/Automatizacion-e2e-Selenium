const { Given, When, Then } = require('@wdio/cucumber-framework');
const { BasePage } = require('../pageobjects/base.page');
const { expect } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');
const DashboardPage = require('../pageobjects/dashboard.page');

const basePage = new BasePage();

Given('el usuario está en la página de login', async () => {
    await browser.url('/login');
    const urlLogin = await browser.getUrl();
    expect(urlLogin).toContain('/login');
});

When('inicia sesión con el email {string} y la clave {string}', async (usuario, clave) => {
    await LoginPage.login(usuario, clave);
});

When('intenta iniciar sesión con el email {string} y la clave {string}', async (email, clave) => {
    await LoginPage.loginFallido(email, clave);
});

Then('se valida el mensaje {string}', async (mensajeEsperado) => {
    await DashboardPage.validarBienvenida(mensajeEsperado);
});

Then('se valida el mensaje de error {string}', async (mensajeEsperado) => {
    const mensajeObtenido = await LoginPage.obtenerMensajeError();
    await expect(mensajeObtenido).toContain(mensajeEsperado);
});
