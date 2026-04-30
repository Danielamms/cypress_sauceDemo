class LoginPage {
    acessarLogin() {
      cy.visit('https://www.saucedemo.com/')
    }
    inputUsuario() {
      return cy.get('[data-test="username"]')
    }
    inputSenha() {
      return cy.get('[data-test="password"]')
    }
    botaoLogin() {
      return cy.get('[data-test="login-button"]')
    }
    preencherUsuario(usuario) {
      this.inputUsuario().clear().type(usuario)
    }
    preencherSenha(senha) {
      this.inputSenha().clear().type(senha)
    }
    clicarLogin() {
      this.botaoLogin().click()
    }
  }
  export default new LoginPage()