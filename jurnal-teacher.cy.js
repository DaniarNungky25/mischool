describe('MiSchool - Jurnal Guru', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

    cy.visit('https://learning.mischool.id/login')

    // Login guru
    cy.get('#email')
      .should('be.visible')
      .clear()
      .type('teacher@gmail.com')

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type('123456789101234567', { log: false })

    cy.get('button.btn-primary')
      .should('be.visible')
      .click()

    cy.url({ timeout: 10000 })
      .should('include', '/teacher')

    cy.wait(2000)
  })


  // Helper buka Jurnal Guru
  const bukaJurnalGuru = () => {

    cy.contains('Jurnal', { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Jurnal Guru', { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1500)
  }


  // =====================================================
  // TC-JRN-001
  // Menampilkan halaman Jurnal Guru
  // =====================================================

  it('TC-JRN-001 - Menampilkan halaman Jurnal Guru', () => {

    bukaJurnalGuru()

    cy.contains('Jurnal Guru', { timeout: 10000 })
      .should('exist')
  })


  // =====================================================
  // TC-JRN-002
  // Menampilkan jadwal mengajar hari ini
  // =====================================================

  it('TC-JRN-002 - Menampilkan jadwal mengajar hari ini', () => {

    bukaJurnalGuru()

    cy.get('table', { timeout: 10000 })
      .should('exist')

    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0)
  })


  // =====================================================
  // TC-JRN-003
  // Membuka form Isi Jurnal
  // =====================================================

  it('TC-JRN-003 - Membuka form Isi Jurnal', () => {

    bukaJurnalGuru()

    cy.contains(/Isi Jurnal/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('form, [role="dialog"]')
      .should('exist')
  })


  it('TC-JRN-004 - Mengisi jurnal dengan data valid', () => {

  bukaJurnalGuru()

  cy.contains(/Isi Jurnal/i, { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(1000)

  // Cari field input yang bisa diisi
  cy.get('input:visible, textarea:visible, [contenteditable="true"]:visible', {
    timeout: 10000
  })
    .then(($fields) => {

      // Ambil field text yang tersedia
      const fields = [...$fields].filter((el) => {
        const type = (el.getAttribute('type') || '').toLowerCase()

        return (
          type === '' ||
          type === 'text' ||
          type === 'search'
        )
      })

      if (fields.length > 0) {
        cy.wrap(fields[fields.length - 1])
          .clear()
          .type('Materi pembelajaran hari ini')
      } else {
        throw new Error('Field untuk mengisi jurnal tidak ditemukan')
      }
    })

  // Simpan jurnal
  cy.contains('button', /simpan/i, { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(1500)
})


  // =====================================================
  // TC-JRN-005
  // Menyimpan jurnal dengan data wajib kosong
  // =====================================================

  it('TC-JRN-005 - Menyimpan jurnal dengan data wajib kosong', () => {

    bukaJurnalGuru()

    cy.contains(/Isi Jurnal/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    // Langsung klik Simpan tanpa mengisi data
    cy.contains('button', /simpan/i)
      .first()
      .click({ force: true })

    cy.wait(1000)

    // Validasi form masih tampil / validasi muncul
    cy.get('form, [role="dialog"]')
      .should('exist')
  })


  // =====================================================
  // TC-JRN-006
  // Menampilkan Riwayat Jurnal
  // =====================================================

  it('TC-JRN-006 - Menampilkan Riwayat Jurnal', () => {

    bukaJurnalGuru()

    cy.contains(/Riwayat Jurnal/i, { timeout: 10000 })
      .first()
      .scrollIntoView()
      .should('exist')
  })


  // TC-JRN-007 - Mencari jurnal menggunakan kata kunci valid
it('TC-JRN-007 - Mencari jurnal menggunakan kata kunci valid', () => {

  // Masuk ke halaman Jurnal
  cy.contains('Jurnal', { matchCase: false })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.url().should('include', '/teacher/journals')

  // Pilih Jurnal Guru
  cy.contains('Jurnal Guru', { matchCase: false })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1000)

  // Buka Riwayat Jurnal
  cy.contains('Riwayat Jurnal', { matchCase: false })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1000)

  // Cari input pencarian
  cy.get('input')
    .filter('[placeholder*="Cari"], [placeholder*="cari"]')
    .first()
    .should('be.visible')
    .clear()
    .type('Bahasa Inggris')

  cy.wait(1000)

  // Pastikan hasil jurnal tampil
  cy.get('body')
    .should('contain.text', 'Bahasa Inggris')
})


  // TC-JRN-008 - Mencari jurnal dengan kata kunci tidak valid
it('TC-JRN-008 - Mencari jurnal dengan kata kunci tidak valid', () => {

  // Masuk ke halaman Jurnal
  cy.contains('Jurnal', { matchCase: false })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.url().should('include', '/teacher/journals')

  // Pilih Jurnal Guru
  cy.contains('Jurnal Guru', { matchCase: false })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1000)

  // Buka Riwayat Jurnal
  cy.contains('Riwayat Jurnal', { matchCase: false })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1000)

  // Cari input pencarian
  cy.get('input')
    .filter('[placeholder*="Cari"], [placeholder*="cari"]')
    .first()
    .should('be.visible')
    .clear()
    .type('JURNAL_TIDAK_ADA_99999')

  cy.wait(1000)

  // Pastikan pencarian diproses
  cy.get('body')
    .should('be.visible')
})


  // =====================================================
  // TC-JRN-009
  // Memfilter Riwayat Jurnal
  // =====================================================

  it('TC-JRN-009 - Memfilter Riwayat Jurnal', () => {

    bukaJurnalGuru()

    cy.contains(/Riwayat Jurnal/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    // Dropdown filter
    cy.get('select:visible')
      .first()
      .should('exist')
      .select(1)

    cy.wait(1000)

    cy.get('table')
      .should('exist')
  })


  // =====================================================
  // TC-JRN-010
  // Mencari jurnal berdasarkan tanggal
  // =====================================================

  it('TC-JRN-010 - Mencari jurnal berdasarkan tanggal', () => {

    bukaJurnalGuru()

    cy.contains(/Riwayat Jurnal/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    // Pilih input tanggal
    cy.get('input[type="date"]:visible')
      .first()
      .should('exist')
      .click({ force: true })

    cy.wait(500)

    cy.get('input[type="date"]:visible')
      .first()
      .type('2026-09-01')

    cy.wait(500)

    cy.contains('button', /cari/i)
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('table')
      .should('exist')
  })


  // =====================================================
  // TC-JRN-011
  // Mencari jurnal pada tanggal tanpa data
  // =====================================================

  it('TC-JRN-011 - Mencari jurnal pada tanggal tanpa data', () => {

    bukaJurnalGuru()

    cy.contains(/Riwayat Jurnal/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('input[type="date"]:visible')
      .first()
      .should('exist')
      .clear()
      .type('2020-01-01')

    cy.wait(500)

    cy.contains('button', /cari/i)
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('exist')
  })


  // =====================================================
  // TC-JRN-012
  // Membuka detail jurnal
  // =====================================================

  it('TC-JRN-012 - Membuka detail jurnal', () => {

    bukaJurnalGuru()

    cy.contains(/Riwayat Jurnal/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('table tbody tr', { timeout: 10000 })
      .first()
      .should('exist')

    // Cari elemen aksi di baris
    cy.get('table tbody tr')
      .first()
      .find('a, [role="button"], button')
      .last()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // TC-JRN-013
  // Menampilkan Rekap Absensi
  // =====================================================

  it('TC-JRN-013 - Menampilkan Rekap Absensi', () => {

    bukaJurnalGuru()

    cy.contains(/Riwayat Jurnal/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('table tbody tr', { timeout: 10000 })
      .first()
      .should('exist')

    cy.contains(/Rekap Absensi/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.contains(/Izin|Sakit|Alfa/i)
      .should('exist')
  })

})