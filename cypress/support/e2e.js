import './Login_commands/loginCommands'
import './Checkout_commands/checkoutCommands'

beforeEach(() => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.window({ log: false }).then((window) => {
    window.sessionStorage.clear()
  })
})
