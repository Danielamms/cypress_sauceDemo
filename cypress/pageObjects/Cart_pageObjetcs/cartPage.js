class CartPage {
  botaoCheckout() {
    return cy.get('[data-test="checkout"]')
  }

  itemNoCarrinhoPorNome(nomeProduto) {
    return cy.contains('[data-test="inventory-item-name"], .inventory_item_name', nomeProduto)
  }

  removerProdutoPorNome(nomeProduto) {
    this.itemNoCarrinhoPorNome(nomeProduto)
      .should('be.visible')
      .parents('[data-test="inventory-item"], .cart_item')
      .first()
      .find('button')
      .contains('Remove')
      .click()
  }

  iniciarCheckout() {
    this.botaoCheckout().click()
  }
}

export default new CartPage()
