const { Given, When, Then } = require('@wdio/cucumber-framework');
const DashboardPage = require('../pageobjects/dashboard.page');
const ArticulosPage = require('../pageobjects/articulos.page');
const CrearArticuloPage = require('../pageobjects/crear_articulo.page');

const { ingresarAlModuloArticulos } = require('../utils/login.utils.js');


Given('el usuario se encuentra autenticado y esta en la lista de articulos', async () => {
    await ingresarAlModuloArticulos();
});

When('el usuario ingresa a Crear un Nuevo Artículo', async () => {
    await DashboardPage.irAArticulos();
    await ArticulosPage.clickCrearArticulo();
});

When('ingresa los datos del nuevo producto con: {string}, {string}, {string}, {string}, {string}, {string}',
    async (codigosku, descripcion, stock, costo, precio, tipoum) => { console.log(codigosku, descripcion, stock, costo, precio, tipoum);
        const costoConvertido = costo.replace(',', '.');
        const precioConvertido = precio.replace(',', '.');
        await CrearArticuloPage.completarFormulario({ codigosku, descripcion, stock, costo: costoConvertido, precio: precioConvertido, tipoum });
        await CrearArticuloPage.clickGuardar();
    }
);

Then('el articulo {string} es agregado y aparece en listado de articulos', async (codigosku) => {
    await browser.pause(3000);
    await ArticulosPage.validarTituloListado();
    const existe = await ArticulosPage.articuloExisteEnListado(codigosku);
    await expect(existe).toBe(true);
});