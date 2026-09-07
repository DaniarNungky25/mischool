Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Setting - Informasi Sekolah', () => {

  beforeEach(() => {

    cy.visit('https://learning.mischool.id/login')

    // Login
    cy.get('#email')
      .should('be.visible')
      .clear()
      .type('school@gmail.com')

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type('password')

    cy.get('#password')
      .closest('form')
      .submit()

    cy.url({ timeout: 10000 })
      .should('include', '/school')
  })


  // =====================================================
  // MS-INFO-001
  // Membuka halaman Informasi Sekolah
  // =====================================================

  it('MS-INFO-001 - Membuka halaman Informasi Sekolah', () => {

    cy.visit('https://learning.mischool.id/school/information')

    cy.url()
      .should('include', '/school/information')

    cy.contains('Detail Sekolah')
      .should('be.visible')

    cy.contains('Daftar RFID Sekolah')
      .should('be.visible')
  })


  // =====================================================
  // MS-INFO-002
  // Memastikan detail informasi sekolah ditampilkan
  // =====================================================

  it('MS-INFO-002 - Memastikan detail informasi sekolah ditampilkan', () => {

    cy.visit('https://learning.mischool.id/school/information')

    cy.contains('Detail Sekolah')
      .should('be.visible')

    cy.contains('Kepala Sekolah')
      .should('be.visible')

    cy.contains('NPSN')
      .should('be.visible')

    cy.contains('Nomor Telepon')
      .should('be.visible')

    cy.contains('Email')
      .should('be.visible')

    cy.contains('Jenjang Pendidikan')
      .should('be.visible')

    cy.contains('Akreditasi')
      .should('be.visible')

    cy.contains('Alamat')
      .should('be.visible')
  })


  // =====================================================
  // MS-INFO-003
  // Membuka halaman Edit Informasi
  // =====================================================

  it('MS-INFO-003 - Memastikan halaman Edit Informasi dapat dibuka', () => {

    cy.visit('https://learning.mischool.id/school/information')

    cy.contains('Edit Informasi')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/school/information/edit')

    cy.contains('Edit Profil Sekolah')
      .should('be.visible')
  })


  // =====================================================
  // MS-INFO-004
  // Mengubah informasi sekolah
  // =====================================================

  it('MS-INFO-004 - Memastikan informasi sekolah dapat diedit', () => {

    cy.visit('https://learning.mischool.id/school/information/edit')

    cy.contains('Edit Profil Sekolah')
      .should('be.visible')

    cy.get('input:visible')
      .first()
      .should('be.visible')
      .clear()
      .type('School Test')

    cy.contains('Simpan')
      .should('be.visible')
  })


  // =====================================================
  // MS-INFO-005
  // Validasi field wajib
  // =====================================================

  it('MS-INFO-005 - Memastikan field wajib tidak dapat dikosongkan', () => {

    cy.visit('https://learning.mischool.id/school/information/edit')

    cy.contains('Edit Profil Sekolah')
      .should('be.visible')

    cy.get('input:visible')
      .first()
      .clear()

    cy.contains('Simpan')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/school/information/edit')
  })


  // =====================================================
  // MS-INFO-006
  // Membatalkan perubahan informasi
  // =====================================================

  it('MS-INFO-006 - Memastikan perubahan informasi dapat dibatalkan', () => {

    cy.visit('https://learning.mischool.id/school/information/edit')

    cy.contains('Edit Profil Sekolah')
      .should('be.visible')

    cy.get('input:visible')
      .first()
      .clear()
      .type('Data Sementara')

    cy.contains('Kembali')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/school/information')
  })


  // =====================================================
  // MS-RFID-001
  // Menampilkan daftar RFID
  // =====================================================

  it('MS-RFID-001 - Memastikan daftar RFID sekolah dapat ditampilkan', () => {

    cy.visit('https://learning.mischool.id/school/information')

    cy.contains('Daftar RFID Sekolah')
      .scrollIntoView()
      .should('be.visible')
  })


  // =====================================================
  // MS-RFID-002
  // Membuka form Tambah Master Key
  // =====================================================

  it('MS-RFID-002 - Memastikan form Tambah Master Key dapat dibuka', () => {

    cy.visit('https://learning.mischool.id/school/information')

    cy.contains('Daftar RFID Sekolah')
      .scrollIntoView()

    cy.contains('Master Key')
      .should('be.visible')
      .click()

    cy.contains('Tambah Master Key')
      .should('be.visible')
  })


  it('MS-RFID-003 - Memastikan RFID baru dapat ditambahkan', () => {

  cy.visit('https://learning.mischool.id/school/information')

  // Scroll ke bagian RFID
  cy.contains('Daftar RFID Sekolah')
    .scrollIntoView()
    .should('be.visible')

  // Buka form Master Key
  cy.contains('Master Key')
    .should('be.visible')
    .click()

  // Pastikan popup terbuka
  cy.contains('Tambah Master Key')
    .should('be.visible')

  // Cari input RFID di popup
  cy.contains('Tambah Master Key')
    .parent()
    .parent()
    .find('input')
    .should('be.visible')
    .type('00123')

  // Klik tombol Tambah
  cy.contains('Tambah')
    .should('be.visible')
    .click()

  // Tunggu proses
  cy.wait(1000)

})


  // =====================================================
  // MS-RFID-004
  // Validasi RFID kosong
  // =====================================================

  it('MS-RFID-004 - Memastikan RFID tidak dapat ditambahkan tanpa data', () => {

    cy.visit('https://learning.mischool.id/school/information')

    cy.contains('Daftar RFID Sekolah')
      .scrollIntoView()

    cy.contains('Master Key')
      .click()

    cy.get('input:visible')
      .last()
      .should('be.empty')

    cy.contains('Tambah')
      .should('be.visible')
      .click()

    cy.contains('Tambah Master Key')
      .should('be.visible')
  })


 it('MS-RFID-005 - Memastikan popup Tambah Master Key dapat ditutup', () => {

  cy.visit('https://learning.mischool.id/school/information')

  // Masuk ke bagian RFID
  cy.contains('Daftar RFID Sekolah')
    .scrollIntoView()
    .should('be.visible')

  // Buka popup Master Key
  cy.contains('Master Key')
    .should('be.visible')
    .click()

  // Popup harus terbuka
  cy.get('#tambahRfid')
    .should('be.visible')

  // Cari tombol Tutup berdasarkan class yang sudah terlihat dari log
  cy.get('button.btn.btn-rounded.btn-light-danger.text-danger')
    .should('be.visible')
    .click()

  // Tunggu animasi/modal selesai
  cy.wait(1000)

  // Pastikan tombol Master Key bisa diklik kembali
  cy.contains('Master Key')
    .should('be.visible')
})

  // =====================================================
  // MS-RFID-006
  // Mencari RFID
  // =====================================================

  it('MS-RFID-006 - Memastikan pencarian RFID dapat digunakan', () => {

    cy.visit('https://learning.mischool.id/school/information')

    cy.contains('Daftar RFID Sekolah')
      .scrollIntoView()
      .should('be.visible')

    cy.get('input:visible')
      .first()
      .should('be.visible')
      .type('00999')
  })

})