export class LoginPage {

    fnNavigate() {
        cy.visit('https://www.saucedemo.com/');
    }

    getUsername() {
        return cy.get('[data-test="username"]');
    }

    getPassword() {
        return cy.get('[data-test="password"]');
    }

    getBtnLogin() {
        return cy.get('[data-test="login-button"]');
    }

    clickBtnLogin() {
        this.getBtnLogin().should('exist');
        this.getBtnLogin().click();
    }

    fnLogin(username, password) {
        this.getUsername().type(username);
        this.getPassword().type(password);
        this.clickBtnLogin();
        cy.url().should('include', '/inventory.html');
    }

}