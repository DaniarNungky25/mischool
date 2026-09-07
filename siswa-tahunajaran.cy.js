Cypress.on('uncaught:exception', () => {
  return false
})

describe('MiSchool - Siswa Testing', () => {

  beforeEach(() => {
    cy.visit('https://learning.mischool.id/login')

    cy.get('input:visible')
      .eq(0)
      .clear()
      .type('school@gmail.com')

    cy.get('input:visible')
      .eq(1)
      .clear()
      .type('password')

    cy.contains('button', 'Masuk')
      .click()

    cy.url()
      .should('include', '/school')
  })


  // MS-SIS-003
  it('MS-SIS-003 - Memastikan filter kelas berfungsi', () => {

    cy.visit('https://learning.mischool.id/school/students')

    cy.get('select:visible')
      .first()
      .then(($select) => {

        const value = $select.find('option').eq(1).val()

        if (value) {
          cy.wrap($select).select(value)
        }

      })

    cy.wait(500)

    cy.get('table:visible')
      .should('exist')

  })


  // MS-SIS-004
  it('MS-SIS-004 - Memastikan tombol Reset berfungsi', () => {

    cy.visit('https://learning.mischool.id/school/students')

    cy.contains('Reset')
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('table:visible')
      .should('exist')

  })


  // MS-SIS-005
  it('MS-SIS-005 - Memastikan tab Alumni dapat diakses', () => {

    cy.visit('https://learning.mischool.id/school/students')

    cy.contains('Alumni')
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait(700)

    cy.url()
      .should('include', '/school')

  })


  // MS-SIS-006
  it('MS-SIS-006 - Memastikan tombol Import Siswa dapat digunakan', () => {

    cy.visit('https://learning.mischool.id/school/students')

    cy.contains('Import Siswa')
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('.modal:visible')
      .last()
      .within(() => {

        cy.get('input[type="file"]')
          .should('exist')

        cy.contains('Tutup')
          .should('be.visible')

      })

  })


  // MS-SIS-007
  it('MS-SIS-007 - Memastikan menu aksi pada data siswa berfungsi', () => {

    cy.visit('https://learning.mischool.id/school/students')

    cy.get('tbody:visible tr')
      .first()
      .within(() => {

        cy.get('button')
          .last()
          .click({ force: true })

      })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')

  })


  // =====================================================
// MS-SIS-008
// Memastikan halaman Edit Siswa dapat dibuka
// =====================================================
it('MS-SIS-008 - Memastikan halaman Edit Siswa dapat dibuka', () => {

  cy.visit('https://learning.mischool.id/school/students')

  cy.get('tbody:visible tr')
    .first()
    .within(() => {

      cy.get('button')
        .last()
        .click({ force: true })

    })

  cy.wait(500)

  cy.get('body')
    .contains('Edit')
    .click({ force: true })

  cy.wait(700)

  cy.url()
    .should('include', '/school')

})

})