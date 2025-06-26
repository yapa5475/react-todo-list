describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/')  // Adjust if your app runs on a different base URL
    cy.clearLocalStorage() // start fresh for each test
  })

  it('loads the app', () => {
    cy.contains('Todo List')  // check header exists
  })

  it('can add a new todo', () => {
    cy.get('input#item')       // get input by id (adjust selector)
      .type('Buy milk')

    cy.get('form').submit()    // submit the form

    cy.contains('Buy milk')    // todo should appear
  })

  it('can mark todo as completed', () => {
    cy.get('input#item').type('Walk dog')
    cy.get('form').submit()
    
    cy.contains('Walk dog')
      .parent()
      .find('input[type=checkbox]')
      .check()               // mark as completed

    cy.contains('Walk dog')
      .parent()
      .find('input[type=checkbox]')
      .should('be.checked')
  })

  it('can delete a todo', () => {
    cy.get('input#item').type('Buy milk')
    cy.get('form').submit()

    cy.contains('Buy milk')
      .parent()
      .find('button')
      .contains('Delete')
      .click()

    cy.contains('Buy milk').should('not.exist')
  })
})
