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
    this.inputFirstName().clear().type(firstName)
    this.inputLastName().clear().type(lastName)
    this.inputPostalCode().clear().type(postalCode)
  }

  continuar() {
    this.botaoContinue().click()
  }
}

export default new CheckoutStepOnePage()
