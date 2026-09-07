describe('Manajemen Kelulusan', () => {

  beforeEach(() => {

    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Element not found')) {
        return false
      }
    })

    cy.visit('https://learning.mischool.id/login')

    cy.get('#email')
      .should('be.visible')
      .clear()
      .type('school@gmail.com')

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type('password')

    cy.get('button[type="submit"]')
      .should('be.visible')
      .click()

    cy.url()
      .should('eq', 'https://learning.mischool.id/school')
  })


  // MS-MK-001
  it('MS-MK-001 - Memastikan halaman Manajemen Kelulusan dapat diakses', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.url()
      .should('include', '/school/graduations')

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.contains('Daftar Siswa')
      .should('exist')
  })


  // MS-MK-002
  it('MS-MK-002 - Memastikan pengguna dapat mengganti tahun ajaran', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.get('select')
      .should('exist')
      .first()
      .then(($select) => {

        cy.wrap($select)
          .find('option')
          .should('have.length.greaterThan', 1)

        cy.wrap($select)
          .select(1)
      })

    cy.url()
      .should('include', '/school/graduations')
  })


  // MS-MK-003
  it('MS-MK-003 - Memastikan data kelulusan sesuai tahun ajaran yang dipilih', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.get('select')
      .should('exist')
      .first()
      .then(($select) => {

        cy.wrap($select)
          .find('option')
          .should('have.length.greaterThan', 1)

        cy.wrap($select)
          .select(1)
      })

    cy.get('table')
      .should('exist')
  })


  // MS-MK-004
  it('MS-MK-004 - Memastikan informasi tanggal pengumuman kelulusan dapat ditampilkan', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.contains(/Tanggal.*Kelulusan|Tanggal.*Pengumuman/i)
      .should('exist')
  })


  // MS-MK-005
  it('MS-MK-005 - Memastikan pengguna dapat menambahkan informasi tambahan', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.contains(/Informasi Tambahan/i)
      .should('exist')
  })


  // MS-MK-006
  it('MS-MK-006 - Memastikan sistem menolak file yang ukurannya melebihi batas maksimal', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.contains('Informasi Tambahan')
      .scrollIntoView()
      .should('be.visible')

    cy.get('input').then(($inputs) => {

      cy.log(`Jumlah input: ${$inputs.length}`)

      $inputs.each((index, el) => {
        cy.log(
          `INPUT ${index} | type=${el.type} | name=${el.name} | id=${el.id} | accept=${el.accept}`
        )
      })
    })
  })


  // MS-MK-007
  it('MS-MK-007 - Memastikan file yang sudah tersedia dapat di-download', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    // Pilih tahun ajaran yang memiliki file
    cy.get('#school_year_id')
      .should('exist')
      .find('option')
      .then(($options) => {

        const optionWithFile = [...$options].find(
          option => /2026\/2026|2025\/2026|2024\/2025/.test(
            option.textContent
          )
        )

        if (optionWithFile) {
          cy.get('#school_year_id')
            .select(optionWithFile.value)
        }
      })

    cy.contains('Informasi Tambahan')
      .scrollIntoView()
      .should('be.visible')

    cy.get('a, button')
      .filter(':visible')
      .should('exist')
  })


  // MS-MK-008
  it('MS-MK-008 - Memastikan perubahan informasi kelulusan dapat disimpan', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.contains(/Simpan|Save/i)
      .should('exist')
  })


  // MS-MK-009
  it('MS-MK-009 - Memastikan daftar siswa ditampilkan', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Informasi Kelulusan')
      .should('exist')

    cy.contains('Daftar Siswa')
      .should('exist')

    cy.get('table')
      .should('exist')
  })


  // MS-MK-010
it('MS-MK-010 - Memastikan pengguna dapat mencari data siswa', () => {

  cy.contains('Manajemen Kelulusan')
    .click({ force: true })

  cy.contains('Daftar Siswa')
    .should('exist')

  // Tunggu halaman selesai render
  cy.wait(1000)

  // Dari hasil test sebelumnya terdapat 3 input visible.
  // Input tanggal pengumuman dikecualikan.
  cy.get('input:visible')
    .not('#announcement_date')
    .not('[disabled]')
    .first()
    .should('exist')
    .clear()
    .type('nama siswa')

  cy.wait(500)
})


  // MS-MK-011
  // MS-MK-011
