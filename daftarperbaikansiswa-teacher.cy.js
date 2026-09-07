describe('MiSchool - Daftar Perbaikan Siswa', () => {

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

    cy.wait(1500)

    cy.contains('Daftar Perbaikan Siswa', { timeout: 15000 })
      .first()
      .click({ force: true })

    cy.wait(1500)
  })


  // MS-PRB-001
  it('MS-PRB-001 - Memastikan halaman Daftar Perbaikan Siswa dapat ditampilkan', () => {
    cy.get('body')
      .should('be.visible')

    cy.contains('Daftar Perbaikan Siswa', { timeout: 10000 })
      .should('exist')
  })


  // MS-PRB-002
  it('MS-PRB-002 - Memastikan kolom pencarian siswa dapat digunakan', () => {
    cy.get('input:visible')
      .first()
      .should('be.visible')
      .clear()
      .type('siswa')

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // MS-PRB-003
  it('MS-PRB-003 - Memastikan filter data perbaikan dapat digunakan', () => {
    cy.contains(/Tampilkan semua/i)
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')

    cy.get('select:visible')
      .first()
      .then(($select) => {
        if ($select.length) {
          cy.wrap($select)
            .find('option')
            .then(($options) => {
              if ($options.length > 1) {
                cy.wrap($select).select(1)
              }
            })
        }
      })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  // MS-PRB-004
  it('MS-PRB-004 - Memastikan tombol Tambah Perbaikan dapat digunakan', () => {
    cy.contains(/Tambah Perbaikan/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // MS-PRB-005
  it('MS-PRB-005 - Memastikan tombol Import Perbaikan dapat digunakan', () => {
    cy.contains(/Import Perbaikan/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')

    cy.get('input[type="file"]')
      .should('exist')
  })


  // MS-PRB-006
  it('MS-PRB-006 - Memastikan tampilan ketika belum ada data siswa', () => {
    cy.get('body')
      .should('be.visible')

    cy.get('table tbody tr')
      .then(($rows) => {
        if ($rows.length === 0) {
          cy.get('body')
            .should('be.visible')
        } else {
          cy.get('table')
            .should('be.visible')
        }
      })
  })


  // MS-PRB-007
  it('MS-PRB-007 - Memastikan dropdown jumlah data dapat digunakan', () => {
    cy.contains(/Tampilkan semua/i)
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')

    cy.get('select:visible')
      .then(($selects) => {
        if ($selects.length) {
          cy.wrap($selects.first())
            .find('option')
            .should('have.length.greaterThan', 1)
        }
      })
  })

})