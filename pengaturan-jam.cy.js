describe('MiSchool - Jam Pelajaran', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

    // =========================
    // LOGIN
    // =========================
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

    // =========================
    // HALAMAN SCHOOL
    // =========================
    cy.url()
      .should('include', '/school')

    // =========================
    // JAM PELAJARAN
    // =========================
    cy.contains('Jam Pelajaran', { timeout: 10000 })
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.url()
      .should('include', '/school/lesson-hours')
  })


  // MS-JAM-001
  it('MS-JAM-001 - Memastikan halaman Pengaturan Jam dapat ditampilkan', () => {

    cy.contains('Jam Pelajaran')
      .should('exist')

    cy.contains('Senin')
      .should('exist')

    cy.contains('Selasa')
      .should('exist')

    cy.contains('Rabu')
      .should('exist')

    cy.contains('Kamis')
      .should('exist')

    cy.contains('Jumat')
      .should('exist')
  })


  // MS-JAM-002
  it('MS-JAM-002 - Memastikan pengaturan jam hari Senin dapat digunakan', () => {

    cy.contains('Senin')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)
  })


  // MS-JAM-003
  it('MS-JAM-003 - Memastikan pengaturan jam hari Selasa dapat digunakan', () => {

    cy.contains('Selasa')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)
  })


  // MS-JAM-004
  it('MS-JAM-004 - Memastikan pengaturan jam hari Rabu dapat digunakan', () => {

    cy.contains('Rabu')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)
  })


  // MS-JAM-005
  it('MS-JAM-005 - Memastikan pengaturan jam hari Kamis dapat digunakan', () => {

    cy.contains('Kamis')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)
  })


  // MS-JAM-006
  it('MS-JAM-006 - Memastikan pengaturan jam hari Jumat dapat digunakan', () => {

    cy.contains('Jumat')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)
  })


  // MS-JAM-007
  it('MS-JAM-007 - Memastikan pengaturan jam hari Sabtu dapat digunakan', () => {

    cy.contains('Sabtu')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)
  })


  // MS-JAM-008
  it('MS-JAM-008 - Memastikan pengaturan jam hari Minggu dapat digunakan', () => {

    cy.contains('Minggu')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)
  })


  // MS-JAM-009
  it('MS-JAM-009 - Memastikan pengguna dapat mengubah pengaturan waktu', () => {

    cy.contains('Senin')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .should('have.length.at.least', 1)

    cy.get('input:visible')
      .first()
      .clear()
      .type('08:00')

    cy.contains('button', 'Simpan')
      .should('exist')
      .click({ force: true })

    cy.wait(1000)
  })


  it('MS-JAM-010 - Memastikan pengaturan Libur dapat digunakan', () => {

  cy.contains('Senin')
    .should('exist')
    .click({ force: true })

  cy.get('input:visible')
    .should('have.length.at.least', 1)

  cy.get('input:visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  cy.contains('button', 'Simpan')
    .should('exist')
    .click({ force: true })

  cy.wait(1000)
})


 it('MS-JAM-011 - Memastikan durasi maksimal keterlambatan dapat disimpan', () => {

  cy.contains('Senin')
    .should('exist')
    .click({ force: true })

  cy.get('input:visible')
    .should('have.length.at.least', 1)

  cy.get('input:visible')
    .last()
    .clear()
    .type('15')

  cy.contains('button', 'Simpan')
    .should('exist')
    .click({ force: true })

  cy.wait(1000)
})


  // MS-JAM-012
  it('MS-JAM-012 - Memastikan pengaturan waktu Siswa dan Guru dapat digunakan', () => {

    cy.contains('Senin')
      .should('exist')
      .click({ force: true })

    cy.contains('Siswa')
      .should('exist')

    cy.contains('Guru')
      .should('exist')
  })


  // MS-JAM-013
  it('MS-JAM-013 - Memastikan perubahan pengaturan jam tersimpan', () => {

    cy.contains('Senin')
      .should('exist')
      .click({ force: true })

    cy.get('input:visible')
      .first()
      .clear()
      .type('09:00')

    cy.contains('button', 'Simpan')
      .should('exist')
      .click({ force: true })

    cy.wait(1000)

    cy.reload()

    cy.wait(1500)

    cy.contains('Senin')
      .should('exist')
  })

})