import { assertPaginaInventoryCarregada } from '../../assertions/loginAssertions'

describe('Feature: Carrinho', () => {
  const adicionarProdutoPorNome = (nomeProduto) => {
    cy.contains('[data-test="inventory-item-name"], .inventory_item_name', nomeProduto)
      .should('be.visible')
      .parents('[data-test="inventory-item"], .inventory_item')
      .first()
      .within(() => {
        cy.contains('button', 'Add to cart').click()
      })
  }

  const validarQuantidadeBadgeCarrinho = (quantidadeEsperada) => {
    cy.get('[data-test="shopping-cart-badge"], .shopping_cart_badge')
      .should('be.visible')
      .and('have.text', String(quantidadeEsperada))
  }

  const abrirCarrinho = () => {
    cy.get('[data-test="shopping-cart-link"], .shopping_cart_link').click()
    cy.location('pathname', { timeout: 10000 }).should('match', /\/cart(?:\.html)?\/?$/)
  }

  it('Scenario: Given usuario autenticado, When adiciona 1 produto, Then deve exibir item no carrinho com badge 1', () => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertPaginaInventoryCarregada()

    const produto = 'Sauce Labs Backpack'
    adicionarProdutoPorNome(produto)
    validarQuantidadeBadgeCarrinho(1)
    abrirCarrinho()
    cy.contains('[data-test="inventory-item-name"], .inventory_item_name', produto).should('be.visible')
  })

  it('Scenario: Given usuario autenticado, When adiciona 3 produtos, Then deve exibir os 3 itens no carrinho com badge 3', () => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertPaginaInventoryCarregada()

    const produtos = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ]

    produtos.forEach((produto) => adicionarProdutoPorNome(produto))
    validarQuantidadeBadgeCarrinho(3)
    abrirCarrinho()
    produtos.forEach((produto) => {
      cy.contains('[data-test="inventory-item-name"], .inventory_item_name', produto).should('be.visible')
    })
  })

  it('Scenario: Given usuario autenticado, When adiciona todos os produtos, Then deve exibir todos os itens no carrinho com badge total', () => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertPaginaInventoryCarregada()

    cy.get('[data-test^="add-to-cart-"], .btn_inventory')
      .contains('Add to cart')
      .then(($botoesAdd) => {
        const quantidadeProdutos = $botoesAdd.length
        cy.wrap($botoesAdd).click({ multiple: true })
        validarQuantidadeBadgeCarrinho(quantidadeProdutos)
        abrirCarrinho()
        cy.get('[data-test="inventory-item"], .cart_item').should('have.length', quantidadeProdutos)
      })
  })
})
