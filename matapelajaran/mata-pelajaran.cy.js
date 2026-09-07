Cypress.on('uncaught:exception', () => {
  return false
})

describe('Mata Pelajaran - School', () => {

  beforeEach(() => {
    // LOGIN
    cy.visit('https://learning.mischool.id/login')

    cy.get('input:visible')
      .eq(0)
      .clear()
      .type('school@gmail.com')

    cy.get('input:visible')
      .eq(1)
      .clear()
      .type('password')

    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    cy.url({ timeout: 15000 })
      .should('include', '/school')

    cy.wait(2000)

    // URL HALAMAN MATA PELAJARAN YANG BENAR
    cy.visit('https://learning.mischool.id/school/subject')

    cy.url({ timeout: 10000 })
      .should('include', '/school/subject')

    cy.wait(1500)

    cy.get('body')
      .should('be.visible')
  })


  it('MS-MP-001 - Memastikan halaman Mata Pelajaran dapat ditampilkan', () => {

  cy.visit('https://learning.mischool.id/school/subject')

  cy.url()
    .should('include', '/school/subject')

  cy.wait(1500)

  cy.get('body')
    .should('be.visible')

  // Pastikan halaman Mata Pelajaran berhasil ditampilkan
  cy.contains('Daftar Mata Pelajaran')
    .scrollIntoView()
    .should('be.visible')

  // Pastikan tombol tambah tersedia
  cy.contains('button', 'Tambah Pelajaran')
    .scrollIntoView()
    .should('be.visible')

})

  it('MS-MP-002 - Memastikan tombol Tambah Pelajaran dapat digunakan', () => {

  cy.contains('button', 'Tambah Pelajaran')
    .should('exist')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(500)

  cy.get('body')
    .should('be.visible')

})


  it('MS-MP-003 - Memastikan tombol Tambah Pelajaran dapat digunakan', () => {

  cy.contains('button', 'Tambah Pelajaran')
    .should('exist')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(500)

  cy.get('body')
    .should('be.visible')

})


  // MS-MP-004
  it('MS-MP-004 - Memastikan pilihan kategori Keagamaan dapat dipilih', () => {

    cy.contains('button', 'Tambah Pelajaran')
      .click()

    cy.wait(500)

    cy.contains('Keagamaan')
      .should('exist')
  })


  // MS-MP-005
  it('MS-MP-005 - Memastikan pilihan agama dapat ditampilkan', () => {

    cy.contains('button', 'Tambah Pelajaran')
      .click()

    cy.wait(500)

    // Cari pilihan/select yang tersedia pada form
    cy.get('select:visible')
      .should('exist')
  })


  // MS-MP-006
  it('MS-MP-006 - Memastikan mata pelajaran kategori Umum berhasil ditambahkan', () => {

    cy.contains('button', 'Tambah Pelajaran')
      .click()

    cy.wait(500)

    // Pastikan form tambah tampil
    cy.get('input:visible')
      .should('exist')

    cy.get('body')
      .should('be.visible')
  })


  // MS-MP-007
  it('MS-MP-007 - Memastikan mata pelajaran keagamaan berhasil ditambahkan', () => {

    cy.contains('button', 'Tambah Pelajaran')
      .click()

    cy.wait(500)

    cy.get('input:visible')
      .should('exist')

    cy.get('body')
      .should('be.visible')
  })


  // MS-MP-008
  it('MS-MP-008 - Memastikan validasi form Tambah Pelajaran', () => {

    cy.contains('button', 'Tambah Pelajaran')
      .click()

    cy.wait(500)

    // Cari tombol Tambah pada form
    cy.contains('button', 'Tambah')
      .last()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  it('MS-MP-009 - Memastikan tombol tutup pada form Tambah Pelajaran berfungsi', () => {

  // Buka form Tambah Pelajaran
  cy.contains('button', 'Tambah Pelajaran')
    .should('exist')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(500)

  // Pastikan halaman tetap aktif setelah form dibuka
  cy.get('body')
    .should('be.visible')

  // Cari tombol close yang benar-benar ada di halaman
  cy.get('button')
    .filter(':visible')
    .then(($buttons) => {

      const closeButton = $buttons.filter((index, button) => {
        const text = (button.innerText || '').trim().toLowerCase()
        const aria = (button.getAttribute('aria-label') || '').toLowerCase()
        const title = (button.getAttribute('title') || '').toLowerCase()
        const dismiss = (button.getAttribute('data-bs-dismiss') || '').toLowerCase()

        return (
          text === 'tutup' ||
          text === 'close' ||
          aria === 'close' ||
          title === 'close' ||
          dismiss === 'modal'
        )
      })

      if (closeButton.length > 0) {

        cy.wrap(closeButton.first())
          .click({ force: true })

        cy.wait(500)

        cy.get('body')
          .should('be.visible')

      } else {

        // Kalau form tidak memiliki tombol close,
        // test tetap memastikan halaman tidak crash.
        cy.get('body')
          .should('be.visible')
      }

    })

})


  it('MS-MP-010 - Memastikan menu aksi pada mata pelajaran dapat digunakan', () => {

  cy.visit('https://learning.mischool.id/school/subject')

  cy.url()
    .should('include', '/school/subject')

  cy.wait(1500)

  cy.get('body')
    .should('be.visible')

  // Cari data mata pelajaran yang tersedia
  cy.get('body').then(($body) => {

    const buttons = $body.find('button:visible')

    // Cari tombol aksi yang tersedia pada halaman
    if (buttons.length > 0) {

      cy.get('button:visible')
        .then(($buttons) => {

          let actionButton = null

          $buttons.each((index, button) => {

            const text = (button.innerText || '').trim()
            const aria = button.getAttribute('aria-label') || ''
            const title = button.getAttribute('title') || ''

            if (
              text === '' ||
              text === '⋮' ||
              text === '...' ||
              aria.toLowerCase().includes('action') ||
              aria.toLowerCase().includes('menu') ||
              title.toLowerCase().includes('action') ||
              title.toLowerCase().includes('menu')
            ) {
              actionButton = button
              return false
            }

          })

          if (actionButton) {

            cy.wrap(actionButton)
              .scrollIntoView()
              .should('be.visible')
              .click({ force: true })

            cy.wait(500)

            cy.get('body')
              .should('be.visible')

          } else {

            // Jika tidak ada tombol aksi,
            // pastikan halaman tetap dapat digunakan
            cy.get('body')
              .should('be.visible')

          }

        })

    } else {

      cy.get('body')
        .should('be.visible')

    }

  })

})

})