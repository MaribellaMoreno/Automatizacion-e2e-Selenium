const { expect, $ } = require('@wdio/globals')
const { BasePage } = require('../pageobjects/base.page');

class NuevoPage extends BasePage {
    get campoCodigoSKU() {
        return $('#codigosku');
    }
}

module.exports = new ArticulosPage();