import inventoryPage from '../../pageObjects/Inventory_pageObjetcs/inventoryPage'
import cartPage from '../../pageObjects/Cart_pageObjetcs/cartPage'
import checkoutStepOnePage from '../../pageObjects/Checkout_pageObjetcs/checkoutStepOnePage'
import checkoutStepTwoPage from '../../pageObjects/Checkout_pageObjetcs/checkoutStepTwoPage'
import checkoutCompletePage from '../../pageObjects/Checkout_pageObjetcs/checkoutCompletePage'

Cypress.Commands.add('addProductToCart', (nomeProduto) => {
  inventoryPage.adicionarProdutoPorNome(nomeProduto)
})

Cypress.Commands.add('goToCart', () => {
  inventoryPage.abrirCarrinho()
})

Cypress.Commands.add('startCheckout', () => {
  cartPage.iniciarCheckout()
})

Cypress.Commands.add('fillCheckoutForm', (dadosCheckout) => {
  checkoutStepOnePage.preencherDados(dadosCheckout)
})

Cypress.Commands.add('continueCheckout', () => {
  checkoutStepOnePage.continuar()
})

Cypress.Commands.add('finishCheckout', () => {
  checkoutStepTwoPage.finalizarCompra()
})

Cypress.Commands.add('cancelCheckoutOverview', () => {
  checkoutStepTwoPage.cancelarCheckout()
})

Cypress.Commands.add('assertCheckoutComplete', () => {
  checkoutCompletePage.validarCompraConcluida()
})
