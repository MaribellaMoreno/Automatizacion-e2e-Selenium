const { BasePage } = require('../pageobjects/base.page');

const dataLogin = require('../data/login.data');

class LoginPage extends BasePage {

    get mensajeError() {
        return $('div.Toastify__toast--error');
    }

    async login(email, password) {
        await this.inputEmail.waitForDisplayed({ timeout: 5000 });
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(3000);
        const urlDashboard = await browser.getUrl();
        expect(urlDashboard).toContain('/dashboard');
    }

    async loginFallido(email, password) {
        await this.inputEmail.waitForDisplayed({ timeout: 5000 });
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(3000);
    }

    async obtenerMensajeError() {
        const mensaje = await this.mensajeError;
        await browser.waitUntil(
            async () => await mensaje.isDisplayed(),
            {
                timeout: 6000,
                timeoutMsg: 'El mensaje de error no fue mostrado en el tiempo esperado'
            }
        );
        return await mensaje.getText();
    }
}

module.exports = new LoginPage();
