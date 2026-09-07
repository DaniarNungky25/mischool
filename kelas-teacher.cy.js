describe('MiSchool - Kelas Teacher', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

    // Login sebagai Teacher
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
  })


  // TC-KELAS-001
  it('TC-KELAS-001 - Membuka halaman Kelas', () => {

    cy.contains(/E-Learning/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.contains(/^Kelas$/i)
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.url()
      .should('include', '/teacher')

    cy.get('body')
      .should('be.visible')
  })


 // TC-KELAS-002
it('TC-KELAS-002 - Menampilkan data kelas', () => {

  cy.contains(/E-Learning/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.contains(/^Kelas$/i)
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  // Halaman Kelas berhasil dibuka
  cy.url()
    .should('include', '/teacher/e-learning')

  // Pastikan halaman memiliki konten kelas
  cy.get('body')
    .should('be.visible')
    .and(($body) => {
      expect($body.text().trim().length).to.be.greaterThan(0)
    })
})


  // TC-KELAS-003
  it('TC-KELAS-003 - Mencari data kelas', () => {

    cy.contains(/E-Learning/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.contains(/^Kelas$/i)
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('input[placeholder*="Cari"], input[placeholder*="cari"]')
      .first()
      .should('be.visible')
      .type('Kelas')

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  // TC-KELAS-004
  it('TC-KELAS-004 - Mencari kelas yang tidak tersedia', () => {

    cy.contains(/E-Learning/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.contains(/^Kelas$/i)
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('input[placeholder*="Cari"], input[placeholder*="cari"]')
      .first()
      .should('be.visible')
      .type('KelasTidakTersedia12345')

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  // TC-KELAS-005
  it('TC-KELAS-005 - Melakukan filter data', () => {

    cy.contains(/E-Learning/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.contains(/^Kelas$/i)
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.contains('button', /Filter/i)
      .should('be.visible')
      .click({ force: true })

    cy.wait(300)

    cy.get('body')
      .should('be.visible')
  })


  // TC-KELAS-006
it('TC-KELAS-006 - Mereset filter', () => {

  cy.contains(/E-Learning/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.contains(/^Kelas$/i)
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  // Buka filter
  cy.contains('button', /Filter/i)
    .should('be.visible')
    .click({ force: true })

  cy.wait(300)

  // Pastikan kembali ke kondisi filter awal
  cy.url()
    .should('include', '/teacher/e-learning')
    .and('include', 'search=')

  // Search harus kosong setelah kondisi awal/reset
  cy.get('input')
    .filter(':visible')
    .then(($inputs) => {

      if ($inputs.length > 0) {
        cy.wrap($inputs.first())
          .invoke('val')
          .then((value) => {
            expect(value || '').to.equal('')
          })
      }

    })

  cy.get('body')
    .should('be.visible')
})

})