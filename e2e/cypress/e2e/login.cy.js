describe('login', () => {
  const user = {
    username: 'admin',
    password: 'password'
  }

  const baseUrl = 'http://localhost:9191'

  beforeEach(() => {
    cy.request('GET', baseUrl + '/api/user/clear')

    cy.request('POST', baseUrl + '/api/user/register', user)
    cy.visit(baseUrl)
  })

  it('login page shown', () => {
    cy.contains('login')
  })

  it('can register', () => {
    cy.contains('register').click()
    cy.contains('label', 'Username').type('test1')
    cy.contains('label', 'Password').type('password')
    cy.contains('register').click()

    cy.contains('login').should('not.exist')
  })

  it('can login', () => {
    cy.contains('label', 'Username').type(user.username)
    cy.contains('label', 'Password').type(user.password)
    cy.contains('login').click()

    cy.contains('login').should('not.exist')
  })

  it('can\'t login with incorrect password', () => {
    cy.contains('label', 'Username').type(user.username)
    cy.contains('label', 'Password').type('password1')
    cy.contains('login').click()

    cy.contains('Incorrect username or password')
  })

  it('username and password required', () => {
    cy.contains('login').click()

    cy.contains('Username is required')
    cy.contains('Password is required')
  })

  it('can\'t use short password', () => {
    cy.contains('label', 'Username').type(user.username)
    cy.contains('label', 'Password').type('123')
    cy.contains('login').click()

    cy.contains('Password must at least be 6 characters long')
  })
})