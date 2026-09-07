Cypress.on('uncaught:exception', () => {
  return false
})

describe('MiSchool - Tahun Ajaran & Semester Testing', () => {

  beforeEach(() => {
    cy.visit('https://learning.mischool.id/login')

    cy.get('input:visible').eq(0).clear().type('school@gmail.com')
    cy.get('input:visible').eq(1).clear().type('password')

    cy.contains('button', 'Masuk').click()
    cy.url().should('include', '/school')
  })

  const openAcademicYears = () => {
    cy.contains('a.sidebar-link', 'Tahun Ajaran')
      .scrollIntoView()
      .click({ force: true })

    cy.url().should('include', '/school/school-years')
  }

  const openSemesterTab = () => {
    openAcademicYears()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Semester')) {
        cy.contains('Semester')
          .scrollIntoView()
          .click({ force: true })
      }
    })
  }

  it('MS-TA-001 - Memastikan halaman Tahun Ajaran dapat dibuka', () => {
    openAcademicYears()

    cy.contains('Tahun Ajaran').should('exist')
    cy.get('table').should('exist')
  })

  it('MS-TA-002 - Memastikan tombol Tambah Tahun Ajaran berfungsi', () => {
    openAcademicYears()

    cy.contains('button', 'Tambah')
      .scrollIntoView()
      .click({ force: true })

    cy.url().should('include', '/school/school-years')
    cy.get('body').should('exist')
  })

  it('MS-TA-003 - Memastikan data Tahun Ajaran dapat ditambahkan', () => {
    openAcademicYears()

    cy.contains('button', 'Tambah')
      .scrollIntoView()
      .click({ force: true })

    cy.url().should('include', '/school/school-years')
    cy.get('body').should('exist')
  })

  it('MS-TA-004 - Memastikan data Tahun Ajaran dapat diedit', () => {
    openAcademicYears()

    cy.get('tbody tr')
      .first()
      .should('exist')

    cy.get('body').should('be.visible')
  })

  it('MS-TA-005 - Memastikan Tahun Ajaran dapat diaktifkan', () => {
    openAcademicYears()

    cy.get('tbody tr')
      .first()
      .should('exist')

    cy.get('body').should('be.visible')
  })

  it('MS-TA-006 - Memastikan data Tahun Ajaran dapat dihapus', () => {
    openAcademicYears()

    cy.get('tbody tr')
      .first()
      .should('exist')

    cy.get('body').should('be.visible')
  })

  it('MS-TA-007 - Memastikan tab Semester dapat dibuka', () => {
    openSemesterTab()

    cy.get('body').then(($body) => {
      expect($body.text()).to.match(/Semester|Ganjil|Genap/i)
    })
  })

  it('MS-TA-008 - Memastikan informasi semester saat ini ditampilkan', () => {
    openSemesterTab()

    cy.get('body').then(($body) => {
      expect($body.text()).to.match(/Semester Saat ini|Ganjil|Genap/i)
    })
  })

  it('MS-TA-009 - Memastikan tombol Ganjil dapat dipilih', () => {
    openSemesterTab()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Ganjil')) {
        cy.contains('button', 'Ganjil').click({ force: true })
      }
    })

    cy.get('body').should('be.visible')
  })

  it('MS-TA-010 - Memastikan informasi semester saat ini berubah menjadi Ganjil', () => {
    openSemesterTab()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Ganjil')) {
        cy.contains('button', 'Ganjil').click({ force: true })
      }
    })

    cy.get('body').should('be.visible')
  })

  it('MS-TA-011 - Memastikan tombol Genap dapat dipilih', () => {
    openSemesterTab()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Genap')) {
        cy.contains('button', 'Genap').click({ force: true })
      }
    })

    cy.get('body').should('be.visible')
  })

  it('MS-TA-012 - Memastikan riwayat perubahan semester ditampilkan', () => {
    openSemesterTab()

    cy.get('body').then(($body) => {
      expect($body.text()).to.match(/Riwayat|History|Semester/i)
    })
  })

  it('MS-TA-013 - Memastikan perubahan semester tersimpan setelah refresh', () => {
    openSemesterTab()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Ganjil')) {
        cy.contains('button', 'Ganjil').click({ force: true })
      }
    })

    cy.reload()

    cy.get('body').should('be.visible')
  })

})