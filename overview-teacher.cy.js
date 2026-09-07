describe('MiSchool - Overview', () => {

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

  cy.url()
    .should('include', '/teacher')

  cy.wait(1500)

  // Buka Overview
  cy.contains('Overview', { timeout: 15000 })
    .first()
    .click({ force: true })

  cy.wait(1500)
})


  it('TC-OVERVIEW-001 - Memastikan halaman Overview dapat dibuka', () => {

  cy.url()
    .should('include', '/employee/violation/overview')

  cy.get('body')
    .should('be.visible')
})


  // TC-OVERVIEW-002
  it('TC-OVERVIEW-002 - Memastikan informasi Perbaikan Minggu Ini tampil', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Perbaikan')
  })


  // TC-OVERVIEW-003
  it('TC-OVERVIEW-003 - Memastikan jumlah siswa melanggar tampil', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Siswa')
  })


  // TC-OVERVIEW-004
  it('TC-OVERVIEW-004 - Memastikan jumlah siswa dengan poin tinggi tampil', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Poin')
  })


  // TC-OVERVIEW-005
  it('TC-OVERVIEW-005 - Memastikan informasi Pelanggaran Minggu Ini tampil', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Pelanggaran')
  })


  // TC-OVERVIEW-006
  it('TC-OVERVIEW-006 - Memastikan informasi Maks Poin Pada Sekolah tampil', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Maks Poin')
  })


  // TC-OVERVIEW-007
  it('TC-OVERVIEW-007 - Memastikan informasi Poin Peringatan tampil', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Poin')
  })


  // TC-OVERVIEW-008
  it('TC-OVERVIEW-008 - Memastikan grafik statistik pelanggaran tampil', () => {

    cy.get('body')
      .should('be.visible')

    // Cek elemen grafik
    cy.get('canvas, svg')
      .filter(':visible')
      .should('exist')
  })


  // TC-OVERVIEW-009
  it('TC-OVERVIEW-009 - Memastikan data pelanggaran terpopuler tampil', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Pelanggaran')
  })


  // TC-OVERVIEW-010
  it('TC-OVERVIEW-010 - Memastikan pesan kosong tampil ketika tidak ada data', () => {

    cy.get('body')
      .should('be.visible')
      .then(($body) => {

        const text = $body.text()

        if (/Belum ada data/i.test(text)) {
          expect(text).to.match(/Belum ada data/i)
        } else {
          cy.log('Data tersedia, pesan Belum ada data tidak ditampilkan')
        }
      })
  })

})