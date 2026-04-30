
import loginPage from '../../pageObjects/Login_pageObjetcs/loginPage'

Cypress.Commands.add('loginValido', (usuario, senha) => {
  loginPage.acessarLogin()
  loginPage.preencherUsuario(usuario)
  loginPage.preencherSenha(senha)
  loginPage.clicarLogin()
})
