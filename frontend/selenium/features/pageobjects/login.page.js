const { BasePage } = require('../pageobjects/base.page');

const dataLogin = require('../data/login.data');

class LoginPage extends BasePage {
    async login(email, password) {
        await this.inputEmail.waitForDisplayed({ timeout: 5000 });
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(3000);
        const urlDashboard = await browser.getUrl();
        expect(urlDashboard).toContain('/dashboard');
    }

}

module.exports = new LoginPage();
