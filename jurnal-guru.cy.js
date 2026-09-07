describe('MiSchool - Jurnal Mengajar', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

    // LOGIN
    cy.visit('https://learning.mischool.id/login')

    cy.get('#email')
      .should('be.visible')
      .clear()
      .type('school@gmail.com')

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type('password')

    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    // Pastikan berhasil login
    cy.url({ timeout: 15000 })
      .should('include', '/school')

    // Buka menu Jurnal Guru
    cy.contains('Jurnal Guru', { timeout: 15000 })
      .click({ force: true })

    // Pastikan halaman Jurnal Mengajar terbuka
    cy.contains('Jurnal Mengajar', { timeout: 15000 })
      .should('be.visible')
  })


  // =====================================================
  // MS-JRN-001
  // =====================================================
  it('MS-JRN-001 - Memastikan halaman Jurnal Mengajar dapat ditampilkan', () => {

    cy.contains('Semua')
      .should('be.visible')

    cy.contains('Mengisi')
      .should('be.visible')

    cy.contains('Tidak Mengisi')
      .should('be.visible')

    cy.contains('Download Jurnal')
      .should('be.visible')

    cy.contains('Cari')
      .should('be.visible')
  })


  // =====================================================
  // MS-JRN-002
  // =====================================================
  it('MS-JRN-002 - Memastikan tab Semua dapat menampilkan seluruh data jurnal', () => {

    cy.contains('Semua')
      .should('be.visible')
      .click()

    cy.get('table', { timeout: 10000 })
      .should('be.visible')

    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0)
  })


  // =====================================================
  // MS-JRN-003
  // =====================================================
  it('MS-JRN-003 - Memastikan tab Mengisi dapat menampilkan jurnal yang sudah diisi', () => {

    cy.contains('Mengisi')
      .should('be.visible')
      .click()

    cy.get('table', { timeout: 10000 })
      .should('be.visible')

    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0)
  })


  // =====================================================
  // MS-JRN-004
  // =====================================================
  it('MS-JRN-004 - Memastikan tab Tidak Mengisi dapat menampilkan jurnal yang belum diisi', () => {

    cy.contains('Tidak Mengisi')
      .should('be.visible')
      .click()

    cy.get('table', { timeout: 10000 })
      .should('be.visible')

    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0)
  })


  // =====================================================
  // MS-JRN-005
  // =====================================================
  it('MS-JRN-005 - Memastikan fitur pencarian jurnal dapat digunakan', () => {

    cy.get('input:visible')
      .first()
      .should('be.visible')
      .clear()
      .type('staff')

    cy.contains('Cari')
      .should('be.visible')
      .click({ force: true })

    cy.get('table', { timeout: 10000 })
      .should('be.visible')
  })


it('MS-JRN-006 - Memastikan tombol Download Jurnal dan aksi detail dapat digunakan', () => {

  // Pastikan halaman Jurnal Mengajar
  cy.contains('Jurnal Mengajar')
    .should('be.visible')

  // Klik Download Jurnal
  cy.contains('Download Jurnal')
    .should('be.visible')
    .click({ force: true })

  // Pastikan masuk halaman export jurnal
  cy.url()
    .should('include', '/school/export-journal')

  // Pastikan tabel jurnal tampil
  cy.get('table')
    .should('be.visible')

  // Pastikan data jurnal tersedia
  cy.get('table tbody tr')
    .should('have.length.greaterThan', 0)

  // Pastikan setiap baris jurnal memiliki isi
  cy.get('table tbody tr')
    .first()
    .should('not.be.empty')

  // Pastikan kolom aksi/detail tersedia pada tabel
  cy.get('table thead tr')
    .first()
    .find('th')
    .should('have.length.greaterThan', 0)
})

})