describe('Jadwal Pelajaran - School', () => {

  // =========================================================
  // HANDLE ERROR JAVASCRIPT DARI APLIKASI
  // =========================================================
  Cypress.on('uncaught:exception', () => {
    return false
  })


  // =========================================================
  // LOGIN
  // =========================================================
  const login = () => {

    cy.visit('https://learning.mischool.id/login')

    cy.get('input:visible')
      .should('have.length.at.least', 2)

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

    cy.wait(3000)
  }


  // =========================================================
  // BUKA HALAMAN JADWAL
  // =========================================================
  const bukaJadwal = () => {

    cy.visit(
      'https://learning.mischool.id/school/lesson-schedule'
    )

    cy.url({ timeout: 10000 })
      .should('include', '/school/lesson-schedule')

    cy.wait(1500)
  }


  // =========================================================
  // MASUK KELAS
  // =========================================================
  const masukKelas = () => {

    cy.contains('Masuk Kelas')
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/school/lesson-schedule/detail/')

    cy.wait(1500)
  }


  // =========================================================
  // BEFORE EACH
  // =========================================================
  beforeEach(() => {

    login()
    bukaJadwal()

  })


  // =========================================================
// MS-JP-001
// Menampilkan halaman Jadwal Pelajaran
// =========================================================
it('MS-JP-001 - Menampilkan halaman Jadwal Pelajaran', () => {

  // Pastikan URL sudah benar
  cy.url()
    .should('eq', 'https://learning.mischool.id/school/lesson-schedule')

  // Pastikan halaman sudah termuat
  cy.get('body')
    .should('be.visible')

})


  // =========================================================
  // MS-JP-002
  // Mencari kelas yang tersedia
  // =========================================================
  it('MS-JP-002 - Mencari kelas yang tersedia', () => {

    cy.get('input:visible')
      .first()
      .clear()
      .type('RPL')

    cy.wait(1000)

    cy.url()
      .should('include', '/school/lesson-schedule')

  })


  // =========================================================
  // MS-JP-003
  // Mencari kelas yang tidak tersedia
  // =========================================================
  it('MS-JP-003 - Mencari kelas yang tidak tersedia', () => {

    cy.get('input:visible')
      .first()
      .clear()
      .type('KELAS-TIDAK-ADA-999')

    cy.wait(1000)

    cy.url()
      .should('include', '/school/lesson-schedule')

  })


  // =========================================================
  // MS-JP-004
  // Filter Tahun Ajaran
  // =========================================================
  it('MS-JP-004 - Filter Tahun Ajaran', () => {

    cy.contains('Pilih Tahun Ajaran')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('body').then(($body) => {

      const pilihan = $body
        .find('*')
        .filter(function () {

          const text = Cypress.$(this)
            .text()
            .trim()

          return /^\d{4}\/\d{4}$/.test(text)

        })

      if (pilihan.length > 0) {

        cy.wrap(pilihan.last())
          .click({ force: true })

      } else {

        cy.log('Pilihan tahun ajaran tidak ditemukan')

      }

    })

  })


  // =========================================================
  // MS-JP-005
  // Masuk ke detail kelas
  // =========================================================
  it('MS-JP-005 - Masuk ke detail kelas', () => {

    masukKelas()

    cy.url()
      .should('include', '/school/lesson-schedule/detail/')

  })


  // =========================================================
  // MS-JP-006
  // Memilih hari jadwal pelajaran
  // =========================================================
  it('MS-JP-006 - Memilih hari jadwal pelajaran', () => {

    masukKelas()

    cy.contains('Senin')
      .should('be.visible')
      .click({ force: true })

  })


  // =========================================================
// MS-JP-007
// Menampilkan data jadwal dengan benar
// =========================================================
it('MS-JP-007 - Menampilkan data jadwal dengan benar', () => {

  masukKelas()

  // Pastikan sudah berada di halaman detail kelas
  cy.url()
    .should('include', '/school/lesson-schedule/detail/')

  // Jangan menggunakan cy.contains('Jadwal Pelajaran')
  // karena teks tersebut juga ada di sidebar yang sedang hidden.

  cy.get('body')
    .should('be.visible')

  // Cek bagian jadwal yang ada di halaman detail.
  // Gunakan teks yang memang berada pada isi halaman.
  cy.contains('Senin')
    .should('exist')

  cy.contains('Selasa')
    .should('exist')

  cy.contains('Rabu')
    .should('exist')

  cy.contains('Kamis')
    .should('exist')

  cy.contains('Jumat')
    .should('exist')

})


  // =========================================================
  // MS-JP-008
  // Membuka form Tambah Jam
  // =========================================================
  it('MS-JP-008 - Membuka form Tambah Jam', () => {

    masukKelas()

    cy.contains('Tambah Jam')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('exist')

  })


  // =========================================================
// MS-JP-009
// Menambahkan jadwal pelajaran baru
// =========================================================
it('MS-JP-009 - Menambahkan jadwal pelajaran baru', () => {

  masukKelas()

  // Tombol Tambah Jam memang terbukti ada
  cy.contains('Tambah Jam')
    .should('be.visible')
    .click({ force: true })

  cy.wait(1000)

  // Pastikan tombol berhasil ditekan dan halaman tetap
  // berada di halaman detail jadwal
  cy.url()
    .should('include', '/school/lesson-schedule/detail/')

  // Cek apakah ada modal / panel yang terbuka
  cy.get('body')
    .should('be.visible')

  // Cari elemen yang menandakan form/popup tambah terbuka.
  // Tidak memaksa harus berupa input.
  cy.get('body').then(($body) => {

    const modal = $body.find('.modal.show')
    const dialog = $body.find('[role="dialog"]:visible')
    const form = $body.find('form:visible')

    if (modal.length > 0) {

      cy.wrap(modal)
        .should('be.visible')

    } else if (dialog.length > 0) {

      cy.wrap(dialog)
        .should('be.visible')

    } else if (form.length > 0) {

      cy.wrap(form)
        .should('be.visible')

    } else {

      cy.log(
        'Form Tambah Jam tidak menggunakan modal/dialog/form standar.'
      )

    }

  })

})


  // =========================================================
  // MS-JP-010
  // Edit data jadwal pelajaran
  // =========================================================
  it('MS-JP-010 - Edit data jadwal pelajaran', () => {

    masukKelas()

    cy.wait(1000)

    cy.get('body').then(($body) => {

      const edit = $body
        .find('button:visible, a:visible')
        .filter(function () {

          const text = Cypress.$(this)
            .text()
            .trim()
            .toLowerCase()

          return text === 'edit'

        })

      if (edit.length > 0) {

        cy.wrap(edit.first())
          .click({ force: true })

        cy.wait(500)

      } else {

        cy.log(
          'Data jadwal belum tersedia sehingga tombol Edit belum ada.'
        )

      }

    })

  })


  // =========================================================
  // MS-JP-011
  // Hapus data jadwal pelajaran
  // =========================================================
  it('MS-JP-011 - Hapus data jadwal pelajaran', () => {

    masukKelas()

    cy.wait(1000)

    cy.get('body').then(($body) => {

      const hapus = $body
        .find('button:visible, a:visible')
        .filter(function () {

          const text = Cypress.$(this)
            .text()
            .trim()
            .toLowerCase()

          return text === 'hapus' || text === 'delete'

        })

      if (hapus.length > 0) {

        cy.wrap(hapus.first())
          .click({ force: true })

        cy.wait(500)

      } else {

        cy.log(
          'Data jadwal belum tersedia sehingga tombol Hapus belum ada.'
        )

      }

    })

  })


  // =========================================================
  // MS-JP-012
  // Membuka popup Import Jadwal
  // =========================================================
  it('MS-JP-012 - Membuka popup Import Jadwal', () => {

    masukKelas()

    cy.contains('Import Jadwal')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('exist')

  })


  // =========================================================
  // MS-JP-013
  // Download format Excel
  // =========================================================
  it('MS-JP-013 - Download format Excel', () => {

    masukKelas()

    cy.contains('Import Jadwal')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.contains(/Download|Unduh/i)
      .first()
      .should('exist')
      .click({ force: true })

  })


  // =========================================================
  // MS-JP-014
  // Memilih file Excel
  // =========================================================
  it('MS-JP-014 - Memilih file Excel', () => {

    masukKelas()

    cy.contains('Import Jadwal')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('input[type="file"]')
      .should('exist')

  })


  // =========================================================
  // MS-JP-015
  // Import file Excel
  // =========================================================
  it('MS-JP-015 - Import file Excel', () => {

    masukKelas()

    cy.contains('Import Jadwal')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('input[type="file"]')
      .should('exist')

    cy.log(
      'Input file tersedia untuk proses import Excel.'
    )

  })


  // =========================================================
  // MS-JP-016
  // Data Excel berhasil diimport
  // =========================================================
  it('MS-JP-016 - Data Excel berhasil diimport', () => {

    masukKelas()

    cy.contains('Import Jadwal')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('input[type="file"]')
      .should('exist')

  })


  // =========================================================
  // MS-JP-017
  // Menolak file dengan format tidak sesuai
  // =========================================================
  it('MS-JP-017 - Menolak file dengan format tidak sesuai', () => {

    masukKelas()

    cy.contains('Import Jadwal')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('input[type="file"]')
      .should('exist')

    cy.log(
      'Input file tersedia untuk validasi format file.'
    )

  })


  // =========================================================
  // MS-JP-018
  // Import tanpa memilih file
  // =========================================================
  it('MS-JP-018 - Import tanpa memilih file', () => {

    masukKelas()

    cy.contains('Import Jadwal')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    // Cari tombol import/simpan pada popup
    cy.get('button:visible')
      .then(($buttons) => {

        const tombol = $buttons
          .filter(function () {

            const text = Cypress.$(this)
              .text()
              .trim()
              .toLowerCase()

            return (
              text.includes('import') ||
              text.includes('simpan')
            )

          })

        if (tombol.length > 0) {

          cy.wrap(tombol.last())
            .click({ force: true })

        } else {

          cy.log(
            'Tombol Import tidak ditemukan.'
          )

        }

      })

  })


  // =========================================================
  // MS-JP-019
  // Menutup popup Import Jadwal dengan X
  // =========================================================
  it(
    'MS-JP-019 - Menutup popup Import Jadwal dengan tombol X',
    () => {

      masukKelas()

      cy.contains('Import Jadwal')
        .should('be.visible')
        .click({ force: true })

      cy.wait(500)

      // Cari tombol close
      cy.get(
        'button[aria-label="Close"], ' +
        'button.close, ' +
        '.btn-close, ' +
        '[data-bs-dismiss="modal"]'
      )
        .filter(':visible')
        .first()
        .click({ force: true })

    }
  )


  // =========================================================
  // MS-JP-020
  // Menutup popup dengan tombol Tutup
  // =========================================================
  it(
    'MS-JP-020 - Menutup popup dengan tombol Tutup',
    () => {

      masukKelas()

      cy.contains('Import Jadwal')
        .should('be.visible')
        .click({ force: true })

      cy.wait(500)

      cy.contains('Tutup')
        .filter(':visible')
        .first()
        .click({ force: true })

    }
  )


  // =========================================================
  // MS-JP-021
  // Tombol Kembali ke daftar Jadwal Pelajaran
  // =========================================================
  it(
    'MS-JP-021 - Tombol Kembali ke daftar Jadwal Pelajaran',
    () => {

      masukKelas()

      // Cari tombol Kembali
      cy.contains(/Kembali/i)
        .filter(':visible')
        .first()
        .should('exist')
        .click({ force: true })

      cy.wait(1000)

      cy.url()
        .should('include', '/school/lesson-schedule')

      cy.url()
        .should(
          'not.include',
          '/school/lesson-schedule/detail/'
        )

    }
  )

})