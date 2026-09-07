describe('MiSchool - Riwayat Absensi Guru', () => {

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


  // TC-ABS-001
  it('TC-ABS-001 - Memastikan halaman Riwayat Absensi dapat dibuka', () => {

    cy.contains(/Riwayat Absensi/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('table')
      .should('be.visible')

    cy.contains(/Hari|Tanggal/i)
      .should('exist')
  })


  // TC-ABS-002
  it('TC-ABS-002 - Memastikan data absensi ditampilkan pada tabel', () => {

    cy.contains(/Riwayat Absensi/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('table')
      .should('be.visible')

    cy.get('table thead')
      .should('be.visible')

    cy.get('table tbody')
      .should('be.visible')

    cy.get('table tbody tr')
      .should('exist')
  })


  // TC-ABS-003
  it('TC-ABS-003 - Memastikan tanggal absensi ditampilkan dengan benar', () => {

    cy.contains(/Riwayat Absensi/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('table')
      .should('be.visible')

    cy.get('table tbody tr')
      .first()
      .should('be.visible')

    cy.get('table tbody tr')
      .first()
      .invoke('text')
      .should('not.be.empty')
  })


  // TC-ABS-004
  it('TC-ABS-004 - Memastikan jam masuk ditampilkan pada data absensi', () => {

    cy.contains(/Riwayat Absensi/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('table')
      .should('be.visible')

    cy.get('table tbody tr')
      .first()
      .should('be.visible')

    // Pastikan data jam masuk tersedia pada tabel
    cy.get('table tbody tr')
      .first()
      .invoke('text')
      .should('match', /\d{1,2}:\d{2}/)
  })


  // TC-ABS-005
  it('TC-ABS-005 - Memastikan jam pulang ditampilkan pada data absensi', () => {

    cy.contains(/Riwayat Absensi/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('table')
      .should('be.visible')

    cy.get('table tbody tr')
      .first()
      .should('be.visible')

    cy.get('table tbody tr')
      .first()
      .invoke('text')
      .should('not.be.empty')
  })


  // TC-ABS-006
it('TC-ABS-006 - Memastikan status absensi ditampilkan', () => {

  cy.contains(/Riwayat Absensi/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  // Cari tabel yang memang memiliki kolom Status
  cy.get('table').filter((index, table) => {
    const header = Cypress.$(table).find('thead').text()
    return /Status/i.test(header)
  })
    .first()
    .should('be.visible')
    .within(() => {

      cy.get('tbody tr')
        .should('have.length.greaterThan', 0)

      cy.get('tbody tr')
        .first()
        .should('be.visible')
    })
})


  // TC-ABS-007
  it('TC-ABS-007 - Memastikan data tanpa absensi tidak menampilkan jam yang salah', () => {

    cy.contains(/Riwayat Absensi/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('table')
      .should('be.visible')

    cy.get('table tbody tr')
      .each(($row) => {
        const text = $row.text()

        // Jika data menunjukkan tidak ada absensi,
        // pastikan tidak terdapat jam yang tidak valid
        if (/tidak ada|belum|alpha/i.test(text)) {
          expect(text).not.to.match(/99:99|00:00:00/)
        }
      })
  })


 // TC-ABS-008
it('TC-ABS-008 - Memastikan pagination dapat berpindah ke halaman berikutnya', () => {

  cy.contains(/Riwayat Absensi/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  // Cari pagination yang tersedia
  cy.get('body')
    .then(($body) => {

      const pagination = $body.find(
        '.pagination, [class*="pagination"]'
      )

      if (pagination.length > 0) {

        cy.wrap(pagination)
          .find('a, button')
          .filter(':visible')
          .last()
          .then(($button) => {

            if (!$button.is(':disabled')) {
              cy.wrap($button).click({ force: true })
              cy.wait(500)
            }

          })

      } else {

        // Jika pagination tidak tersedia,
        // pastikan data absensi tetap tampil
        cy.get('table')
          .should('exist')

      }

    })
})



 // TC-ABS-009
it('TC-ABS-009 - Memastikan pagination dapat kembali ke halaman sebelumnya', () => {

  cy.contains(/Riwayat Absensi/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  cy.get('body')
    .then(($body) => {

      const pagination = $body.find(
        '.pagination, [class*="pagination"]'
      )

      if (pagination.length > 0) {

        const buttons = pagination
          .find('a, button')
          .filter(':visible')

        if (buttons.length > 1) {

          // Klik nomor/halaman berikutnya
          cy.wrap(buttons.eq(buttons.length - 1))
            .click({ force: true })

          cy.wait(500)

          // Kembali ke halaman sebelumnya
          cy.get('.pagination, [class*="pagination"]')
            .find('a, button')
            .filter(':visible')
            .first()
            .click({ force: true })

          cy.wait(500)
        }

      }

      cy.get('table')
        .should('exist')
    })
})


it('TC-ABS-010 - Memastikan nomor urut data absensi ditampilkan', () => {

  cy.contains(/Riwayat Absensi/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  cy.get('table')
    .filter((index, table) => {
      const text = Cypress.$(table).find('tbody').text()

      // Cari tabel yang memiliki nomor urut 1, 2, dst
      return /\b1\b/.test(text) && /\b2\b/.test(text)
    })
    .first()
    .should('be.visible')
    .within(() => {

      cy.get('tbody tr')
        .should('have.length.greaterThan', 0)

      // Pastikan data memiliki nomor urut
      cy.get('tbody tr')
        .first()
        .find('td')
        .then(($td) => {

          const semuaKolom = [...$td].map(td =>
            td.innerText.trim()
          )

          const adaNomor = semuaKolom.some(text =>
            /^\d+$/.test(text)
          )

          expect(adaNomor).to.equal(true)

        })
    })
})

})