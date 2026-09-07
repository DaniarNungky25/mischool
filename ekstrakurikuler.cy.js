Cypress.on('uncaught:exception', () => {
  return false
})

describe('MiSchool - Ekstrakurikuler Testing', () => {

  beforeEach(() => {
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

    cy.url().should('include', '/school')
  })


  // MS-EKS-001
  it('MS-EKS-001 - Menampilkan halaman Ekstrakurikuler', () => {
    cy.visit('https://learning.mischool.id/school/extracurricular')

    cy.url()
      .should('include', '/school/extracurricular')

    cy.contains('Paskibra')
      .should('be.visible')
  })


  // MS-EKS-002
  it('MS-EKS-002 - Menampilkan data ekstrakurikuler yang telah ditambahkan (Paskibra)', () => {
    cy.visit('https://learning.mischool.id/school/extracurricular')

    cy.contains('Paskibra')
      .should('be.visible')
  })


  // MS-EKS-003
  it('MS-EKS-003 - Melihat detail ekstrakurikuler Paskibra', () => {
    cy.visit('https://learning.mischool.id/school/extracurricular')

    cy.contains('Paskibra')
      .should('be.visible')

    cy.contains('button, a', 'Detail')
      .first()
      .click({ force: true })

    cy.contains('Paskibra')
      .should('be.visible')
  })


  // MS-EKS-004
  it('MS-EKS-004 - Memastikan data anggota ekstrakurikuler kosong', () => {
    cy.visit('https://learning.mischool.id/school/extracurricular')

    cy.contains('Paskibra')
      .should('be.visible')

    cy.contains('button, a', 'Detail')
      .first()
      .click({ force: true })

    cy.contains('Belum ada data')
      .should('be.visible')
  })


  // MS-EKS-005
  it('MS-EKS-005 - Memastikan tombol Tambah Siswa tersedia', () => {
    cy.visit('https://learning.mischool.id/school/extracurricular')

    cy.contains('Paskibra')
      .should('be.visible')

    cy.contains('button, a', 'Detail')
      .first()
      .click({ force: true })

    cy.contains('Tambah Siswa')
      .should('be.visible')
  })

})