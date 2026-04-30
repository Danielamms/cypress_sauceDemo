import {
  assertPaginaInventoryCarregada,
  assertSessaoPermaneceAtivaAposReload,
} from '../../assertions/loginAssertions'
import checkoutStepTwoPage from '../../pageObjects/Checkout_pageObjetcs/checkoutStepTwoPage'

describe('Feature: Checkout positivo', () => {
  const dadosValidosCheckout = {
    firstName: 'Teste',
    lastName: 'Silva',
    postalCode: '12345',
  }

  beforeEach(() => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertPaginaInventoryCarregada()
    assertSessaoPermaneceAtivaAposReload()
  })

  it('Scenario: Given usuario autenticado com 1 produto no carrinho, When finaliza checkout, Then deve concluir compra com sucesso', () => {
    cy.addProductToCart('Sauce Labs Backpack')
    cy.goToCart()
    cy.startCheckout()
    cy.fillCheckoutForm(dadosValidosCheckout)
    cy.continueCheckout()
    cy.finishCheckout()
    cy.assertCheckoutComplete()
  })

  it('Scenario: Given usuario autenticado com multiplos produtos, When avanca para overview, Then deve visualizar os produtos e concluir a compra', () => {
    const produtos = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ]

    produtos.forEach((produto) => cy.addProductToCart(produto))

    cy.goToCart()
    cy.startCheckout()
    cy.fillCheckoutForm(dadosValidosCheckout)
    cy.continueCheckout()

    produtos.forEach((produto) => {
      checkoutStepTwoPage.itemNoOverviewPorNome(produto).should('be.visible')
    })

    cy.finishCheckout()
    cy.assertCheckoutComplete()
  })

  it('Scenario: Given usuario no overview do checkout, When clica em cancelar, Then deve retornar para a inventory', () => {
    cy.addProductToCart('Sauce Labs Backpack')
    cy.goToCart()
    cy.startCheckout()
    cy.fillCheckoutForm(dadosValidosCheckout)
    cy.continueCheckout()
    cy.cancelCheckoutOverview()
    assertPaginaInventoryCarregada()
  })
})
