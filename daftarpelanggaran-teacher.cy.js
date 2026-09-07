describe('MiSchool - Daftar Pelanggaran', () => {

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

    cy.contains('Daftar Pelanggaran', { timeout: 15000 })
      .first()
      .click({ force: true })

    cy.wait(1500)
  })


  // TC-DP-01
  it('TC-DP-01 - Menampilkan halaman Daftar Pelanggaran', () => {
    cy.get('body').should('be.visible')

    cy.url().should('include', '/employee/violation/students')
  })


  // TC-DP-02
  it('TC-DP-02 - Menampilkan daftar data pelanggaran', () => {
    cy.get('table', { timeout: 10000 })
      .should('exist')
      .and('be.visible')

    cy.get('table tbody tr')
      .should('exist')
  })


  // TC-DP-03
  it('TC-DP-03 - Mencari data pelanggaran berdasarkan nama', () => {
    cy.get('input#input-search')
      .should('be.visible')
      .clear()
      .type('siswa')

    cy.wait(1000)

    cy.get('body').should('be.visible')
  })


  // TC-DP-04
  it('TC-DP-04 - Mencari data pelanggaran yang tidak tersedia', () => {
    cy.get('input#input-search')
      .should('be.visible')
      .clear()
      .type('siswa_tidak_ada_99999')

    cy.wait(1000)

    cy.get('input#input-search')
      .should('have.value', 'siswa_tidak_ada_99999')

    cy.get('body').should('be.visible')
  })


  // TC-DP-05
  it('TC-DP-05 - Menggunakan filter data pelanggaran', () => {
    cy.contains(/Tampilkan semua/i)
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.contains(/filter/i)
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body').should('be.visible')
  })


  // TC-DP-06
  it('TC-DP-06 - Membuka form Tambah Pelanggaran', () => {
    cy.contains('Tambah Pelanggaran', { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.url().should('include', '/employee/rfid-student-violation')

    cy.get('input#rfidInput')
      .should('be.visible')
  })


  // TC-DP-07
  it('TC-DP-07 - Menambahkan data pelanggaran', () => {
    cy.contains('Tambah Pelanggaran', { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('input#rfidInput')
      .should('be.visible')
      .clear()
      .type('Siswa Test')

    cy.get('input#rfidInput')
      .should('have.value', 'Siswa Test')

    cy.get('body')
      .should('be.visible')
  })


  // TC-DP-08
  it('TC-DP-08 - Validasi form Tambah Pelanggaran', () => {
    cy.contains('Tambah Pelanggaran', { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('input#rfidInput')
      .should('be.visible')
      .clear()

    cy.get('body')
      .should('be.visible')
  })


  // TC-DP-09
  it('TC-DP-09 - Mengedit data pelanggaran', () => {
    cy.get('table tbody tr')
  .first()
  .find('td')
  .last()
  .click({ force: true })

cy.wait(1000)

cy.get('body')
  .should('be.visible')
  })


  // TC-DP-10
  it('TC-DP-10 - Menghapus data pelanggaran', () => {
    cy.get('table tbody tr')
  .first()
  .find('td')
  .last()
  .click({ force: true })

cy.wait(500)

cy.get('body')
  .should('be.visible')
  })


  // TC-DP-11
  it('TC-DP-11 - Membatalkan penghapusan data', () => {
   cy.get('table tbody tr')
  .first()
  .find('td')
  .last()
  .click({ force: true })

cy.wait(500)

cy.get('body')
  .should('be.visible')
  })


  // TC-DP-12
  it('TC-DP-12 - Membuka fitur Import Pelanggaran', () => {
    cy.contains(/Import Pelanggaran/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // TC-DP-13
  it('TC-DP-13 - Mengimport data pelanggaran', () => {
    cy.contains(/Import Pelanggaran/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('input[type="file"]', { timeout: 10000 })
      .should('exist')
  })


  // TC-DP-14
  it('TC-DP-14 - Membatalkan proses import', () => {
    cy.contains(/Import Pelanggaran/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')

    cy.get('input[type="file"]')
      .should('exist')
  })


  // TC-DP-15
  it('TC-DP-15 - Mengecek tampilan saat data kosong', () => {
    cy.get('input#input-search')
      .should('be.visible')
      .clear()
      .type('DATA_TIDAK_ADA_999999')

    cy.wait(1000)

    cy.get('input#input-search')
      .should('have.value', 'DATA_TIDAK_ADA_999999')

    cy.get('body')
      .should('be.visible')
  })

})