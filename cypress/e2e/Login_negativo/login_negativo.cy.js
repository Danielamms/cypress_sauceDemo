describe('Feature: Login negativo', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const preencherCredenciaisELogar = (usuario, senha) => {
    if (usuario !== undefined) {
      cy.get('[data-test="username"]').clear()
      if (usuario !== '') cy.get('[data-test="username"]').type(usuario)
    }

    if (senha !== undefined) {
      cy.get('[data-test="password"]').clear()
      if (senha !== '') cy.get('[data-test="password"]').type(senha)
    }

    cy.get('[data-test="login-button"]').click()
  }

  const assertMensagemErro = (mensagemEsperada) => {
    cy.get('[data-test="error"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', mensagemEsperada)
  }

  it('Scenario: Given usuario invalido e senha valida, When tenta logar, Then deve exibir erro de credenciais', () => {
    cy.fixture('Login_fixtures/loginNegativoData').then((dados) => {
      preencherCredenciaisELogar(dados.usuarioInvalido, dados.senhaValida)
      assertMensagemErro(dados.mensagemErroCredenciais)
    })
  })

  it('Scenario: Given usuario valido e senha invalida, When tenta logar, Then deve exibir erro de credenciais', () => {
    cy.fixture('Login_fixtures/loginNegativoData').then((dados) => {
      preencherCredenciaisELogar(dados.usuarioValido, dados.senhaInvalida)
      assertMensagemErro(dados.mensagemErroCredenciais)
    })
  })

  it('Scenario: Given usuario e senha invalidos, When tenta logar, Then deve exibir erro de credenciais', () => {
    cy.fixture('Login_fixtures/loginNegativoData').then((dados) => {
      preencherCredenciaisELogar(dados.usuarioInvalido, dados.senhaInvalida)
      assertMensagemErro(dados.mensagemErroCredenciais)
    })
  })

  it('Scenario: Given usuario vazio, When tenta logar, Then deve exibir erro de usuario obrigatorio', () => {
    cy.fixture('Login_fixtures/loginNegativoData').then((dados) => {
      preencherCredenciaisELogar('', dados.senhaValida)
      assertMensagemErro(dados.mensagemErroUsuarioObrigatorio)
    })
  })

  it('Scenario: Given senha vazia, When tenta logar, Then deve exibir erro de senha obrigatoria', () => {
    cy.fixture('Login_fixtures/loginNegativoData').then((dados) => {
      preencherCredenciaisELogar(dados.usuarioValido, '')
      assertMensagemErro(dados.mensagemErroSenhaObrigatoria)
    })
  })

  it('Scenario: Given usuario bloqueado, When tenta logar, Then deve exibir erro de bloqueio', () => {
    cy.fixture('Login_fixtures/loginNegativoData').then((dados) => {
      preencherCredenciaisELogar(dados.usuarioBloqueado, dados.senhaValida)
      assertMensagemErro(dados.mensagemErroUsuarioBloqueado)
    })
  })
})
