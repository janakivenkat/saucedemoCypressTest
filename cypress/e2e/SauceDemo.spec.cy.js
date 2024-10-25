/// <reference types="cypress" />

import { LoginPage } from "../pageObjects/loginSauceDemo";
import { InventoryListPage } from "../pageObjects/productListPage";
import { CheckoutPage } from "../pageObjects/checkoutPage";

describe('Login Sauce Demo', () => {
    const loginPage = new LoginPage();
    const productListPage = new InventoryListPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        loginPage.fnNavigate();
        let username = 'standard_user';
        let password = 'secret_sauce';
        loginPage.fnLogin(username, password);
    })

    it('Login using valid username and password', () => {

        //verify inventory list is displayed
        productListPage.getInventoryList().should('be.visible');
        productListPage.getInventoryItem().should('have.length.greaterThan', 0);
    })

    it('Add to cart and complete a purchase', () => {
        //fetch name , price and desc of sauce labs backpack
        productListPage.getInventoryItemName()
            .first()
            .invoke('text')
            .as('txtSauceLabName');
        productListPage.getInventoryItemDesc()
            .first()
            .invoke('text')
            .as('txtSauceLabDesc');
        productListPage.getInventoryItemPrice()
            .first()
            .invoke('text')
            .as('txtSauceLabsPrice');
        productListPage.getSauceLabAddToCart().click();
        //verify if added to cart
        productListPage.getSauceLabRemoveCart().should('be.visible');
        //verify shopping cart has 1 item
        productListPage.getShoppingCartLink().should('be.visible');
        productListPage.getShoppingCartBadge().should('have.length', '1');

        //click on the shoppingcartlink
        productListPage.getShoppingCartLink().click();
        cy.url().should('include', '/cart.html');

        //verify the item in the cart 
        productListPage.getInventoryItem().should('have.length', 1);
        productListPage.getInventoryItemName().should('contain', 'Sauce Labs Backpack');

        // Proceed to checkout
        productListPage.getBtnCheckout().click();
        cy.url().should('include', '/checkout-step-one.html');

        // Fill in the checkout information
        let txtFirstName = 'Johan';
        let txtLastName = 'Das';
        let txtZipOrPostalCode = '12345'
        checkoutPage.getFirstName().type(txtFirstName);
        checkoutPage.getLastName().type(txtLastName);
        checkoutPage.getZipOrPostalCode().type(txtZipOrPostalCode);

        // Click Continue to the next page of checkout
        checkoutPage.getBtnContinue().click();
        cy.url().should('include', '/checkout-step-two.html');

        // Verify that the summary contains the product name, price and desc from previoulsly saved info
        cy.get('@txtSauceLabName').then(txtSauceLabName => {
            productListPage.getInventoryItemName().should('contain', txtSauceLabName);
        })

        cy.get('@txtSauceLabDesc').then(txtSauceLabDesc => {
            productListPage.getInventoryItemDesc().should('contain', txtSauceLabDesc);
        })

        cy.get('@txtSauceLabsPrice').then(txtSauceLabsPrice => {
            productListPage.getInventoryItemPrice().should('contain', txtSauceLabsPrice);
        })

        // Finish the checkout
        checkoutPage.getBtnFinish().click();
        cy.url().should('include', '/checkout-complete.html');

        // Verify order completion message
        checkoutPage.getMsgOrderCompletion().should('contain', 'Thank you for your order!');
    })
})  