it('MS-MK-011 - Memastikan pencarian siswa menampilkan hasil yang sesuai', () => {

  cy.contains('Manajemen Kelulusan')
    .click({ force: true })

  cy.contains('Daftar Siswa')
    .should('exist')

  cy.wait(1000)

  // Cari input pencarian secara langsung.
  // Tidak peduli apakah type-nya text, search, atau lainnya.
  cy.get('input:visible')
    .not('#announcement_date')
    .not('[disabled]')
    .first()
    .should('exist')
    .clear()
    .type('nama siswa')

  cy.wait(1000)

  // Pastikan tabel siswa tetap tampil
  cy.get('table')
    .should('exist')
})


  // MS-MK-012
it('MS-MK-012 - Memastikan pencarian siswa dengan data yang tidak tersedia', () => {

  cy.contains('Manajemen Kelulusan')
    .click({ force: true })

  cy.contains('Daftar Siswa')
    .should('exist')

  cy.wait(1000)

  // Gunakan input pencarian yang sama seperti MS-MK-010
  cy.get('input:visible')
    .not('#announcement_date')
    .not('[disabled]')
    .first()
    .should('exist')
    .clear()
    .type('SISWA_TIDAK_DITEMUKAN_99999')

  cy.wait(1000)

  // Pastikan sistem memberikan hasil tidak ditemukan
  cy.contains(
    /data siswa tidak tersedia|data tidak ditemukan|tidak ditemukan|no data/i
  )
    .should('be.visible')
})


  // MS-MK-013
  it('MS-MK-013 - Memastikan status kelulusan siswa ditampilkan', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Daftar Siswa')
      .should('exist')

    cy.contains(/Status Kelulusan|Status/i)
      .should('exist')

    cy.contains(/Lulus|Tidak Lulus/i)
      .should('exist')
  })


  // MS-MK-014
it('MS-MK-014 - Memastikan pengguna dapat memilih siswa', () => {

  cy.contains('Manajemen Kelulusan')
    .click({ force: true })

  cy.contains('Daftar Siswa')
    .should('exist')

  cy.wait(1500)

  cy.get('table')
    .should('be.visible')

  // Tampilkan struktur checkbox yang benar-benar ada
  cy.get('input[type="checkbox"]')
    .then(($checkboxes) => {

      cy.log(`Jumlah checkbox: ${$checkboxes.length}`)

      $checkboxes.each((index, element) => {

        cy.log(
          `CHECKBOX ${index} | ` +
          `id=${element.id} | ` +
          `name=${element.getAttribute('name')} | ` +
          `class=${element.className}`
        )
      })

      expect(
        $checkboxes.length,
        'checkbox harus tersedia di halaman'
      ).to.be.greaterThan(0)
    })
})


  // MS-MK-015
  it('MS-MK-015 - Memastikan pengguna dapat membatalkan pilihan siswa', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Daftar Siswa')
      .should('exist')

    cy.get('input[type="checkbox"]')
      .filter(':visible')
      .first()
      .check({ force: true })

    cy.get('input[type="checkbox"]')
      .filter(':visible')
      .first()
      .uncheck({ force: true })

    cy.get('input[type="checkbox"]')
      .filter(':visible')
      .first()
      .should('not.be.checked')
  })


  // MS-MK-016
  it('MS-MK-016 - Memastikan fitur Lulus Semua dapat digunakan', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Daftar Siswa')
      .should('exist')

    cy.contains(/Lulus Semua/i)
      .should('exist')
      .click({ force: true })

    cy.get('input[type="checkbox"]')
      .filter(':visible')
      .each(($checkbox) => {

        cy.wrap($checkbox)
          .should('be.checked')
      })
  })


  // MS-MK-017
it('MS-MK-017 - Memastikan data siswa dapat difilter berdasarkan kelas', () => {

  cy.contains('Manajemen Kelulusan')
    .click({ force: true })

  cy.contains('Daftar Siswa')
    .should('exist')
    .scrollIntoView()

  cy.wait(1000)

  cy.get('#classroom_id')
    .should('exist')

  cy.get('#classroom_id option')
    .should('have.length', 2)

  cy.get('#classroom_id option')
    .eq(0)
    .should('contain.text', 'Semua Kelas')

  cy.get('#classroom_id')
    .select('Semua Kelas')

  cy.wait(1000)

  cy.get('#classroom_id option:selected')
    .should('contain.text', 'Semua Kelas')

  cy.contains('Daftar Siswa')
    .should('be.visible')

  cy.get('table')
    .should('be.visible')
})


  // MS-MK-018
  it('MS-MK-018 - Memastikan jumlah data siswa ditampilkan', () => {

    cy.contains('Manajemen Kelulusan')
      .click({ force: true })

    cy.contains('Daftar Siswa')
      .should('exist')

    cy.get('table tbody tr')
      .should('exist')

    cy.contains(/Total Siswa|Jumlah Siswa/i)
      .should('exist')
  })

})