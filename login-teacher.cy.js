describe('MiSchool - Dashboard Teacher', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

    cy.visit('https://learning.mischool.id/login')

    cy.get('#email')
      .should('be.visible')
      .clear()
      .type('teacher@gmail.com')

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type('123456789101234567')

    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    cy.url().should('include', '/teacher')
  })

  it('MS-LOGIN-001 - Memastikan halaman dashboard dapat ditampilkan', () => {

    cy.contains('Beranda')
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.url().should('include', '/teacher')

    cy.get('body').should('contain.text', 'Beranda')

    cy.get('body')
      .should('contain.text', 'Absensi')
      .and('contain.text', 'Jadwal Mengajar')
      .and('contain.text', 'Riwayat Absensi')
      .and('contain.text', 'Statistik')
  })

})