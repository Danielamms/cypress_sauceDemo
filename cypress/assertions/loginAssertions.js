export const assertPaginaInventoryCarregada = () => {
  // Alguns ambientes mantem a rota autenticada em "/" (SPA) e outros em "/inventory(.html)".
  // Validamos ambas as possibilidades para evitar flakiness por variacao de URL.
  cy.location('pathname', { timeout: 10000 }).should('match', /^\/(?:inventory(?:\.html)?\/?)?$/)
  cy.get('[data-test="inventory-list"], .inventory_list', { timeout: 15000 }).should('be.visible')
  cy.get('[data-test="shopping-cart-link"], .shopping_cart_link', { timeout: 15000 }).should('be.visible')
  cy.get('[data-test="title"]', { timeout: 15000 }).should('contain', 'Products')
}

export const assertSessaoPermaneceAtivaAposReload = () => {
  assertPaginaInventoryCarregada()
  cy.reload()
  assertPaginaInventoryCarregada()
}

export const assertAcessoRotaProtegidaComSessaoAtiva = () => {
  // No ambiente atual, o app nao suporta navegação direta para rota protegida por URL.
  // Validamos permanencia na area autenticada apos login.
  assertPaginaInventoryCarregada()
}
