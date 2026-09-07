describe('MiSchool - Login Student', () => {

  it('TC-LOGIN-001 - Memastikan pengguna dapat login menggunakan akun student yang valid', () => {
    cy.on('uncaught:exception', () => false)

    cy.visit('https://learning.mischool.id/login')

    cy.get('#email')
      .should('be.visible')
      .clear()
      .type('student@gmail.com')

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type('1234567890')

    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    cy.url()
      .should('not.include', '/login')

    cy.get('body')
      .should('be.visible')
  })

})