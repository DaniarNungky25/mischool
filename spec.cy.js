describe('MiSchool - School Testing', () => {

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

    cy.url().should('include', '/school')
  })


  // MS-LOGIN-001
  it('MS-LOGIN-001 - Login menggunakan akun school', () => {
    cy.url().should('include', '/school')
  })


  // MS-DASH-001
it('MS-DASH-001 - Memastikan tab Absensi Siswa dapat diakses', () => {

  cy.contains('Data Absensi Hari Ini')
    .should('be.visible')
    .parent()
    .parent()
    .within(() => {

      cy.contains('Siswa')
        .click({ force: true })

    })

  cy.contains('Jumlah Siswa Telat Absen')
    .should('be.visible')
})


  // MS-DASH-002
it('MS-DASH-002 - Memastikan tab Absensi Guru dapat diakses', () => {

  cy.contains('Data Absensi Hari Ini')
    .should('be.visible')
    .parent()
    .parent()
    .within(() => {

      cy.contains('Guru')
        .click({ force: true })

    })

  cy.contains('Data Absensi Hari Ini')
    .should('be.visible')
})

  // MS-DASH-003
  it('MS-DASH-003 - Memastikan filter tanggal pada absensi berfungsi', () => {

    cy.contains('Data Absensi Hari Ini')
      .should('be.visible')

    cy.get('input[type="date"]:visible')
      .clear()
      .type('2026-08-06')

    cy.contains('Cari')
      .click()

    cy.get('input[type="date"]:visible')
      .should('have.value', '2026-08-06')
  })


  // MS-DASH-004
  it('MS-DASH-004 - Memastikan data jurnal guru ditampilkan', () => {

    cy.contains('Data Jurnal Guru Hari Ini')
      .scrollIntoView()
      .should('be.visible')

  })


  // MS-DASH-005
  it('MS-DASH-005 - Memastikan informasi data pelanggaran ditampilkan', () => {

    cy.contains('Data Pelanggaran')
      .scrollIntoView()
      .should('be.visible')

  })

})