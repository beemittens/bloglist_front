describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Lars Sonninen',
      username: 'testlso',
      password: 'salainen1'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testlso')
      cy.get('#password').type('salainen1')
      cy.get('#login-button').click()
      cy.contains('Lars Sonninen logged in')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wromg')
      cy.get('#password').type('wromgpsw')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
