class CheckoutStepTwoPage {
  botaoFinish() {
    return cy.get('[data-test="finish"]')
  }

  botaoCancel() {
    return cy.get('[data-test="cancel"]')
  }

  itemNoOverviewPorNome(nomeProduto) {
    return cy.contains('[data-test="inventory-item-name"], .inventory_item_name', nomeProduto)
  }

  labelSubtotal() {
    return cy.get('[data-test="subtotal-label"], .summary_subtotal_label')
  }

  labelTaxa() {
    return cy.get('[data-test="tax-label"], .summary_tax_label')
  }

  labelTotal() {
    return cy.get('[data-test="total-label"], .summary_total_label')
  }

  valorMonetarioDoTexto(texto) {
    const valorTexto = (texto.match(/\$([0-9]+(?:\.[0-9]{2})?)/) || [])[1]
    return Number(valorTexto)
  }

  obterSubtotal() {
    return this.labelSubtotal().invoke('text').then((texto) => this.valorMonetarioDoTexto(texto))
  }

  obterTaxa() {
    return this.labelTaxa().invoke('text').then((texto) => this.valorMonetarioDoTexto(texto))
  }

  obterTotal() {
    return this.labelTotal().invoke('text').then((texto) => this.valorMonetarioDoTexto(texto))
  }

  finalizarCompra() {
    this.botaoFinish().click()
  }

  cancelarCheckout() {
    this.botaoCancel().click()
  }
}

export default new CheckoutStepTwoPage()
