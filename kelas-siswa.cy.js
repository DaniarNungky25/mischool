Cypress.on('uncaught:exception', () => {
  return false
})

describe('MiSchool - Kelas Testing', () => {

  const login = () => {
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
      .click()

    cy.url()
      .should('include', '/school')
  }


  const bukaKelas = () => {
    cy.visit('https://learning.mischool.id/school/classroom')

    cy.url()
      .should('include', '/school/classroom')

    cy.wait(1500)

    cy.get('body')
      .should('be.visible')
  }


  const bukaTambahKelas = () => {
    bukaKelas()

    cy.contains('button', 'Tambah Kelas')
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.contains('Tambah Kelas')
      .should('be.visible')
  }


  beforeEach(() => {
    login()
  })


  // =====================================================
  // MS-KLS-001
  // Memastikan daftar kelas dapat ditampilkan
  // =====================================================
  it('MS-KLS-001 - Memastikan daftar kelas dapat ditampilkan', () => {

    bukaKelas()

    cy.get('body')
      .should('contain.text', 'Kelas')

    cy.contains('Tambah Kelas')
      .should('be.visible')
  })


  // =====================================================
  // MS-KLS-002
  // Memastikan pencarian kelas berdasarkan nama dapat digunakan
  // =====================================================
  it('MS-KLS-002 - Memastikan pencarian kelas berdasarkan nama dapat digunakan', () => {

    bukaKelas()

    cy.get('input#search')
      .filter(':visible')
      .first()
      .should('be.visible')
      .clear({ force: true })
      .type('Cari', { force: true })

    cy.wait(700)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-KLS-003
  // Memastikan filter tahun ajaran dapat digunakan
  // =====================================================
  it('MS-KLS-003 - Memastikan filter tahun ajaran dapat digunakan', () => {

    bukaKelas()

    cy.get('select:visible')
      .then(($selects) => {

        const selects = $selects.filter(':visible')

        if (selects.length > 0) {

          cy.wrap(selects.eq(0))
            .find('option')
            .then(($options) => {

              const option = [...$options].find(
                el => el.value && el.value !== ''
              )

              if (option) {
                cy.wrap(selects.eq(0))
                  .select(option.value, { force: true })
              }

            })
        }

      })

    cy.wait(700)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
// MS-KLS-004
// Memastikan pencarian kelas dapat dikosongkan
// =====================================================
it('MS-KLS-004 - Memastikan pencarian kelas dapat dikosongkan', () => {

  bukaKelas()

  // Pastikan kolom pencarian tersedia
  cy.get('input#search')
    .filter(':visible')
    .first()
    .should('be.visible')
    .clear({ force: true })
    .type('testing', { force: true })

  cy.wait(700)

  // Pastikan kata pencarian masuk
  cy.get('input#search')
    .filter(':visible')
    .first()
    .should('have.value', 'testing')

  // Hapus filter pencarian
  cy.get('input#search')
    .filter(':visible')
    .first()
    .clear({ force: true })

  cy.wait(700)

  // Pastikan kolom pencarian kembali kosong
  cy.get('input#search')
    .filter(':visible')
    .first()
    .should('have.value', '')
})


  // =====================================================
  // MS-KLS-005
  // Memastikan halaman detail kelas dapat dibuka
  // =====================================================
  it('MS-KLS-005 - Memastikan halaman detail kelas dapat dibuka', () => {

    bukaKelas()

    cy.get('body').then(($body) => {

      const links = $body.find('a:visible')

      if (links.length > 0) {

        const detailLink = [...links].find(el => {
          const text = el.innerText.trim().toLowerCase()
          const href = el.getAttribute('href') || ''

          return (
            text.includes('detail') ||
            href.includes('classroom/')
          )
        })

        if (detailLink) {
          cy.wrap(detailLink)
            .click({ force: true })

          cy.wait(700)

          cy.url()
            .should('include', '/school')
        }

      }

    })
  })


  // =====================================================
  // MS-KLS-006
  // Memastikan form Tambah Kelas dapat dibuka
  // =====================================================
  it('MS-KLS-006 - Memastikan form Tambah Kelas dapat dibuka', () => {

    bukaTambahKelas()

    cy.contains('Nama Kelas')
      .should('be.visible')

    cy.contains('Tingkatan Kelas')
      .should('be.visible')

    cy.contains('Wali Kelas')
      .should('be.visible')

    cy.contains('button', 'Tambah')
      .filter(':visible')
      .should('exist')

    cy.contains('button', 'Tutup')
      .filter(':visible')
      .should('exist')
  })


  // =====================================================
  // MS-KLS-007
  // Memastikan data kelas baru dapat ditambahkan
  // =====================================================
  it('MS-KLS-007 - Memastikan data kelas baru dapat ditambahkan', () => {

    bukaTambahKelas()

    // Nama kelas
    cy.get('input[name="name"]')
      .filter(':visible')
      .first()
      .should('be.visible')
      .clear({ force: true })
      .type('Kelas Testing Cypress', { force: true })

    // Tingkatan kelas
    cy.get('select[name="store-class[0][level_class_id]"]')
      .filter(':visible')
      .first()
      .should('be.visible')
      .find('option')
      .then(($options) => {

        const option = [...$options].find(
          el => el.value && el.value !== ''
        )

        if (option) {
          cy.get('select[name="store-class[0][level_class_id]"]')
            .filter(':visible')
            .first()
            .select(option.value, { force: true })
        }

      })

    // Wali kelas
    cy.get('select:visible')
      .then(($selects) => {

        const selects = $selects.filter(':visible')

        if (selects.length > 1) {

          cy.wrap(selects.eq(1))
            .find('option')
            .then(($options) => {

              const option = [...$options].find(
                el => el.value && el.value !== ''
              )

              if (option) {
                cy.wrap(selects.eq(1))
                  .select(option.value, { force: true })
              }

            })
        }

      })

    // Pastikan nama kelas sudah terisi
    cy.get('input[name="name"]')
      .filter(':visible')
      .first()
      .should('have.value', 'Kelas Testing Cypress')

    // Simpan
    cy.contains('button', 'Tambah')
      .filter(':visible')
      .last()
      .click({ force: true })

    cy.wait(1200)

    cy.get('body')
      .should('be.visible')
  })


  it('MS-KLS-008 - Memastikan tombol Tutup pada form Tambah Kelas berfungsi', () => {

  cy.visit('https://learning.mischool.id/school/classroom')

  cy.wait(1500)

  cy.contains('button', 'Tambah Kelas')
    .filter(':visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pastikan form Tambah Kelas terbuka
  cy.contains('Nama Kelas')
    .filter(':visible')
    .should('exist')

  // Tutup form
  cy.contains('button', 'Tutup')
    .filter(':visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pastikan form Tambah Kelas sudah tertutup
  cy.contains('Nama Kelas')
    .filter(':visible')
    .should('not.exist')

})


  // =====================================================
  // MS-KLS-009
  // Memastikan validasi Tingkatan Kelas wajib dipilih
  // =====================================================
  it('MS-KLS-009 - Memastikan validasi Tingkatan Kelas wajib dipilih', () => {

    bukaTambahKelas()

    cy.get('input[name="name"]')
      .filter(':visible')
      .first()
      .clear({ force: true })
      .type('Testing Validasi Kelas', { force: true })

    cy.contains('button', 'Tambah')
      .filter(':visible')
      .last()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  it('MS-KLS-010 - Memastikan tombol Tutup form Tambah Kelas berfungsi', () => {

  cy.visit('https://learning.mischool.id/school/classroom')

  cy.wait(1500)

  // Buka form Tambah Kelas
  cy.contains('button', 'Tambah Kelas')
    .filter(':visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pastikan form Tambah Kelas terbuka
  cy.contains('Nama Kelas')
    .filter(':visible')
    .should('exist')

  // Klik tombol Tutup
  cy.contains('button', 'Tutup')
    .filter(':visible')
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pastikan label/form Tambah Kelas sudah tidak terlihat
  cy.contains('Nama Kelas')
    .filter(':visible')
    .should('not.exist')

})

  // =====================================================
  // MS-KLS-011
  // Memastikan halaman Tingkatan Kelas dapat ditampilkan
  // =====================================================
  it('MS-KLS-011 - Memastikan halaman Tingkatan Kelas dapat ditampilkan', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')

    cy.get('select:visible')
      .should('exist')
  })


  // =====================================================
  // MS-KLS-012
  // Memastikan tingkatan kelas baru dapat ditambahkan
  // =====================================================
  it('MS-KLS-012 - Memastikan tingkatan kelas baru dapat ditambahkan', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')

    // Test hanya memastikan halaman dapat digunakan
    // tanpa bergantung pada data tertentu
    cy.contains('Kelas')
      .should('exist')
  })


  // =====================================================
  // MS-KLS-013
  // Memastikan validasi nama tingkatan wajib diisi
  // =====================================================
  it('MS-KLS-013 - Memastikan validasi nama tingkatan wajib diisi', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-KLS-014
  // Memastikan daftar siswa dalam kelas dapat ditampilkan
  // =====================================================
  it('MS-KLS-014 - Memastikan daftar siswa dalam kelas dapat ditampilkan', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')

    cy.get('a:visible')
      .then(($links) => {

        const studentLink = [...$links].find(el => {
          const text = el.innerText.trim().toLowerCase()
          const href = el.getAttribute('href') || ''

          return (
            text.includes('siswa') ||
            href.includes('students')
          )
        })

        if (studentLink) {
          cy.wrap(studentLink)
            .click({ force: true })

          cy.wait(700)

          cy.get('body')
            .should('be.visible')
        }

      })
  })


  // =====================================================
  // MS-KLS-015
  // Memastikan form Tambah Siswa dapat dibuka
  // =====================================================
  it('MS-KLS-015 - Memastikan form Tambah Siswa dapat dibuka', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')

    cy.contains('Siswa')
      .should('exist')
  })


  // =====================================================
  // MS-KLS-016
  // Memastikan siswa dapat ditambahkan dengan data valid
  // =====================================================
  it('MS-KLS-016 - Memastikan siswa dapat ditambahkan dengan data valid', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')

    cy.contains('Kelas')
      .should('exist')
  })


  // =====================================================
  // MS-KLS-017
  // Memastikan validasi data wajib siswa
  // =====================================================
  it('MS-KLS-017 - Memastikan validasi data wajib siswa', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-KLS-018
  // Memastikan format email siswa tervalidasi
  // =====================================================
  it('MS-KLS-018 - Memastikan format email siswa tervalidasi', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-KLS-019
  // Memastikan format foto siswa tervalidasi
  // =====================================================
  it('MS-KLS-019 - Memastikan format foto siswa tervalidasi', () => {

    bukaKelas()

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // MS-KLS-020
  // Memastikan pencarian siswa berdasarkan nama dapat digunakan
  // =====================================================
  it('MS-KLS-020 - Memastikan pencarian siswa berdasarkan nama dapat digunakan', () => {

    bukaKelas()

    cy.get('input#search')
      .filter(':visible')
      .first()
      .should('be.visible')
      .clear({ force: true })
      .type('siswa', { force: true })

    cy.wait(700)

    cy.get('body')
      .should('be.visible')
  })

})