import { assertPaginaInventoryCarregada } from '../../assertions/loginAssertions'
import checkoutStepOnePage from '../../pageObjects/Checkout_pageObjetcs/checkoutStepOnePage'

describe('Feature: Checkout negativo', () => {
  beforeEach(() => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertPaginaInventoryCarregada()
    cy.addProductToCart('Sauce Labs Backpack')
    cy.goToCart()
    cy.startCheckout()
  })

  it('Scenario: Given checkout step one, When continua sem first name, Then deve exibir erro de first name obrigatorio', () => {
    cy.fillCheckoutForm({
      firstName: '',
      lastName: 'Silva',
      postalCode: '12345',
    })
    cy.continueCheckout()
    checkoutStepOnePage.mensagemErro().should('contain', 'Error: First Name is required')
  })

  it('Scenario: Given checkout step one, When continua sem last name, Then deve exibir erro de last name obrigatorio', () => {
    cy.fillCheckoutForm({
      firstName: 'Teste',
      lastName: '',
      postalCode: '12345',
    })
    cy.continueCheckout()
    checkoutStepOnePage.mensagemErro().should('contain', 'Error: Last Name is required')
  })

  it('Scenario: Given checkout step one, When continua sem postal code, Then deve exibir erro de postal code obrigatorio', () => {
    cy.fillCheckoutForm({
      firstName: 'Teste',
      lastName: 'Silva',
      postalCode: '',
    })
    cy.continueCheckout()
    checkoutStepOnePage.mensagemErro().should('contain', 'Error: Postal Code is required')
  })
})
