class CheckoutCompletePage {
  tituloConclusao() {
    return cy.get('[data-test="complete-header"], .complete-header')
  }

  validarCompraConcluida() {
    this.tituloConclusao().should('be.visible').and('contain', 'Thank you for your order!')
  }
}

export default new CheckoutCompletePage()
