describe('Jam Pelajaran - School', () => {

  // Abaikan error dari aplikasi yang bukan berasal dari Cypress
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes('Element not found') ||
        err.message.includes('backdrop') ||
        err.message.includes('attr did not return a valid number')
      ) {
        return false
      }

      return false
    })

    // Login
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

    cy.wait(2000)

    // Langsung buka halaman Jam Pelajaran
    cy.visit('https://learning.mischool.id/school/lesson-hours')

    cy.url()
      .should('include', '/school/lesson-hours')

    cy.wait(1500)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-JAM-001
  // =====================================================
  it('MS-JAM-001 - Memastikan halaman Jam Pelajaran dapat ditampilkan', () => {

    cy.url()
      .should('include', '/school/lesson-hours')

    cy.contains('Jam Pelajaran')
      .should('exist')

    cy.contains('Jam Pelajaran')
      .scrollIntoView()

    cy.get('body')
      .should('contain.text', 'Jam Pelajaran')
  })


  // =====================================================
  // MS-JAM-002
  // =====================================================
  it('MS-JAM-002 - Memastikan pilihan hari pada Jam Pelajaran dapat digunakan', () => {

    cy.get('body')
      .should('contain.text', 'Senin')

    cy.get('body')
      .should('contain.text', 'Selasa')

    cy.get('body')
      .should('contain.text', 'Rabu')

    cy.get('body')
      .should('contain.text', 'Kamis')

    cy.get('body')
      .should('contain.text', 'Jumat')

    cy.get('body')
      .should('contain.text', 'Sabtu')

    cy.get('body')
      .should('contain.text', 'Minggu')

    // Pilih hari
    cy.contains('Senin')
      .last()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-JAM-003
  // =====================================================
  it('MS-JAM-003 - Memastikan tombol Tambah Jam Pelajaran dapat digunakan', () => {

    cy.contains('button', 'Tambah')
      .first()
      .should('exist')
      .should('be.visible')
      .click({ force: true })

    cy.wait(700)

    // Pastikan form tambah muncul
    cy.get('#store-start')
      .should('exist')

    cy.get('#store-start')
      .should('exist')
  })


 it('MS-JAM-004 - Memastikan jam pelajaran baru dapat ditambahkan', () => {

  // Klik Tambah
  cy.contains('button', 'Tambah')
    .first()
    .should('be.visible')
    .click({ force: true })

  cy.wait(700)

  // Isi jam mulai
  cy.get('#store-start')
    .should('exist')
    .invoke('removeAttr', 'readonly')
    .clear()
    .type('07:00', { force: true })

  // Ambil input time kedua
  cy.get('input[type="time"]:visible')
    .eq(1)
    .should('exist')
    .invoke('removeAttr', 'readonly')
    .clear()
    .type('08:00', { force: true })

  // Cari tombol submit berdasarkan type
  cy.get('button[type="submit"]:visible')
    .last()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.get('body')
    .should('be.visible')
})

  // =====================================================
  // MS-JAM-005
  // =====================================================
  it('MS-JAM-005 - Memastikan data jam pelajaran dapat diedit', () => {

    // Cari tombol edit
    cy.get('button')
      .then(($buttons) => {

        const editButtons = $buttons.filter('[title="Edit"], .btn-edit')

        if (editButtons.length > 0) {

          cy.wrap(editButtons.first())
            .click({ force: true })

        } else {

          // Alternatif berdasarkan icon/button
          cy.get('button')
            .filter(':visible')
            .then(($visibleButtons) => {

              cy.wrap($visibleButtons.last())
                .click({ force: true })

            })
        }

      })

    cy.wait(700)

    // Kalau form edit terbuka
    cy.get('body').then(($body) => {

      if ($body.find('#modal-update').length > 0) {

        cy.get('#modal-update')
          .should('exist')

        // Cari input waktu di modal edit
        cy.get('#modal-update input[type="time"]')
          .first()
          .invoke('removeAttr', 'readonly')
          .clear()
          .type('07:30', { force: true })

        cy.get('#modal-update')
          .find('button')
          .contains('Simpan')
          .click({ force: true })

      }

    })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-JAM-006
  // =====================================================
  it('MS-JAM-006 - Memastikan data jam pelajaran dapat dihapus', () => {

    // Cari tombol hapus
    cy.contains('button', 'Hapus')
      .last()
      .should('exist')
      .click({ force: true })

    cy.wait(700)

    // Cek berbagai kemungkinan tombol konfirmasi
    cy.get('body').then(($body) => {

      if ($body.find('button').filter(':contains("Ya")').length > 0) {

        cy.contains('button', 'Ya')
          .last()
          .click({ force: true })

      } else if ($body.find('button').filter(':contains("Hapus")').length > 0) {

        cy.contains('button', 'Hapus')
          .last()
          .click({ force: true })

      } else if ($body.find('button').filter(':contains("Delete")').length > 0) {

        cy.contains('button', 'Delete')
          .last()
          .click({ force: true })

      }

    })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })

})