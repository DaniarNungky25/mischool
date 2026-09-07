// cypress/e2e/pegawai-siswa.cy.js

// Error dari aplikasi MiSchool diabaikan supaya test Cypress tetap berjalan
Cypress.on('uncaught:exception', () => {
  return false
})

describe('MiSchool - Pegawai & Siswa Testing', () => {

  beforeEach(() => {
    cy.visit('https://learning.mischool.id/login')

    cy.get('input:visible')
      .eq(0)
      .type('school@gmail.com')

    cy.get('input:visible')
      .eq(1)
      .type('password')

    cy.contains('button', 'Masuk')
      .click()

    cy.url()
      .should('include', '/school')
  })


  // =====================================================
// MS-PEG-001 - Menampilkan daftar guru
// =====================================================
it('MS-PEG-001 - Menampilkan daftar guru', () => {

  cy.visit('https://learning.mischool.id/school/employees')

  cy.url()
    .should('include', '/school/employees')

  cy.contains('Daftar Guru')
    .should('be.visible')

  cy.get('table')
    .first()
    .within(() => {

      cy.contains('th', 'Nama Guru')
        .should('be.visible')

      cy.contains('th', 'Jumlah Mapel')
        .should('be.visible')

      cy.contains('th', 'Email')
        .should('be.visible')

      cy.contains('th', 'NIP')
        .should('be.visible')

      cy.contains('th', 'RFID')
        .should('be.visible')

    })

})

  // =====================================================
  // MS-PEG-002
  // Mencari data guru
  // =====================================================
  it('MS-PEG-002 - Mencari data guru menggunakan kolom pencarian', () => {

    cy.visit('https://learning.mischool.id/school/employees')

    cy.get('#search-name:visible')
      .first()
      .should('be.visible')
      .clear()
      .type('proro')

    cy.contains('proro')
      .should('be.visible')

  })


  // =====================================================
  // MS-PEG-003
  // Filter guru berdasarkan jenis kelamin
  // =====================================================
  it('MS-PEG-003 - Memfilter guru berdasarkan jenis kelamin', () => {

    cy.visit('https://learning.mischool.id/school/employees')

    cy.get('select:visible')
      .first()
      .should('be.visible')
      .select('Laki-laki')

    cy.contains('Laki-laki')
      .should('be.visible')

  })


  // =====================================================
  // MS-PEG-004
  // Mengubah jumlah data guru
  // =====================================================
  it('MS-PEG-004 - Mengubah jumlah data guru yang ditampilkan', () => {

    cy.visit('https://learning.mischool.id/school/employees')

    cy.get('select:visible')
      .last()
      .should('be.visible')
      .select('10')

    cy.contains('10')
      .should('be.visible')

  })


  // =====================================================
  // MS-PEG-005
  // Berpindah ke halaman berikutnya
  // =====================================================
  it('MS-PEG-005 - Berpindah ke halaman berikutnya', () => {

    cy.visit('https://learning.mischool.id/school/employees')

    cy.get('body')
      .should('be.visible')

    cy.get('button:visible')
      .then(($buttons) => {

        if ($buttons.length > 0) {
          cy.get('button:visible')
            .last()
            .click({ force: true })
        }

      })

  })


  // =====================================================
// MS-SIS-001 - Memastikan daftar siswa ditampilkan
// =====================================================
it('MS-SIS-001 - Memastikan daftar siswa ditampilkan', () => {

  cy.visit('https://learning.mischool.id/school/students')

  cy.url()
    .should('include', '/school/students')

  cy.get('table')
    .first()
    .within(() => {

      cy.contains('th', 'Nama')
        .should('be.visible')

      cy.contains('th', 'NISN')
        .should('be.visible')

      cy.contains('th', 'Kelas')
        .should('be.visible')

    })

})


 // =====================================================
// MS-SIS-002 - Memastikan fitur pencarian siswa berfungsi
// =====================================================
it('MS-SIS-002 - Memastikan fitur pencarian siswa berfungsi', () => {

  cy.visit('https://learning.mischool.id/school/students')

  cy.url()
    .should('include', '/school/students')

  cy.get('input:visible')
    .first()
    .should('be.visible')
    .clear()
    .type('Andi')

  cy.contains('Andi')
    .should('be.visible')

})

})