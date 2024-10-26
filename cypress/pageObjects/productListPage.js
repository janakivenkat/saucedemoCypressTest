export class InventoryListPage {

    getInventoryList() {
        return cy.get('[data-test="inventory-list"]');
    }

    getInventoryItem() {
        return cy.get('[data-test="inventory-item"]');
    }

    getInventoryItemName(productName) {
        return cy.get('[data-test="inventory-item"]').filter(`:has(.inventory_item_name:contains("${productName}"))`);
    }

    getInventoryItemDesc(product) {
        return product.find('[data-test="inventory-item-desc"]');
    }

    getInventoryItemPrice(product) {
        return product.find('[data-test="inventory-item-price"]');
    }

    getSauceLabAddToCart() {
        return cy.get('[data-test="add-to-cart-sauce-labs-backpack"]');
    }

    getSauceLabRemoveCart() {
        return cy.get('[data-test="remove-sauce-labs-backpack"]');
    }

    getShoppingCartLink() {
        return cy.get('[data-test="shopping-cart-link"]');
    }

    getShoppingCartBadge() {
        return cy.get('[data-test="shopping-cart-badge"]');
    }

    getBtnCheckout() {
        return cy.get('[data-test="checkout"]');
    }

}