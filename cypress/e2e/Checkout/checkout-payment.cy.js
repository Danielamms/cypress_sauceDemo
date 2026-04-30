import { assertPaginaInventoryCarregada } from '../../assertions/loginAssertions'
import checkoutStepTwoPage from '../../pageObjects/Checkout_pageObjetcs/checkoutStepTwoPage'

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

    cy.then(() =>
      Cypress.Promise.all([
        checkoutStepTwoPage.obterSubtotal(),
        checkoutStepTwoPage.obterTaxa(),
        checkoutStepTwoPage.obterTotal(),
      ]).then(([subtotal, taxa, total]) => {
        expect(total).to.eq(Number((subtotal + taxa).toFixed(2)))
      }),
    )
  })

  it('Scenario: Given checkout overview com multiplos produtos, When le subtotal taxa e total, Then total deve ser subtotal + taxa', () => {
    prepararCheckoutStepTwo([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ])

    cy.then(() =>
      Cypress.Promise.all([
        checkoutStepTwoPage.obterSubtotal(),
        checkoutStepTwoPage.obterTaxa(),
        checkoutStepTwoPage.obterTotal(),
      ]).then(([subtotal, taxa, total]) => {
        expect(total).to.eq(Number((subtotal + taxa).toFixed(2)))
      }),
    )
  })

  it('Scenario: Given checkout overview, When finaliza compra apos validar totais, Then deve concluir com sucesso', () => {
    prepararCheckoutStepTwo(['Sauce Labs Fleece Jacket'])

    cy.then(() =>
      Cypress.Promise.all([
        checkoutStepTwoPage.obterSubtotal(),
        checkoutStepTwoPage.obterTaxa(),
        checkoutStepTwoPage.obterTotal(),
      ]).then(([subtotal, taxa, total]) => {
        expect(total).to.eq(Number((subtotal + taxa).toFixed(2)))
      }),
    )

    cy.finishCheckout()
    cy.assertCheckoutComplete()
  })
})
