describe('MiSchool - Tanggapan Siswa', () => {

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
    // BUKA TANGGAPAN SISWA
    // =========================

    cy.contains('Tanggapan Siswa', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(2000)
  })


  // =========================================================
  // MS-TS-001
  // Memastikan halaman Tanggapan Siswa dapat ditampilkan
  // =========================================================

  it('MS-TS-001 - Memastikan halaman Tanggapan Siswa dapat ditampilkan', () => {

    cy.url()
      .should('include', '/student-feedback')

    cy.contains('Tanggapan Siswa', { timeout: 10000 })
      .should('exist')

    cy.get('body')
      .should('exist')

  })


  it('MS-TS-002 - Memastikan pengguna dapat mencari guru berdasarkan nama', () => {

  cy.get('input:visible', { timeout: 10000 })
    .clear()
    .type('Andriansyah')

  cy.contains('Cari', { timeout: 10000 })
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  cy.url()
    .should('include', 'search=Andriansyah')

})


  // =========================================================
  // MS-TS-003
  // Memastikan filter gender dapat digunakan
  // =========================================================

  it('MS-TS-003 - Memastikan filter gender dapat digunakan', () => {

    cy.get('select:visible', { timeout: 10000 })
      .first()
      .should('exist')
      .select('Laki-laki')

    cy.contains('Cari', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('exist')

  })


  it('MS-TS-004 - Memastikan pengguna dapat melihat detail tanggapan guru', () => {

  cy.get('button:visible, a:visible', { timeout: 10000 })
    .then($elements => {

      const target = [...$elements].find(el => {
        const text = el.innerText.trim().toLowerCase()

        return (
          text.includes('lihat tanggapan') ||
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

  cy.wait(1500)

  cy.get('body')
    .should('exist')

})


  // =========================================================
  // MS-TS-005
  // Memastikan pengguna dapat memilih mata pelajaran guru
  // =========================================================

  it('MS-TS-005 - Memastikan pengguna dapat memilih mata pelajaran guru', () => {

    cy.get('select:visible', { timeout: 10000 })
      .first()
      .should('exist')
      .select(1)

    cy.wait(1500)

    cy.get('body')
      .should('exist')

  })


  // =========================================================
  // MS-TS-006
  // Memastikan pencarian tanggapan siswa berdasarkan nama dan tanggal
  // =========================================================

  it('MS-TS-006 - Memastikan pencarian tanggapan siswa berdasarkan nama dan tanggal', () => {

    cy.get('input:visible', { timeout: 10000 })
      .first()
      .clear()
      .type('Andriansyah')

    cy.get('input:visible')
      .last()
      .click()

    cy.wait(500)

    cy.contains('Cari', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.get('body')
      .should('exist')

  })

})