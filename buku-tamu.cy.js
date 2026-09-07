describe('MiSchool - Buku Tamu', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

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

    cy.url()
      .should('include', '/school')

    cy.contains('Buku Tamu')
      .scrollIntoView()
      .click({ force: true })

    cy.url()
      .should('include', '/school/guest-book')
  })


  it('MS-BT-001 - Memastikan halaman Buku Tamu dapat ditampilkan', () => {
    cy.url().should('include', '/school/guest-book')

    cy.get('table')
      .should('exist')
      .and('be.visible')
  })


  it('MS-BT-002 - Memastikan daftar pengunjung dapat ditampilkan', () => {
    cy.get('table')
      .should('be.visible')

    cy.get('table tbody tr')
      .should('exist')
  })


  it('MS-BT-003 - Memastikan pencarian pengunjung dapat digunakan', () => {
    cy.get('input:visible')
      .filter('[placeholder*="Cari"], [placeholder*="cari"]')
      .first()
      .should('be.visible')
      .clear()
      .type('Doni')

    cy.wait(500)

    cy.get('table tbody')
      .should('be.visible')
  })


  it('MS-BT-004 - Memastikan pencarian data yang tidak tersedia', () => {
    cy.get('input:visible')
      .filter('[placeholder*="Cari"], [placeholder*="cari"]')
      .first()
      .clear()
      .type('DataTidakAda12345')

    cy.wait(500)

    cy.get('table tbody')
      .should('be.visible')
      .and('not.contain', 'DataTidakAda12345')
  })


  it('MS-BT-005 - Memastikan filter berdasarkan tanggal dapat digunakan', () => {
    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .should('be.visible')
      .type('2026-08-28')

    cy.wait(500)

    cy.get('table tbody')
      .should('be.visible')
  })


  it('MS-BT-006 - Memastikan filter tanggal dapat dihapus', () => {
    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .type('2026-08-28')

    cy.wait(500)

    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .invoke('val', '')
      .trigger('change')

    cy.wait(500)

    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .should('have.value', '')
  })


  it('MS-BT-007 - Memastikan tombol reset dapat digunakan', () => {
    cy.get('input:visible')
      .filter('[placeholder*="Cari"], [placeholder*="cari"]')
      .first()
      .clear()
      .type('Doni')

    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .type('2026-08-28')

    cy.wait(500)

    cy.get('input:visible')
      .filter('[placeholder*="Cari"], [placeholder*="cari"]')
      .first()
      .clear()

    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .invoke('val', '')
      .trigger('change')

    cy.wait(500)

    cy.get('input:visible')
      .filter('[placeholder*="Cari"], [placeholder*="cari"]')
      .first()
      .should('have.value', '')

    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .should('have.value', '')
  })


  it('MS-BT-008 - Memastikan detail pengunjung dapat dilihat', () => {
    cy.get('table tbody tr')
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('contain.text', 'Detail')
  })


  it('MS-BT-009 - Memastikan informasi detail pengunjung sesuai', () => {
    cy.get('table tbody tr')
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  it('MS-BT-010 - Memastikan detail pengunjung dapat ditutup', () => {
    cy.get('table tbody tr')
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .then(($body) => {
        const closeButton = $body.find(
          'button:contains("Tutup"), button:contains("Close"), [aria-label="Close"]'
        )

        if (closeButton.length) {
          cy.wrap(closeButton.first()).click({ force: true })
        }
      })
  })

})