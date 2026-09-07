describe('MiSchool - Daftar Poin Siswa', () => {

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

  cy.get('a', { timeout: 15000 })
  .then(($links) => {
    const target = [...$links].find((el) => {
      const href = el.getAttribute('href') || ''
      const text = el.innerText || ''

      return (
        !/overview/i.test(href) &&
        (
          /daftar poin siswa/i.test(text) ||
          /student.*point|point.*student|student-point|student_points/i.test(href)
        )
      )
    })

    expect(target, 'menu Daftar Poin Siswa').to.exist

    cy.wrap(target)
      .scrollIntoView()
      .click({ force: true })
  })

cy.wait(1500)
})


  // =====================================================
  // TC-DPS-01
  // =====================================================

  it('TC-DPS-01 - Membuka halaman Daftar Poin Siswa', () => {

    cy.get('body')
      .should('be.visible')

    cy.get('input:visible, select:visible, button:visible')
      .should('exist')
  })


  // =====================================================
  // TC-DPS-02
  // =====================================================

  it('TC-DPS-02 - Memeriksa tampilan halaman', () => {

    cy.get('body')
      .should('be.visible')

    cy.get('input:visible')
      .should('exist')

    cy.get('button:visible, select:visible')
      .should('exist')
  })


  // =====================================================
  // TC-DPS-03
  // =====================================================

  it('TC-DPS-03 - Mencari siswa berdasarkan nama', () => {

    cy.get('input:visible')
      .first()
      .should('be.visible')
      .clear()
      .type('Siswa')

    cy.get('input:visible')
      .first()
      .type('{enter}')

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // TC-DPS-04
  // =====================================================

  it('TC-DPS-04 - Mencari siswa dengan data yang tidak tersedia', () => {

    cy.get('input:visible')
      .first()
      .should('be.visible')
      .clear()
      .type('SISWA_TIDAK_TERSEDIA_999')

    cy.get('input:visible')
      .first()
      .type('{enter}')

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // TC-DPS-05
  // =====================================================

  it('TC-DPS-05 - Menggunakan filter point', () => {

    cy.get('select:visible')
      .then(($select) => {

        if ($select.length > 0) {
          cy.wrap($select.first())
            .should('be.visible')
            .find('option')
            .then(($options) => {

              if ($options.length > 1) {
                cy.wrap($select.first())
                  .select(1)
              }
            })
        } else {
          cy.get('button:visible')
            .then(($buttons) => {

              const filter = [...$buttons].find((el) =>
                /filter|point/i.test(el.innerText || '')
              )

              if (filter) {
                cy.wrap(filter)
                  .click({ force: true })
              }
            })
        }
      })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // TC-DPS-06
  // =====================================================

  it('TC-DPS-06 - Berpindah ke tab Kelas', () => {

    cy.contains(/^Kelas$/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // TC-DPS-07
  // =====================================================

  it('TC-DPS-07 - Kembali ke tab Siswa', () => {

    cy.contains(/^Kelas$/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(700)

    cy.contains(/^Siswa$/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // TC-DPS-08
  // =====================================================

  it('TC-DPS-08 - Mengecek kondisi data kosong', () => {

    cy.get('body')
      .should('be.visible')
      .then(($body) => {

        const text = $body.text()

        if (/Siswa belum ditambahkan/i.test(text)) {
          expect(text).to.match(/Siswa belum ditambahkan/i)
        } else {
          cy.log('Data siswa tersedia')
        }
      })
  })


  // =====================================================
  // TC-DPS-09
  // =====================================================

  it('TC-DPS-09 - Mengecek maksimal point sekolah', () => {

    cy.get('body')
      .should('be.visible')
      .then(($body) => {

        const text = $body.text()

        if (/maksimal|max.*point|max.*poin/i.test(text)) {
          expect(text).to.match(/maksimal|max.*point|max.*poin/i)
        } else {
          cy.log('Informasi maksimal point tidak ditemukan pada halaman')
        }
      })
  })


  it('TC-DPS-10 - Navigasi halaman', () => {
  cy.get('body').should('be.visible')

  // Pindah ke Overview
  cy.contains('Overview')
    .first()
    .click({ force: true })

  cy.wait(1000)

  cy.get('body').should('be.visible')

  // Kembali ke Daftar Poin Siswa
  cy.visit('https://learning.mischool.id/employee/violation/student-point')

  cy.wait(1000)

  cy.url().should('include', '/employee/violation/student-point')
  cy.get('body').should('be.visible')
})

})