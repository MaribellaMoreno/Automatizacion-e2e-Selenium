const { expect, $ } = require('@wdio/globals')
const { BasePage } = require('../pageobjects/base.page');

class DashboardPage extends BasePage {
    get textoBienvenida() {
        return $("//p[contains(text(), 'Bienvenido al sistema ERP.')]");
    }

    get menuEntidades() {
        return $('//span[contains(text(),"Entidades")]');
    }

    get submenuArticulos() {
        return $("//a[.//span[text()='Artículos']]");
    }

    async validarBienvenida(mensajeEsperado) {
        await this.textoBienvenida.waitForDisplayed({ timeout: 3000 });
        await expect(this.textoBienvenida).toHaveText(mensajeEsperado);
    }

    async irAArticulos() {
        await this.menuEntidades.waitForDisplayed({ timeout: 3000 });
        await this.menuEntidades.click();

        await this.submenuArticulos.waitForDisplayed({ timeout: 3000 });
        await this.submenuArticulos.click();
        await browser.pause(3000);
        const urlArticulos = await browser.getUrl();
        await expect(urlArticulos).toContain('/articulos', { timeout: 3000 });
    }
}

module.exports = new DashboardPage();