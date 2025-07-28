const { expect, $ } = require('@wdio/globals');
const { BasePage } = require('./base.page');

class NuevoPage extends BasePage {
    get inputCodigoSku() { return $('#sku'); }
    get inputDescripcion() { return $('#name'); }
    get inputStock() { return $('#stock_quantity'); }
    get inputCosto() { return $('#cost_price'); }
    get inputPrecio() { return $('#sale_price'); }
    get inputTipoUM() { return $('#unit'); }
    get btnGuardarCambios() { return $('button[type="submit"]*=Guardar Cambios'); }

    async completarFormulario({ codigosku, descripcion, stock, costo, precio, tipoum }) {
        await this.inputCodigoSku.waitForDisplayed({ timeout: 3000 });
        await this.inputCodigoSku.clearValue();
        await this.inputCodigoSku.click();
        await this.inputCodigoSku.setValue(codigosku);
        await this.inputDescripcion.setValue(descripcion);
        await this.inputStock.setValue(stock);
        await this.inputCosto.setValue(costo);
        await this.inputPrecio.setValue(precio);
        await this.inputTipoUM.selectByVisibleText(tipoum);
        //await this.inputTipoUM.selectByAttribute('value', tipoum);
    }

    async clickGuardar() {
        await this.btnGuardarCambios.waitForClickable({ timeout: 3000 });
        await this.btnGuardarCambios.click();
        const urlArticulo = await browser.getUrl();
        expect(urlArticulo).toContain('/articulos');
    }
}

module.exports = new NuevoPage();