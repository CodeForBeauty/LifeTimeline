describe('template spec', () => {
  const user = {
    username: 'admin',
    password: 'password'
  }

  const baseUrl = 'http://localhost:9191'

  beforeEach(() => {
    cy.request('GET', baseUrl + '/api/user/clear')

    cy.request('POST', baseUrl + '/api/user/register', user)
    cy.visit(baseUrl)

    cy.contains('label', 'Username').type(user.username)
    cy.contains('label', 'Password').type(user.password)
    cy.contains('login').click()
  })

  it('page loads', () => {
    cy.contains('Create')
  })

  const event = {
    name: "Some event",
    description: "Something happened",
    date: "2025-10-27",
  }

  it('can create event', () => {
    cy.contains('Create').click()

    cy.contains('label', 'Event').type(event.name)
    cy.contains('label', 'Description').type(event.description)
    cy.contains('label', 'Date').type(event.date)

    cy.contains('Create').click()

    cy.contains(event.name)
  })

  it('can delete event', () => {
    cy.contains('Create').click()

    cy.contains('label', 'Event').type(event.name)
    cy.contains('label', 'Description').type(event.description)
    cy.contains('label', 'Date').type(event.date)

    cy.contains('Create').click()

    cy.get('[alt="delete"]').click()

    cy.contains(event.name).should('not.exist')
  })
})