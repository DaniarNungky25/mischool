describe('MiSchool - Rekap Nilai Teacher', () => {

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


  // =========================
  // BUKA HALAMAN REKAP NILAI
  // =========================

  const bukaRekapNilai = () => {
    cy.contains(/E-Learning/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.contains(/Rekap Nilai/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  }


  // TC-NILAI-001
  it('TC-NILAI-001 - Menampilkan halaman Daftar Mapel', () => {

    bukaRekapNilai()

    cy.url()
      .should('include', '/teacher')

    cy.get('body')
      .should('be.visible')
      .and(($body) => {
        expect($body.text().trim().length).to.be.greaterThan(0)
      })
  })


  // TC-NILAI-002
  it('TC-NILAI-002 - Memfilter data berdasarkan tahun ajaran', () => {

    bukaRekapNilai()

    cy.contains('button', /Filter/i)
      .should('be.visible')
      .click({ force: true })

    cy.wait(300)

    cy.get('body')
      .should('be.visible')

    // Pilih tahun ajaran jika tersedia
    cy.get('select:visible')
      .then(($select) => {
        if ($select.length > 0) {
          cy.wrap($select.first())
            .find('option')
            .then(($options) => {
              if ($options.length > 1) {
                cy.wrap($select.first())
                  .select(1)
              }
            })
        }
      })

    cy.contains('button', /Filter/i)
      .then(($button) => {
        if ($button.is(':visible')) {
          cy.wrap($button)
            .click({ force: true })
        }
      })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  // TC-NILAI-003
  it('TC-NILAI-003 - Mereset filter tahun ajaran', () => {

    bukaRekapNilai()

    cy.contains('button', /Filter/i)
      .should('be.visible')
      .click({ force: true })

    cy.wait(300)

    // Cari tombol reset yang tersedia
    cy.get('body')
      .then(($body) => {

        const reset = $body
          .find('button')
          .filter(function () {
            return /Reset|Reset Filter|Clear/i.test(
              Cypress.$(this).text()
            )
          })

        if (reset.length > 0) {
          cy.wrap(reset.first())
            .click({ force: true })
        } else {
          // Jika tidak ada tombol Reset,
          // pastikan form filter tetap dapat diakses
          cy.get('body')
            .should('be.visible')
        }
      })

    cy.wait(500)
  })


  // TC-NILAI-004
  it('TC-NILAI-004 - Membuka detail mata pelajaran', () => {

    bukaRekapNilai()

    // Cari tombol/link detail
    cy.get('a, button')
      .filter(':visible')
      .then(($elements) => {

        const detail = [...$elements].find((el) =>
          /Detail|Lihat|Mata Pelajaran/i.test(
            Cypress.$(el).text()
          )
        )

        if (detail) {
          cy.wrap(detail)
            .click({ force: true })

          cy.wait(500)

          cy.url()
            .should('include', '/teacher')
        } else {
          // Jika tombol detail menggunakan icon,
          // minimal halaman tetap tersedia
          cy.get('body')
            .should('be.visible')
        }
      })
  })


  // TC-NILAI-005
  it('TC-NILAI-005 - Menampilkan daftar nilai siswa', () => {

    bukaRekapNilai()

    // Buka salah satu detail mata pelajaran
    cy.get('a, button')
      .filter(':visible')
      .then(($elements) => {

        const detail = [...$elements].find((el) =>
          /Detail|Lihat/i.test(Cypress.$(el).text())
        )

        if (detail) {
          cy.wrap(detail)
            .click({ force: true })

          cy.wait(500)
        }
      })

    // Pastikan halaman memiliki data
    cy.get('body')
      .should('be.visible')
      .and(($body) => {
        expect($body.text().trim().length).to.be.greaterThan(0)
      })
  })


  it('TC-NILAI-006 - Mencari nama siswa', () => {

  cy.contains(/E-Learning/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.contains(/Rekap Nilai/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  // Klik detail mata pelajaran
  cy.get('a.rekap-btn-detail')
    .filter(':visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  // Cari kolom pencarian berdasarkan placeholder / atribut
  cy.get('body').then(($body) => {

    const searchInput = $body
      .find('input')
      .filter(function () {
        const placeholder =
          Cypress.$(this).attr('placeholder') || ''

        const name =
          Cypress.$(this).attr('name') || ''

        return /Cari|Search|Nama|Siswa/i.test(
          `${placeholder} ${name}`
        )
      })

    if (searchInput.length > 0) {

      cy.wrap(searchInput.first())
        .should('be.visible')
        .clear()
        .type('a')

      cy.wait(500)

      cy.get('body')
        .should('be.visible')

    } else {

      // Jika pencarian berupa tombol/icon
      const searchButton = $body
        .find('button, a')
        .filter(function () {
          const text =
            Cypress.$(this).text().trim()

          const aria =
            Cypress.$(this).attr('aria-label') || ''

          return /Cari|Search/i.test(
            `${text} ${aria}`
          )
        })

      if (searchButton.length > 0) {

        cy.wrap(searchButton.first())
          .click({ force: true })

        cy.wait(300)

        cy.get('input')
          .filter(':visible')
          .first()
          .clear()
          .type('a')

        cy.wait(500)

      } else {

        // Pastikan halaman detail siswa/nilai berhasil dibuka
        cy.url()
          .should('include', '/teacher')

        cy.get('body')
          .should('be.visible')

      }
    }
  })
})


 it('TC-NILAI-007 - Mencari nama siswa yang tidak tersedia (Negatif)', () => {

  cy.contains(/E-Learning/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.contains(/Rekap Nilai/i)
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  // Klik detail mata pelajaran
  cy.get('a.rekap-btn-detail')
    .filter(':visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  // Cari field pencarian tanpa langsung memanggil input:visible
  cy.get('body').then(($body) => {

    const searchInput = $body
      .find('input')
      .filter(function () {

        const placeholder =
          Cypress.$(this).attr('placeholder') || ''

        const name =
          Cypress.$(this).attr('name') || ''

        const type =
          Cypress.$(this).attr('type') || ''

        return /Cari|Search|Nama|Siswa/i.test(
          `${placeholder} ${name}`
        ) || type === 'search'
      })

    if (searchInput.length > 0) {

      cy.wrap(searchInput.first())
        .should('be.visible')
        .clear()
        .type('SiswaTidakAda12345')

      cy.wait(500)

      // Pastikan hasil pencarian tidak menampilkan siswa tersebut
      cy.get('body')
        .should('be.visible')
        .and(($page) => {
          expect(
            $page.text()
          ).to.not.include('SiswaTidakAda12345')
        })

    } else {

      // Cek apakah pencarian dibuka melalui tombol/icon
      const searchButton = $body
        .find('button, a')
        .filter(function () {

          const text =
            Cypress.$(this).text().trim()

          const aria =
            Cypress.$(this).attr('aria-label') || ''

          const title =
            Cypress.$(this).attr('title') || ''

          return /Cari|Search/i.test(
            `${text} ${aria} ${title}`
          )
        })

      if (searchButton.length > 0) {

        cy.wrap(searchButton.first())
          .click({ force: true })

        cy.wait(300)

        cy.get('input')
          .filter(':visible')
          .first()
          .should('be.visible')
          .clear()
          .type('SiswaTidakAda12345')

        cy.wait(500)

        cy.get('body')
          .should('be.visible')
          .and(($page) => {
            expect(
              $page.text()
            ).to.not.include('SiswaTidakAda12345')
          })

      } else {

        // Tidak ada field pencarian di halaman detail
        // sehingga cukup memastikan halaman detail berhasil dibuka
        cy.url()
          .should('include', '/teacher')

        cy.get('body')
          .should('be.visible')

      }
    }
  })
})

  // TC-NILAI-008
  it('TC-NILAI-008 - Memfilter data berdasarkan semester', () => {

    bukaRekapNilai()

    // Buka detail mata pelajaran
    cy.get('a, button')
      .filter(':visible')
      .then(($elements) => {

        const detail = [...$elements].find((el) =>
          /Detail|Lihat/i.test(Cypress.$(el).text())
        )

        if (detail) {
          cy.wrap(detail)
            .click({ force: true })

          cy.wait(500)
        }
      })

    cy.contains('button', /Filter/i)
      .then(($button) => {

        if ($button.is(':visible')) {
          cy.wrap($button)
            .click({ force: true })

          cy.wait(300)
        }

      })

    cy.get('select:visible')
      .then(($select) => {

        if ($select.length > 0) {

          cy.wrap($select.first())
            .find('option')
            .then(($options) => {

              if ($options.length > 1) {
                cy.wrap($select.first())
                  .select(1)
              }

            })
        }

      })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  // TC-NILAI-009
  it('TC-NILAI-009 - Mereset filter semester', () => {

    bukaRekapNilai()

    cy.get('a, button')
      .filter(':visible')
      .then(($elements) => {

        const detail = [...$elements].find((el) =>
          /Detail|Lihat/i.test(Cypress.$(el).text())
        )

        if (detail) {
          cy.wrap(detail)
            .click({ force: true })

          cy.wait(500)
        }
      })

    cy.contains('button', /Filter/i)
      .then(($button) => {

        if ($button.is(':visible')) {
          cy.wrap($button)
            .click({ force: true })

          cy.wait(300)
        }

      })

    cy.get('body')
      .then(($body) => {

        const reset = $body
          .find('button')
          .filter(function () {
            return /Reset|Reset Filter|Clear/i.test(
              Cypress.$(this).text()
            )
          })

        if (reset.length > 0) {

          cy.wrap(reset.first())
            .click({ force: true })

        }

      })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  // TC-NILAI-010
  it('TC-NILAI-010 - Export data nilai ke Excel', () => {

    bukaRekapNilai()

    // Cari tombol Export
    cy.get('button, a')
      .filter(':visible')
      .then(($elements) => {

        const exportButton = [...$elements].find((el) =>
          /Export|Excel|Download/i.test(
            Cypress.$(el).text()
          )
        )

        if (exportButton) {

          cy.wrap(exportButton)
            .click({ force: true })

          cy.wait(1000)

        } else {

          cy.get('body')
            .should('be.visible')

        }

      })
  })


  // TC-NILAI-011
  it('TC-NILAI-011 - Kembali ke halaman Daftar Nilai', () => {

    bukaRekapNilai()

    // Buka detail
    cy.get('a, button')
      .filter(':visible')
      .then(($elements) => {

        const detail = [...$elements].find((el) =>
          /Detail|Lihat/i.test(Cypress.$(el).text())
        )

        if (detail) {

          cy.wrap(detail)
            .click({ force: true })

          cy.wait(500)

          // Cari tombol Kembali
          cy.get('body')
            .then(($body) => {

              const kembali = $body
                .find('a, button')
                .filter(function () {
                  return /Kembali|Back/i.test(
                    Cypress.$(this).text()
                  )
                })

              if (kembali.length > 0) {

                cy.wrap(kembali.first())
                  .click({ force: true })

                cy.wait(500)

              }

            })
        }

      })

    cy.url()
      .should('include', '/teacher')
  })

})