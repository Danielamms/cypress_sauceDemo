class InventoryPage {
  botaoAdicionarPorNome(nomeProduto) {
    return cy
      .contains('[data-test="inventory-item-name"], .inventory_item_name', nomeProduto)
      .should('be.visible')
      .parents('[data-test="inventory-item"], .inventory_item')
      .first()
      .find('button')
      .contains('Add to cart')
  }

  adicionarProdutoPorNome(nomeProduto) {
    this.botaoAdicionarPorNome(nomeProduto).click()
  }

  abrirCarrinho() {
    cy.get('[data-test="shopping-cart-link"], .shopping_cart_link').click()
  }
}

export default new InventoryPage()
