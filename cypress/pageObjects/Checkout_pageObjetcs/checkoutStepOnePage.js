class CheckoutStepOnePage {
  inputFirstName() {
    return cy.get('[data-test="firstName"]')
  }

  inputLastName() {
    return cy.get('[data-test="lastName"]')
  }

  inputPostalCode() {
    return cy.get('[data-test="postalCode"]')
  }

  botaoContinue() {
    return cy.get('[data-test="continue"]')
  }

  mensagemErro() {
    return cy.get('[data-test="error"]')
  }

  preencherDados({ firstName = '', lastName = '', postalCode = '' }) {
    this.inputFirstName().clear()
    this.inputLastName().clear()
    this.inputPostalCode().clear()

    if (firstName) this.inputFirstName().type(firstName)
    if (lastName) this.inputLastName().type(lastName)
    if (postalCode) this.inputPostalCode().type(postalCode)
  }

  continuar() {
    this.botaoContinue().click()
  }
}

export default new CheckoutStepOnePage()
