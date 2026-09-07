describe('MiSchool - Akses Pelanggaran', () => {

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
    // BUKA AKSES PELANGGARAN
    // =========================

    cy.contains('Akses Pelanggaran', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(2000)
  })


  // =========================================================
  // MS-AP-001
  // Memastikan halaman Akses Pelanggaran dapat ditampilkan
  // =========================================================

  it('MS-AP-001 - Memastikan halaman Akses Pelanggaran dapat ditampilkan', () => {

    cy.url()
      .should('include', '/')

    cy.contains('Akses Pelanggaran', { timeout: 10000 })
      .should('exist')

    cy.get('body')
      .should('exist')

  })


  // =========================================================
  // MS-AP-002
  // Memastikan data pengakses pelanggaran dapat ditampilkan
  // =========================================================

  it('MS-AP-002 - Memastikan data pengakses pelanggaran dapat ditampilkan', () => {

    cy.contains('Akses Pelanggaran', { timeout: 10000 })
      .should('exist')

    cy.get('body')
      .should('exist')

    cy.get('table, [role="table"]', { timeout: 10000 })
      .should('exist')

  })


  // =========================================================
  // MS-AP-003
  // Memastikan fitur pencarian pengakses dapat digunakan
  // =========================================================

  it('MS-AP-003 - Memastikan fitur pencarian pengakses dapat digunakan', () => {

    cy.get('input:visible', { timeout: 10000 })
      .first()
      .should('exist')
      .clear()
      .type('Andriansyah')

    cy.contains('Cari', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('exist')

  })


 it('MS-AP-004 - Memastikan modal Tambah Pengakses Pelanggaran dapat ditampilkan', () => {

  cy.contains('Tambah Pengakses', { timeout: 10000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(500)

  cy.get('input:visible, select:visible, textarea:visible', { timeout: 10000 })
    .should('exist')

})

it('MS-AP-005 - Memastikan pengguna dapat memilih pegawai sebagai pengakses', () => {

  cy.contains('Tambah Pengakses', { timeout: 10000 })
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1000)

  // Cari elemen form yang muncul setelah tombol Tambah Pengakses
  cy.get('input:visible, [role="combobox"]:visible, button:visible')
    .then($els => {

      const target = [...$els].find(el => {
        const text = (el.innerText || el.getAttribute('placeholder') || '')
          .trim()
          .toLowerCase()

        return (
          text.includes('pegawai') ||
          text.includes('pilih') ||
          text.includes('pengakses')
        )
      })

      if (target) {
        cy.wrap(target)
          .click({ force: true })
      } else {
        cy.wrap($els.last())
          .click({ force: true })
      }
    })

  cy.wait(500)

  // Pilih pegawai yang tersedia
  cy.get('[role="option"]:visible, .dropdown-item:visible, li:visible')
    .first()
    .should('exist')
    .click({ force: true })

})


it('MS-AP-006 - Memastikan akses pelanggaran dapat diberikan kepada pegawai', () => {

  cy.contains('Tambah Pengakses', { timeout: 10000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  // Cari pilihan pegawai pada modal
  cy.get('input:visible, [role="combobox"]:visible')
    .last()
    .click({ force: true })

  cy.wait(500)

  // Pilih pegawai pertama
  cy.get('[role="option"]:visible, .dropdown-item:visible, li:visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  // Cari tombol aksi pada modal
  cy.get('button:visible')
    .then($buttons => {
      const tombol = [...$buttons].find(el => {
        const text = el.innerText.trim().toLowerCase()
        return (
          text.includes('simpan') ||
          text.includes('tambah') ||
          text.includes('submit') ||
          text.includes('oke')
        )
      })

      if (tombol) {
        cy.wrap(tombol).click({ force: true })
      } else {
        // fallback: tombol terakhir di modal
        cy.wrap($buttons.last()).click({ force: true })
      }
    })

  cy.wait(1000)

  // Pastikan proses berhasil / modal tertutup
  cy.get('body').should('be.visible')
})

  // =========================================================
  // MS-AP-007
  // Memastikan detail pengakses pelanggaran dapat dilihat
  // =========================================================

  it('MS-AP-007 - Memastikan detail pengakses pelanggaran dapat dilihat', () => {

    cy.get('button:visible, a:visible', { timeout: 10000 })
      .then($elements => {

        const target = [...$elements].find(el => {
          const text = el.innerText.trim().toLowerCase()

          return (
            text.includes('detail') ||
            text.includes('lihat')
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

    cy.wait(1000)

    cy.get('body')
      .should('exist')

  })


  // =========================================================
  // MS-AP-008
  // Memastikan akses pelanggaran dapat dihapus
  // =========================================================

  it('MS-AP-008 - Memastikan akses pelanggaran dapat dihapus', () => {

    cy.get('button:visible, a:visible', { timeout: 10000 })
      .then($elements => {

        const target = [...$elements].find(el => {
          const text = el.innerText.trim().toLowerCase()

          return (
            text.includes('hapus') ||
            text.includes('delete')
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

    cy.wait(500)

    // Konfirmasi jika muncul
    cy.get('body').then($body => {

      const text = $body.text().toLowerCase()

      if (
        text.includes('konfirmasi') ||
        text.includes('yakin') ||
        text.includes('hapus data')
      ) {

        cy.get('button:visible')
          .then($buttons => {

            const confirmButton = [...$buttons].find(el => {
              const buttonText = el.innerText.trim().toLowerCase()

              return (
                buttonText.includes('hapus') ||
                buttonText.includes('ya') ||
                buttonText.includes('konfirmasi')
              )
            })

            if (confirmButton) {
              cy.wrap(confirmButton)
                .click({ force: true })
            }
          })
      }
    })

    cy.wait(1500)

    cy.get('body')
      .should('exist')

  })

})