const { expect, $ } = require('@wdio/globals')
const { BasePage } = require('../pageobjects/base.page');
const NuevoPage = require('../pageobjects/nuevo.page');

class ArticulosPage extends BasePage {
    get btnCrearArticulo() {
        return $('button=Crear Artículo');
    }

    get listadoArticulos() {
        return $('h1.text-2xl.font-semibold.text-gray-900');
    }

    get labelCodigoSku() {
        return $("//label[contains(text(), 'Código (SKU)')]");
    }

    get btnGuardarCambios() {
        return $('button=Guardar Cambios');
    }

    get toastInfo() {
        return $('div.Toastify__toast--info');
    }

    btnEliminarPorDescripcion(descripcion) {
        return $(`//tr[td[normalize-space(text())="${descripcion}"]]//button[contains(@class, "text-red-600")]`);
    }

    btnEditarPorDescripcion(descripcion) {
        return $(`//tr[td[normalize-space(text())="${descripcion}"]]//button[contains(@class, "text-indigo-600")]`);
    }

    btnEditarGenerico(sku) {
        return $(`//tr[td[contains(text(), "${sku}")]]//button[contains(@class, "text-indigo-600")]`);
    }

    async clickEditarPorDescripcion(descripcion) {
        const btnEditar = await this.btnEditarPorDescripcion(descripcion);
        await expect(btnEditar).toBeDisplayed();
        await btnEditar.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/editar'),
            { timeout: 5000, timeoutMsg: 'No se redirigió a la vista de edición' }
        );
    }

    async clickEliminarPorDescripcion(descripcion) {
        const btnEliminar = await this.btnEliminarPorDescripcion(descripcion);
        await btnEliminar.waitForDisplayed({ timeout: 5000 });
        await btnEliminar.click();

        const toast = await this.toastEliminacionExitosa;
        await toast.waitForDisplayed({
            timeout: 7000,
            timeoutMsg: 'El mensaje de eliminación no apareció.'
        });
    }

    async getFilaArticuloPorNombre(descripcion) {
        const fila = await $(`//tr[td[contains(text(), "${descripcion}")]]`);
        await fila.waitForDisplayed({ timeout: 5000 });
        return fila;
    }

    async clickCrearArticulo() {
        await this.btnCrearArticulo.waitForDisplayed({ timeout: 3000 });
        await this.btnCrearArticulo.click();
        
        const urlNuevo = await browser.getUrl();
        await expect(urlNuevo).toContain('/articulos/nuevo', { timeout: 3000 });
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

    async clickEditarPorNombre(nombre) {
        const btnEditar = await this.btnEditarGenerico(nombre);
        await btnEditar.waitForDisplayed({ timeout: 3000 });
        await btnEditar.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/editar'),
            { timeoutMsg: 'No se redirigió a la vista de edición', }
        );
    }

    async refrescarYEsperarListado() {
        await browser.refresh();
        await this.validarTituloListado();
    }

    async validarDatosArticuloEnListado({ codigosku, descripcion, stock, costo, precio, tipoum }) {
        
        await expect(this.btnGuardarCambios).toBeClickable();
        await this.btnGuardarCambios.click();

        await browser.waitUntil(async () => {
            const filas = await $$('table tbody tr');
            return filas.length > 0;
            }, {
                timeoutMsg: 'La tabla no se cargó correctamente después de guardar.'
        });
        await this.validarTituloListado();
        await $('table').waitForDisplayed({ timeout: 5000 });

        const fila = await $(`//tr[td[normalize-space(text())="${descripcion}"]]`);
        await expect(fila).toBeDisplayed();

        const columnas = await fila.$$(`td`);
        const textos = [];

        for (const col of columnas) {
            textos.push(await col.getText());
        }

        await expect(textos[0]).toContain(codigosku);    
        await expect(textos[1]).toContain(descripcion);  
        await expect(textos[2]).toContain(stock);        
        await expect(textos[3]).toContain(costo);      
        await expect(textos[4]).toContain(precio);     
        await expect(textos[5]).toContain(tipoum); 
    }

    async eliminarArticuloPorDescripcion(descripcion) {
        await this.clickEliminarPorDescripcion(descripcion);    
    }

    async validarMensajeEliminacionEsperado(mensajeEsperado, descripcionEsperada) {
        // Esperar a que aparezca el toast
        const toast = await this.toastInfo;
        await toast.waitForDisplayed({ timeout: 7000 });

        const mensajeObtenido = await toast.getText();
        await expect(mensajeObtenido).toContain(mensajeEsperado);

        // Esperar a que la tabla se recargue
        await browser.waitUntil(async () => {
            const existe = await $(`//tr[td[normalize-space(text())="${descripcionEsperada}"]]`).isExisting();
            return !existe;
        }, {
            timeout: 7000,
            timeoutMsg: `El artículo "${descripcionEsperada}" aún existe luego de eliminarlo.`
        });

        await $('table').waitForDisplayed({ timeout: 5000 });

        // Verificar que el artículo con esa descripción ya NO está en la lista
        const existe = await $(`//tr[td[normalize-space(text())="${descripcionEsperada}"]]`).isExisting();
        await expect(existe).toBe(false);
    }

}

module.exports = new ArticulosPage();