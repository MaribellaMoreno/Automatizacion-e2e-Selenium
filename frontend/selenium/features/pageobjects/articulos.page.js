const { expect, $ } = require('@wdio/globals')
const { BasePage } = require('../pageobjects/base.page');

class ArticulosPage extends BasePage {
    get btnCrearArticulo() {
        return $('button=Crear Artículo');
    }

    get listadoArticulos() {
        return $('h1=Listado de Artículos');
    }

    get labelCodigoSku() {
        return $("//label[contains(text(), 'Código (SKU)')]");
    }

    async clickCrearArticulo() {
        await this.btnCrearArticulo.waitForDisplayed({ timeout: 3000 });
        await this.btnCrearArticulo.click();
        
        const urlNuevo = await browser.getUrl();
        await expect(urlNuevo).toContain('/articulos/nuevo', { timeout: 3000 });
        // Esperar que el campo de formulario esté visible
        await this.labelCodigoSku.waitForDisplayed();
    }

    async articuloExisteEnListado(sku) {
        const fila = await $(`//td[contains(text(), "${sku}")]`);
        return await fila.isDisplayed();
    }

    async getFilaArticuloPorSku(sku) {
        const fila = await $(`//td[contains(text(), "${sku}")]`);
        const existe = await fila.isExisting();
        if (!existe) {
            return console.log(`No se encontró una fila con SKU: ${sku}`);
            }
            return fila;
    }

    async validarTituloListado() {
        await this.listadoArticulos.waitForDisplayed();
        const texto = await this.listadoArticulos.getText();
        await expect(texto).toContain('Artículos');
    }
}

module.exports = new ArticulosPage();