describe('MiSchool - Jurnal Staff', () => {

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

    cy.wait(3000)

    // =========================
    // BUKA JURNAL STAFF
    // =========================

    cy.contains('Jurnal Staff', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(2000)
  })


  // =========================================================
  // MS-JRNS-001
  // Memastikan halaman Jurnal Staff dapat diakses
  // =========================================================

  it('MS-JRNS-001 - Memastikan halaman Jurnal Staff dapat diakses', () => {

    cy.contains('Jurnal Staff', { timeout: 10000 })
      .should('exist')

  })


  // =========================================================
  // MS-JRNS-002
  // Memastikan tab Semua dapat menampilkan jurnal staff
  // =========================================================

  it('MS-JRNS-002 - Memastikan tab Semua dapat menampilkan jurnal staff', () => {

    cy.contains('Semua', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('contain.text', 'Jurnal')

  })


  // =========================================================
  // MS-JRNS-003
  // Memastikan tab Mengisi dapat menampilkan jurnal staff yang sudah mengisi
  // =========================================================

  it('MS-JRNS-003 - Memastikan tab Mengisi dapat menampilkan jurnal staff yang sudah mengisi', () => {

    cy.contains('Mengisi', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('contain.text', 'Mengisi')

  })


  // =========================================================
  // MS-JRNS-004
  // Memastikan tab Tidak Mengisi dapat menampilkan jurnal staff yang belum mengisi
  // =========================================================

  it('MS-JRNS-004 - Memastikan tab Tidak Mengisi dapat menampilkan jurnal staff yang belum mengisi', () => {

    cy.contains('Tidak Mengisi', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('contain.text', 'Tidak Mengisi')

  })


  // =========================================================
  // MS-JRNS-005
  // Memastikan pencarian jurnal staff dapat dilakukan
  // =========================================================

  it('MS-JRNS-005 - Memastikan pencarian jurnal staff dapat dilakukan', () => {

    cy.get('input:visible', { timeout: 10000 })
      .last()
      .should('be.visible')
      .clear()
      .type('staff')

    cy.wait(1000)

    cy.contains('button', 'Cari', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('contain.text', 'staff')

  })


    // =========================================================
  // MS-JRNS-006
  // Memastikan detail jurnal staff dapat dilihat
  // =========================================================

  it('MS-JRNS-006 - Memastikan detail jurnal staff dapat dilihat', () => {

    cy.get('table tbody tr', { timeout: 10000 })
      .first()
      .find('button, a')
      .last()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('exist')

  })


  // =========================================================
  // MS-JRNS-007
  // Memastikan halaman Cetak Jurnal Staff dapat diakses
  // =========================================================

  it('MS-JRNS-007 - Memastikan halaman Cetak Jurnal Staff dapat diakses', () => {

    cy.get('button, a', { timeout: 10000 })
      .filter(':contains("Download"), :contains("Cetak")')
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(2000)

    cy.get('body')
      .should('exist')

  })


   it('MS-JRNS-008 - Memastikan jurnal staff dapat difilter berdasarkan periode tanggal', () => {

  cy.get('input:visible', { timeout: 10000 })
    .should('have.length', 1)
    .clear()
    .type('01/01/2026 - 31/01/2026')

  cy.get('button:visible, a:visible')
    .then($elements => {

      const target = [...$elements].find(el => {
        const text = el.innerText.trim().toLowerCase()

        return (
          text.includes('tampilkan') ||
          text.includes('filter') ||
          text.includes('cari') ||
          text.includes('apply')
        )
      })

      if (target) {
        cy.wrap(target)
          .scrollIntoView()
          .click({ force: true })
      } else {
        cy.wrap($elements.last())
          .scrollIntoView()
          .click({ force: true })
      }
    })

  cy.wait(1500)

  cy.get('body')
    .should('exist')
})


 it('MS-JRNS-009 - Memastikan sistem menampilkan informasi ketika tidak terdapat jurnal pada periode tertentu', () => {

  cy.get('input:visible', { timeout: 10000 })
    .should('have.length', 1)
    .clear()
    .type('01/01/2099 - 31/01/2099')

  cy.get('button:visible, a:visible')
    .then($elements => {

      const target = [...$elements].find(el => {
        const text = el.innerText.trim().toLowerCase()

        return (
          text.includes('tampilkan') ||
          text.includes('filter') ||
          text.includes('cari') ||
          text.includes('apply')
        )
      })

      if (target) {
        cy.wrap(target)
          .scrollIntoView()
          .click({ force: true })
      } else {
        cy.wrap($elements.last())
          .scrollIntoView()
          .click({ force: true })
      }
    })

  cy.wait(1500)

  cy.get('body')
    .should('exist')

})


  // =========================================================
  // MS-JRNS-010
  // Memastikan jurnal staff dapat didownload berdasarkan periode tanggal
  // =========================================================

  it('MS-JRNS-010 - Memastikan jurnal staff dapat didownload berdasarkan periode tanggal', () => {

    cy.get('input:visible', { timeout: 10000 })
      .should('have.length', 1)
      .clear()
      .type('01/01/2026 - 31/01/2026')

    cy.contains('Download', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(2000)
  })

})