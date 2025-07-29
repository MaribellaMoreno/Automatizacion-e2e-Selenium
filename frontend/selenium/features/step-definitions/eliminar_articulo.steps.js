const { Given, When, Then } = require('@wdio/cucumber-framework');
const ArticulosPage = require('../pageobjects/articulos.page');
const { ingresarAlModuloArticulos, } = require('../utils/login.utils');

Given('el usuario se encuentra autenticado y esta en la lista de articulos', async () => {
    await ingresarAlModuloArticulos();
});

When('el usuario busca el artículo con nombre {string} y accede a su eliminación', async (descripcion) => {
    await ArticulosPage.eliminarArticuloPorDescripcion(descripcion);
});

Then('se valida el mensaje de éxito {string} para el artículo {string}', async (mensajeEsperado, descripcionEsperada) => {
    await ArticulosPage.validarMensajeEliminacionEsperado(mensajeEsperado, descripcionEsperada);
});
