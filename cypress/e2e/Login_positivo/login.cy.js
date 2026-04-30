import {
  assertAcessoRotaProtegidaComSessaoAtiva,
  assertPaginaInventoryCarregada,
  assertSessaoPermaneceAtivaAposReload,
} from '../../assertions/loginAssertions'

describe('Feature: Login positivo', () => {
  it('Scenario: Given credenciais validas, When realiza login, Then deve acessar inventory com elementos principais visiveis', () => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertPaginaInventoryCarregada()
  })

  it('Scenario: Given usuario autenticado, When recarrega a pagina, Then deve manter sessao ativa', () => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertSessaoPermaneceAtivaAposReload()
  })

  it('Scenario: Given sessao ativa, When permanece na area autenticada, Then deve continuar na inventory', () => {
    cy.fixture('Login_fixtures/loginData').then((dadosLogin) => {
      cy.loginValido(dadosLogin.usuario, dadosLogin.senha)
    })

    assertAcessoRotaProtegidaComSessaoAtiva()
  })
})
