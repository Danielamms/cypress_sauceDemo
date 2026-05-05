import { assertPaginaInventoryCarregada } from '../../assertions/loginAssertions'

describe('Feature: Checkout pagamento e totais', () => {
  const dadosValidosCheckout = {
    firstName: 'Teste',
    lastName: 'Silva',
    postalCode: '12345',
  }

  const prepararCheckoutStepTwo = (produtos) => {
    produtos.forEach((produto) => cy.addProductToCart(produto))
    cy.goToCart()
    cy.startCheckout()
    cy.fillCheckoutForm(dadosValidosCheckout)
    cy.continueCheckout()
  }

  beforeEach(() => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertPaginaInventoryCarregada()
  })

  it('Scenario: Given checkout overview com 1 produto, When le subtotal taxa e total, Then total deve ser subtotal + taxa', () => {
    prepararCheckoutStepTwo(['Sauce Labs Backpack'])
    cy.assertCheckoutTotal()
  })

  it('Scenario: Given checkout overview com multiplos produtos, When le subtotal taxa e total, Then total deve ser subtotal + taxa', () => {
    prepararCheckoutStepTwo([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ])

    cy.assertCheckoutTotal()
  })

  it('Scenario: Given checkout overview, When finaliza compra apos validar totais, Then deve concluir com sucesso', () => {
    prepararCheckoutStepTwo(['Sauce Labs Fleece Jacket'])
    cy.assertCheckoutTotal()

    cy.finishCheckout()
    cy.assertCheckoutComplete()
  })
})
