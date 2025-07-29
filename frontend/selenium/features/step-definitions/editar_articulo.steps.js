const { Given, When, Then } = require('@wdio/cucumber-framework');
const ArticulosPage = require('../pageobjects/articulos.page');
const NuevoPage = require('../pageobjects/nuevo.page');
const { ingresarAlModuloArticulos, } = require('../utils/login.utils');

Given('el usuario se encuentra autenticado y esta en la lista de articulos', async () => {
    await ingresarAlModuloArticulos();
});

When('el usuario busca el artículo con nombre {string} y accede a su edición', async (descripcionAnterior) => {
    await ArticulosPage.clickEditarPorDescripcion(descripcionAnterior);
    //await ArticulosPage.clickEditarPorNombre(nombreAnterior);
});

When('actualiza los datos del artículo por: {string}, {string}, {string}, {string}, {string}, {string}',
  async (codigosku, descripcionNueva, stock, costo, precio, tipoum) => {
    await NuevoPage.editarFormularioYGuardar({ codigosku, descripcion: descripcionNueva, stock, costo, precio, tipoum });
});

Then(
  'el artículo actualizado con datos {string}, {string}, {string}, {string}, {string}, {string} aparece en el listado',
  async (codigosku, descripcionNueva, stock, costo, precio, tipoum) => {
    await ArticulosPage.validarDatosArticuloEnListado({ codigosku, descripcion: descripcionNueva, stock, costo, precio, tipoum });
  }
);
