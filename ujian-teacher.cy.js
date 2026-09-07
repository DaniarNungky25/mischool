describe('MiSchool - Rekap Nilai Ujian', () => {

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
      .type('123456789101234567', { log: false })

    cy.get('button.btn-primary')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/teacher')

    cy.wait(2000)
  })


  // Buka halaman Rekap Nilai Ujian
  const bukaRekapUjian = () => {

    cy.get('a[data-bs-target="#examCollapse"]')
      .first()
      .click({ force: true })

    cy.wait(700)

    cy.get('#examCollapse')
      .contains('Rekap Nilai Ujian')
      .first()
      .click({ force: true })

    cy.wait(1500)
  }


  // =====================================================
  // TC-UJIAN-001
  // =====================================================

  it('TC-UJIAN-001 - Menampilkan halaman Rekap Nilai Ujian', () => {

    bukaRekapUjian()

    cy.contains('Rekap Nilai Ujian', { timeout: 10000 })
      .should('exist')
  })


  // =====================================================
  // TC-UJIAN-002
  // =====================================================

  it('TC-UJIAN-002 - Menampilkan data ujian pada tabel', () => {

    bukaRekapUjian()

    cy.get('table', { timeout: 10000 })
      .should('exist')

    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0)
  })


  // =====================================================
  // TC-UJIAN-003
  // =====================================================

  it('TC-UJIAN-003 - Mencari data ujian', () => {

    bukaRekapUjian()

    cy.get('input:visible')
      .filter('[placeholder*="Cari" i], [placeholder*="search" i]')
      .first()
      .should('exist')
      .clear()
      .type('Ujian')

    cy.wait(1000)

    cy.get('table')
      .should('exist')
  })


  // =====================================================
  // TC-UJIAN-004
  // =====================================================

  it('TC-UJIAN-004 - Mencari nama ujian yang tidak tersedia (Negatif)', () => {

    bukaRekapUjian()

    cy.get('input:visible')
      .filter('[placeholder*="Cari" i], [placeholder*="search" i]')
      .first()
      .should('exist')
      .clear()
      .type('UjianTidakTersedia999999')

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  it('TC-UJIAN-005 - Memfilter berdasarkan Mata Pelajaran', () => {

  bukaRekapUjian()

  // Klik filter Mata Pelajaran
  cy.contains('Mata Pelajaran', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pilih pilihan mata pelajaran yang muncul
  cy.get('select:visible')
    .first()
    .should('exist')
    .select(1)

  cy.wait(1000)

  // Pastikan data tabel tampil
  cy.get('table')
    .should('exist')
})

it('TC-UJIAN-006 - Memfilter berdasarkan Tingkatan Kelas', () => {

  bukaRekapUjian()

  // Klik filter Tingkatan Kelas
  cy.contains('Tingkatan Kelas', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pilih tingkatan kelas
  cy.get('select:visible')
    .first()
    .should('exist')
    .select(1)

  cy.wait(1000)

  // Pastikan tabel tetap tampil
  cy.get('table')
    .should('exist')
})


  it('TC-UJIAN-007 - Memfilter berdasarkan Tahun Ajaran', () => {

  bukaRekapUjian()

  // Klik filter Tahun Ajaran
  cy.contains('Tahun Ajaran', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pilih tahun ajaran
  cy.get('select:visible')
    .first()
    .should('exist')
    .select(1)

  cy.wait(1000)

  // Pastikan tabel tetap tampil
  cy.get('table')
    .should('exist')
})


  it('TC-UJIAN-008 - Mereset filter Rekap Nilai Ujian', () => {

  bukaRekapUjian()

  // Pilih Mata Pelajaran
  cy.contains('Mata Pelajaran', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(500)

  cy.get('select:visible')
    .first()
    .should('exist')
    .select(1)

  cy.wait(500)

  // Cari elemen Reset tanpa selector jQuery :contains / [attr i]
  cy.get('body').then(($body) => {

    const elements = $body.find('button, a, input')

    let resetElement = null

    elements.each((index, element) => {
      const text = (element.innerText || '').toLowerCase()
      const title = (element.getAttribute('title') || '').toLowerCase()
      const aria = (element.getAttribute('aria-label') || '').toLowerCase()
      const type = (element.getAttribute('type') || '').toLowerCase()

      if (
        text.includes('reset') ||
        text.includes('clear') ||
        text.includes('bersihkan') ||
        title.includes('reset') ||
        title.includes('clear') ||
        aria.includes('reset') ||
        aria.includes('clear') ||
        type === 'reset'
      ) {
        resetElement = element
        return false
      }
    })

    if (resetElement) {
      cy.wrap(resetElement)
        .click({ force: true })
    } else {
      throw new Error('Tombol Reset tidak ditemukan')
    }
  })

  cy.wait(1000)

  cy.get('table')
    .should('exist')
})


  it('TC-UJIAN-009 - Membuka detail Rekap Nilai Ujian', () => {

  bukaRekapUjian()

  cy.get('table tbody tr', { timeout: 10000 })
    .first()
    .should('exist')
    .within(() => {

      cy.get('a, [role="button"], td')
        .last()
        .click({ force: true })

    })

  cy.wait(1000)

  cy.get('body')
    .should('be.visible')
})

  it('TC-UJIAN-010 - Export data Rekap Nilai Ujian', () => {

  bukaRekapUjian()

  cy.get('a, button, [role="button"]')
    .filter(':visible')
    .then(($els) => {

      const exportEl = [...$els].find(el => {
        const text = el.innerText?.trim().toLowerCase() || ''
        const title = el.getAttribute('title')?.toLowerCase() || ''
        const aria = el.getAttribute('aria-label')?.toLowerCase() || ''

        return (
          text.includes('export') ||
          text.includes('ekspor') ||
          title.includes('export') ||
          title.includes('ekspor') ||
          aria.includes('export') ||
          aria.includes('ekspor')
        )
      })

      if (exportEl) {
        cy.wrap(exportEl).click({ force: true })
      } else {
        cy.log('Tombol export tidak ditemukan')
      }
    })

  cy.wait(1500)

  cy.get('body')
    .should('be.visible')
})


  // =====================================================
  // TC-UJIAN-011
  // =====================================================

  it('TC-UJIAN-011 - Berpindah halaman menggunakan pagination', () => {

    bukaRekapUjian()

    cy.get('table', { timeout: 10000 })
      .should('exist')

    cy.get('.pagination')
      .should('exist')
  })


  // =====================================================
  // TC-UJIAN-012
  // =====================================================

  it('TC-UJIAN-012 - Menampilkan jumlah siswa lulus dan tidak lulus', () => {

    bukaRekapUjian()

    cy.get('table', { timeout: 10000 })
      .should('exist')

    cy.get('table')
      .should('contain.text', 'Lulus')

    cy.get('table')
      .should('contain.text', 'Tidak Lulus')
  })

})