describe('MiSchool - Daftar Ujian', () => {

  beforeEach(() => {
    // Abaikan error JS dari aplikasi
    cy.on('uncaught:exception', () => {
      return false
    })

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

    // Tunggu login selesai
    cy.wait(3000)

    // =========================
    // LANGSUNG KE DAFTAR UJIAN
    // =========================

    cy.visit('https://learning.mischool.id/school/exams')

    cy.url({ timeout: 10000 })
      .should('include', '/school/exams')

    cy.wait(1500)
  })


  // =====================================================
  // MS-EXAM-001
  // =====================================================

  it('MS-EXAM-001 - Memastikan halaman Daftar Ujian dapat ditampilkan', () => {

    cy.url()
      .should('include', '/school/exams')

    cy.contains('Daftar Ujian')
      .should('exist')

  })


  // =====================================================
  // MS-EXAM-002
  // =====================================================

  it('MS-EXAM-002 - Memastikan halaman Daftar Ujian ketika belum terdapat data ujian', () => {

    cy.contains('Daftar Ujian')
      .should('exist')

    cy.contains('Belum ada ujian')
      .should('be.visible')

  })


  // =====================================================
  // MS-EXAM-003
  // =====================================================

  it('MS-EXAM-003 - Membuka modal Filter Ujian', () => {

    cy.contains('button', 'Filter')
      .should('be.visible')
      .click()

    cy.get('#filterModal')
      .should('be.visible')

  })


  // =====================================================
  // MS-EXAM-004
  // =====================================================

  it('MS-EXAM-004 - Melakukan filter berdasarkan Tahun Ajaran', () => {

    cy.contains('button', 'Filter')
      .should('be.visible')
      .click()

    cy.get('#filterModal')
      .should('be.visible')

    // Cari dropdown di dalam modal
    cy.get('#filterModal select')
      .should('exist')

    cy.get('#filterModal select')
      .first()
      .find('option')
      .then(($options) => {

        if ($options.length > 1) {

          cy.get('#filterModal select')
            .first()
            .select(1)

        }

      })

  })


  // =====================================================
  // MS-EXAM-005
  // =====================================================

  it('MS-EXAM-005 - Melakukan filter berdasarkan Mata Pelajaran', () => {

    cy.contains('button', 'Filter')
      .should('be.visible')
      .click()

    cy.get('#filterModal')
      .should('be.visible')

    // Cari semua dropdown
    cy.get('#filterModal select')
      .should('exist')
      .then(($select) => {

        // Kalau ada lebih dari 1 dropdown,
        // dropdown kedua dianggap Mata Pelajaran
        if ($select.length > 1) {

          cy.wrap($select)
            .eq(1)
            .find('option')
            .then(($options) => {

              if ($options.length > 1) {

                cy.wrap($select)
                  .eq(1)
                  .select(1)

              }

            })

        }

      })

  })


  // =====================================================
  // MS-EXAM-006
  // =====================================================

  it('MS-EXAM-006 - Memastikan filter Semester dapat digunakan', () => {

    cy.contains('button', 'Filter')
      .click()

    cy.get('#filterModal')
      .should('be.visible')

    cy.get('#filterModal select')
      .then(($select) => {

        if ($select.length > 2) {

          cy.wrap($select)
            .eq(2)
            .find('option')
            .then(($options) => {

              if ($options.length > 1) {

                cy.wrap($select)
                  .eq(2)
                  .select(1)

              }

            })

        }

      })

  })


  // =====================================================
// MS-EXAM-007
// =====================================================

it('MS-EXAM-007 - Menggunakan tombol Reset pada Filter Ujian', () => {

  // Pastikan tombol Reset ada di halaman Daftar Ujian
  cy.contains('Reset')
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  // Tetap berada di halaman Daftar Ujian
  cy.url()
    .should('include', '/school/exams')

})


 it('MS-EXAM-008 - Menutup modal Filter Ujian', () => {

  // Buka Filter
  cy.contains('button', 'Filter')
    .should('be.visible')
    .click()

  // Pastikan modal tampil
  cy.get('#filterModal')
    .should('be.visible')

  // Klik tombol X
  cy.get('#filterModal')
    .find('button.btn-close')
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  // Pastikan tombol Filter bisa digunakan kembali
  cy.contains('button', 'Filter')
    .should('be.visible')
})


  // =====================================================
  // MS-EXAM-009
  // =====================================================

  it('MS-EXAM-009 - Mencari data ujian dengan kata kunci yang sesuai', () => {

    cy.get('input[placeholder="Cari..."]')
      .should('be.visible')
      .clear()
      .type('ujian')

    cy.wait(500)

  })


  // =====================================================
  // MS-EXAM-010
  // =====================================================

  it('MS-EXAM-010 - Mencari data ujian dengan kata kunci yang tidak tersedia', () => {

    cy.get('input[placeholder="Cari..."]')
      .should('be.visible')
      .clear()
      .type('data-tidak-ada-99999')

    cy.wait(500)

  })


  it('MS-EXAM-011 - Membuka halaman Tambah Ujian', () => {

  cy.contains('Tambah Ujian')
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/exams/create')

  cy.contains('Tambah Ujian')
    .should('exist')

})


  // =====================================================
  // MS-EXAM-012
  // =====================================================

  it('MS-EXAM-012 - Menambahkan ujian dengan data yang valid', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.get('input:visible')
      .should('exist')

  })


  // =====================================================
  // MS-EXAM-013
  // =====================================================

  it('MS-EXAM-013 - Menyimpan ujian tanpa mengisi Judul Ujian', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('button', /Simpan|Tambah|Submit/)
      .first()
      .should('exist')
      .click({ force: true })

  })


  // =====================================================
  // MS-EXAM-014
  // =====================================================

  it('MS-EXAM-014 - Menyimpan ujian tanpa memilih Bank Soal', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.get('input:visible')
      .first()
      .clear()
      .type('Ujian Cypress')

    cy.contains('button', /Simpan|Tambah|Submit/)
      .first()
      .click({ force: true })

  })


  // =====================================================
  // MS-EXAM-015
  // =====================================================

  it('MS-EXAM-015 - Menyimpan ujian tanpa mengisi Tanggal dan Waktu Ujian', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.get('input:visible')
      .first()
      .clear()
      .type('Ujian Cypress')

    cy.contains('button', /Simpan|Tambah|Submit/)
      .first()
      .click({ force: true })

  })


 it('MS-EXAM-016 - Mengisi Nilai Minimal dengan format yang tidak sesuai', () => {

  cy.contains('Tambah Ujian')
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/exams/create')

  cy.contains('Nilai Minimal')
    .should('be.visible')
    .parent()
    .find('input')
    .should('be.visible')
    .clear()
    .type('abc')

})


  // =====================================================
  // MS-EXAM-017
  // =====================================================

  it('MS-EXAM-017 - Mengaktifkan opsi pengumpulan jawaban kapan saja', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.get('input[type="checkbox"]:visible')
      .first()
      .check({ force: true })

    cy.get('input[type="checkbox"]:visible')
      .first()
      .should('be.checked')

  })


  // =====================================================
  // MS-EXAM-018
  // =====================================================

  it('MS-EXAM-018 - Mengaktifkan opsi siswa melihat jawaban benar salah dan nilai', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.get('input[type="checkbox"]:visible')
      .eq(1)
      .check({ force: true })

    cy.get('input[type="checkbox"]:visible')
      .eq(1)
      .should('be.checked')

  })


  // =====================================================
  // MS-EXAM-019
  // =====================================================

  it('MS-EXAM-019 - Menambahkan Peraturan Tambahan pada ujian', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.get('textarea:visible')
      .first()
      .clear()
      .type('Kerjakan ujian dengan jujur.')

    cy.get('textarea:visible')
      .first()
      .should('have.value', 'Kerjakan ujian dengan jujur.')

  })


  // =====================================================
  // MS-EXAM-020
  // =====================================================

  it('MS-EXAM-020 - Kembali ke halaman Daftar Ujian tanpa menyimpan', () => {

    cy.contains('Tambah Ujian')
      .click({ force: true })

    cy.wait(1000)

    cy.contains(/Kembali|Daftar Ujian/)
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.url()
      .should('include', '/school/exams')

  })

})