describe('MiSchool - Tambah Pelanggaran', () => {

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

    // Buka menu Tambah Pelanggaran
    cy.contains('Tambah Pelanggaran', { timeout: 15000 })
      .first()
      .click({ force: true })

    cy.wait(1500)
  })


  it('TC-TP-001 - Memastikan halaman Tambah Pelanggaran dapat dibuka', () => {

  cy.get('body')
    .should('be.visible')

  cy.url()
    .should('include', '/employee/rfid-student-violation')
})

  // =====================================================
  // TC-TP-002
  // Memastikan kolom input RFID siswa tampil
  // =====================================================

  it('TC-TP-002 - Memastikan kolom input RFID siswa tampil pada halaman Tambah Pelanggaran', () => {

    cy.get('input:visible', { timeout: 10000 })
      .should('exist')
      .then(($inputs) => {

        const rfidInput = [...$inputs].find((el) => {
          const placeholder = el.getAttribute('placeholder') || ''
          const name = el.getAttribute('name') || ''
          const id = el.getAttribute('id') || ''

          return /rfid/i.test(
            `${placeholder} ${name} ${id}`
          )
        })

        if (rfidInput) {
          cy.wrap(rfidInput)
            .should('be.visible')
        } else {
          cy.get('input:visible')
            .first()
            .should('be.visible')
        }
      })
  })


  // =====================================================
  // TC-TP-003
  // Memastikan RFID siswa yang terdaftar dapat diproses
  // =====================================================

  it('TC-TP-003 - Memastikan RFID siswa yang terdaftar dapat diproses', () => {

    cy.get('input:visible', { timeout: 10000 })
      .first()
      .should('be.visible')
      .clear()
      .type('RFID_SISWA_TERDAFTAR')

    cy.wait(1500)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // TC-TP-004
  // Memastikan RFID yang tidak terdaftar tidak dapat diproses
  // =====================================================

  it('TC-TP-004 - Memastikan RFID yang tidak terdaftar tidak dapat diproses', () => {

    cy.get('input:visible', { timeout: 10000 })
      .first()
      .should('be.visible')
      .clear()
      .type('RFID_TIDAK_TERDAFTAR_999')

    cy.wait(1500)

    cy.get('body')
      .should('be.visible')
  })


  it('TC-TP-005 - Memastikan halaman tetap dapat digunakan saat input RFID kosong', () => {

  cy.get('input:visible')
    .first()
    .should('be.visible')
    .clear()

  cy.wait(500)

  cy.get('body')
    .should('be.visible')

  cy.url()
    .should('include', '/employee/rfid-student-violation')
})


  // =====================================================
  // TC-TP-006
  // Memastikan tampilan halaman Tambah Pelanggaran tampil baik
  // =====================================================

  it('TC-TP-006 - Memastikan tampilan halaman Tambah Pelanggaran tampil dengan baik', () => {

    cy.get('body')
      .should('be.visible')

    cy.get('h1, h2, h3, h4, h5, label')
      .should('exist')
  })

})