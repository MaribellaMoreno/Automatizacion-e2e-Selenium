const { browser, $ } = require('@wdio/globals');

class BasePage {
    constructor() {
        this.baseUrl = 'https://test-adl.leonardojose.dev';
    }

    get inputEmail() {
        return $('#email');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    open(path = '') {
        return browser.url(`${this.baseUrl}${path}`);
    }

}

module.exports = { BasePage };