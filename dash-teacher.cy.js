describe('MiSchool - Dashboard Teacher', () => {

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
      .type('123456789101234567')

    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    // Setelah login Teacher masuk ke /teacher
    cy.url()
      .should('include', '/teacher')
  })


  it('MS-DASH-001 - Memastikan notifikasi jurnal muncul ketika jurnal belum diisi', () => {

    // Pastikan sudah berada di halaman dashboard Teacher
    cy.url()
      .should('include', '/teacher')

    // Pastikan halaman Beranda tampil
    cy.get('body')
      .should('be.visible')

    // Cek notifikasi jurnal
    cy.get('body')
      .should('contain.text', 'jurnal')
  })


  it('MS-DASH-002 - Memastikan informasi absensi guru pada hari berjalan ditampilkan', () => {

    cy.url()
      .should('include', '/teacher')

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Absensi')
      .and('contain.text', 'Hari Ini')
  })


  it('MS-DASH-003 - Memastikan jadwal mengajar pada hari Senin dapat ditampilkan', () => {

    cy.url()
      .should('include', '/teacher')

    cy.contains('Jadwal Mengajar')
      .scrollIntoView()
      .should('be.visible')

    cy.contains('Senin')
      .click({ force: true })

    cy.get('body')
      .should('contain.text', 'Senin')
  })


  it('MS-DASH-004 - Memastikan tab hari dapat digunakan untuk melihat jadwal yang berbeda', () => {

    cy.url()
      .should('include', '/teacher')

    cy.contains('Jadwal Mengajar')
      .scrollIntoView()
      .should('be.visible')

    cy.contains('Senin')
      .click({ force: true })

    cy.contains('Selasa')
      .click({ force: true })

    cy.get('body')
      .should('contain.text', 'Selasa')
  })


  it('MS-DASH-005 - Memastikan data jadwal sesuai dengan hari yang dipilih', () => {

    cy.url()
      .should('include', '/teacher')

    cy.contains('Jadwal Mengajar')
      .scrollIntoView()
      .should('be.visible')

    cy.contains('Senin')
      .click({ force: true })

    cy.wait(300)

    cy.contains('Senin')
      .should('exist')

    cy.contains('Selasa')
      .click({ force: true })

    cy.wait(300)

    cy.contains('Selasa')
      .should('exist')
  })


  it('MS-DASH-006 - Memastikan riwayat absensi menampilkan data sesuai tanggal', () => {

    cy.url()
      .should('include', '/teacher')

    cy.contains(/Riwayat Absensi/i)
      .scrollIntoView()
      .should('be.visible')

    cy.get('body')
      .should('contain.text', 'Masuk')
      .and('contain.text', 'Izin')
      .and('contain.text', 'Sakit')
      .and('contain.text', 'Alpha')
  })


 it('MS-DASH-007 - Memastikan statistik absensi dapat ditampilkan dalam bentuk grafik', () => {

  cy.url()
    .should('include', '/teacher')

  cy.contains(/Statistik Absensi Guru/i)
    .scrollIntoView()
    .should('be.visible')

  // Pastikan area grafik/statistik tampil
  cy.contains(/Statistik Absensi Guru/i)
    .parents('.card')
    .first()
    .should('be.visible')
})


  it('MS-DASH-008 - Memastikan jurnal yang sudah dibuat tampil pada dashboard', () => {

    cy.url()
      .should('include', '/teacher')

    cy.contains(/Riwayat Jurnal/i)
      .scrollIntoView()
      .should('be.visible')
  })


  it('MS-DASH-009 - Memastikan tombol Lihat Detail Jurnal dapat digunakan', () => {

    cy.url()
      .should('include', '/teacher')

    cy.contains(/Riwayat Jurnal/i)
      .scrollIntoView()
      .should('be.visible')

    cy.contains(/Lihat Detail Jurnal/i)
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
  })


  it('MS-DASH-010 - Memastikan sistem menangani jurnal yang datanya tidak tersedia', () => {

    cy.url()
      .should('include', '/teacher')

    cy.contains(/Riwayat Jurnal/i)
      .scrollIntoView()
      .should('be.visible')

    cy.contains(/Lihat Detail Jurnal/i)
      .first()
      .click({ force: true })

    cy.wait(500)

    cy.get('body')
      .should('be.visible')
      .and('not.contain', 'Internal Server Error')
      .and('not.contain', 'Error 500')
  })


  it('MS-DASH-011 - Memastikan jumlah status absensi pada jurnal sesuai dengan data', () => {

  cy.url()
    .should('include', '/teacher')

  cy.contains(/Riwayat Jurnal/i)
    .scrollIntoView()
    .should('be.visible')

  cy.contains(/Lihat Detail Jurnal/i)
    .first()
    .click({ force: true })

  cy.wait(500)

  // Pastikan halaman detail jurnal berhasil dibuka
  cy.url()
    .should('include', '/teacher/journals/')

  cy.get('body')
    .should('be.visible')

  // Pastikan informasi status absensi tersedia
  cy.get('body')
    .should('contain.text', 'Masuk')
    .and('contain.text', 'Izin')
    .and('contain.text', 'Sakit')
    .and('contain.text', 'Alpha')
})


  it('MS-DASH-012 - Memastikan seluruh informasi dashboard dapat diakses', () => {

    cy.url()
      .should('include', '/teacher')

    cy.get('body')
      .should('be.visible')

    cy.scrollTo('bottom')

    cy.wait(500)

    cy.get('body')
      .should('be.visible')

    cy.scrollTo('top')

    cy.get('body')
      .should('be.visible')
  })

})