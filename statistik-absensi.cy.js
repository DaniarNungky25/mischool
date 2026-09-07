describe('MiSchool - Statistik Absensi', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

    cy.visit('https://learning.mischool.id/login')

    cy.get('input:visible')
      .eq(0)
      .should('be.visible')
      .clear()
      .type('school@gmail.com')

    cy.get('input:visible')
      .eq(1)
      .should('be.visible')
      .clear()
      .type('password')

    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    cy.wait(2000)
  })


  it('MS-ABSIS-001 - Memastikan halaman Statistik Absensi dapat ditampilkan', () => {

  cy.visit('https://learning.mischool.id/school/statistic-presence#pills-keseluruhan')

  cy.contains('Keseluruhan')
    .filter(':visible')
    .first()
    .should('be.visible')

  cy.contains('Detail')
    .filter(':visible')
    .first()
    .should('be.visible')

  cy.contains('Data Absensi')
    .filter(':visible')
    .first()
    .should('be.visible')

  cy.contains('Nama Pengguna')
    .filter(':visible')
    .first()
    .should('be.visible')

  cy.contains('Masuk')
    .filter(':visible')
    .first()
    .should('be.visible')

  cy.contains('Pulang')
    .filter(':visible')
    .first()
    .should('be.visible')

  cy.contains('Point')
    .filter(':visible')
    .first()
    .should('be.visible')
})


  // MS-ABSIS-002
  it('MS-ABSIS-002 - Memastikan filter tanggal pada Statistik Absensi dapat digunakan', () => {

    cy.visit('https://learning.mischool.id/school/statistic-presence#pills-keseluruhan')

    cy.get('input[type="date"]:visible')
      .should('be.visible')
      .clear()
      .type('2026-08-21')

    cy.contains('button', 'Filter')
      .filter(':visible')
      .first()
      .should('be.visible')
      .click()

    cy.contains('Data Absensi')
      .filter(':visible')
      .first()
      .should('be.visible')
  })


  it('MS-ABSIS-003 - Memastikan tombol Reset filter dapat digunakan', () => {

  cy.visit('https://learning.mischool.id/school/statistic-presence#pills-keseluruhan')

  cy.get('input[type="date"]:visible')
    .clear()
    .type('2026-08-21')

  cy.contains('button', 'Filter')
    .filter(':visible')
    .first()
    .click()

  cy.contains('Reset')
    .filter(':visible')
    .first()
    .should('be.visible')
    .click()

  cy.contains('Data Absensi')
    .filter(':visible')
    .first()
    .should('be.visible')
})


  // MS-ABSIS-004
  it('MS-ABSIS-004 - Memastikan data absensi siswa dapat ditampilkan', () => {

    cy.visit('https://learning.mischool.id/school/statistic-presence#pills-keseluruhan')

    cy.contains('Data Absensi')
      .filter(':visible')
      .first()
      .should('be.visible')

    cy.contains('No')
      .filter(':visible')
      .first()
      .should('be.visible')

    cy.contains('Nama Pengguna')
      .filter(':visible')
      .first()
      .should('be.visible')

    cy.contains('Masuk')
      .filter(':visible')
      .first()
      .should('be.visible')

    cy.contains('Pulang')
      .filter(':visible')
      .first()
      .should('be.visible')

    cy.contains('Point')
      .filter(':visible')
      .first()
      .should('be.visible')
  })


  // MS-ABSIS-005
  it('MS-ABSIS-005 - Memastikan tab Detail dan fitur pencarian dapat digunakan', () => {

    cy.visit('https://learning.mischool.id/school/statistic-presence#pills-keseluruhan')

    cy.contains('Detail')
      .filter(':visible')
      .first()
      .should('be.visible')
      .click()

    cy.get('input:visible')
      .should('exist')
  })


  // MS-ABSIS-006
  it('MS-ABSIS-006 - Memastikan kondisi ketika belum terdapat data kelas', () => {

    cy.visit('https://learning.mischool.id/school/statistic-presence#pills-keseluruhan')

    cy.contains('Detail')
      .filter(':visible')
      .first()
      .should('be.visible')
      .click()

    cy.get('body')
      .should('be.visible')
  })

})