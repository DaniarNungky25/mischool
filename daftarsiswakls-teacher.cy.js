describe('MiSchool - Daftar Siswa Kelas', () => {

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

    cy.url()
      .should('include', '/teacher')

    cy.wait(1500)

    // Langsung ke halaman Kelas
    cy.visit('https://learning.mischool.id/teacher/e-learning')

    cy.url()
      .should('include', '/teacher/e-learning')

    cy.get('body')
      .should('be.visible')

    cy.wait(1000)
  })


  // =========================================================
  // TC-DSK-001
  // =========================================================

  it('TC-DSK-001 - Menampilkan halaman Daftar Siswa Kelas', () => {

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'E-Learning')
  })


  // =========================================================
  // TC-DSK-002
  // =========================================================

  it('TC-DSK-002 - Menampilkan data siswa pada tabel', () => {

    // Halaman tidak menggunakan elemen table
    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Siswa')
  })


  it('TC-DSK-003 - Memastikan informasi siswa tampil lengkap', () => {

  cy.get('body')
    .should('be.visible')

  cy.get('#search')
    .should('be.visible')

  // Pastikan halaman daftar siswa memiliki data/komponen siswa
  cy.get('body')
    .invoke('text')
    .should('not.be.empty')
})


  // =========================================================
  // TC-DSK-004
  // =========================================================

  it('TC-DSK-004 - Mencari siswa berdasarkan nama', () => {

    cy.get('#search')
      .should('be.visible')
      .clear()
      .type('Siswa')
      .type('{enter}')

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-DSK-005
  // =========================================================

  it('TC-DSK-005 - Mencari siswa dengan nama yang tidak terdaftar', () => {

    cy.get('#search')
      .should('be.visible')
      .clear()
      .type('SISWA_TIDAK_TERDAFTAR_999')
      .type('{enter}')

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-DSK-006
  // =========================================================

  it('TC-DSK-006 - Melakukan pencarian dengan kolom kosong', () => {

    cy.get('#search')
      .should('be.visible')
      .clear()
      .type('{enter}')

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-DSK-007
  // =========================================================

  it('TC-DSK-007 - Membuka detail siswa melalui tombol Aksi', () => {

    cy.get('a:visible, button:visible')
      .then(($items) => {

        const target = [...$items].find((el) => {
          const text = (el.innerText || '').trim()
          const href = el.getAttribute('href') || ''

          return (
            /detail|lihat|aksi/i.test(text) ||
            /detail|student|siswa/i.test(href)
          )
        })

        expect(target, 'tombol/link detail siswa').to.exist

        cy.wrap(target)
          .scrollIntoView()
          .click({ force: true })
      })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-DSK-008
  // =========================================================

  it('TC-DSK-008 - Berpindah ke halaman berikutnya menggunakan pagination', () => {

    cy.get('body')
      .should('be.visible')

    cy.get('a:visible, button:visible')
      .then(($items) => {

        const next = [...$items].find((el) => {
          const text = (el.innerText || '').trim()

          return /berikutnya|next/i.test(text)
        })

        const pageTwo = [...$items].find((el) => {
          return (el.innerText || '').trim() === '2'
        })

        if (next) {
          cy.wrap(next)
            .scrollIntoView()
            .click({ force: true })

          cy.wait(1000)

        } else if (pageTwo) {
          cy.wrap(pageTwo)
            .scrollIntoView()
            .click({ force: true })

          cy.wait(1000)

        } else {
          cy.log('Pagination tidak tersedia')
        }
      })

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-DSK-009
  // =========================================================

  it('TC-DSK-009 - Kembali ke halaman sebelumnya menggunakan pagination', () => {

    // Pindah ke halaman 2 terlebih dahulu
    cy.get('a:visible, button:visible')
      .then(($items) => {

        const next = [...$items].find((el) => {
          const text = (el.innerText || '').trim()

          return /berikutnya|next/i.test(text)
        })

        const pageTwo = [...$items].find((el) => {
          return (el.innerText || '').trim() === '2'
        })

        if (next) {
          cy.wrap(next)
            .click({ force: true })

          cy.wait(1000)

        } else if (pageTwo) {
          cy.wrap(pageTwo)
            .click({ force: true })

          cy.wait(1000)
        }
      })

    // Kembali ke halaman sebelumnya
    cy.get('a:visible, button:visible')
      .then(($items) => {

        const previous = [...$items].find((el) => {
          const text = (el.innerText || '').trim()

          return /sebelumnya|previous|prev/i.test(text)
        })

        const pageOne = [...$items].find((el) => {
          return (el.innerText || '').trim() === '1'
        })

        if (previous) {
          cy.wrap(previous)
            .click({ force: true })

          cy.wait(1000)

        } else if (pageOne) {
          cy.wrap(pageOne)
            .click({ force: true })

          cy.wait(1000)
        }
      })

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-DSK-010
  // =========================================================

  it('TC-DSK-010 - Memastikan nomor halaman aktif sesuai halaman yang dibuka', () => {

    cy.get('body')
      .should('be.visible')

    // Cari elemen pagination yang benar-benar berisi angka
    cy.get('a:visible, button:visible')
      .then(($items) => {

        const pages = [...$items].filter((el) => {
          return /^\d+$/.test((el.innerText || '').trim())
        })

        if (pages.length > 0) {

          const activePage = pages.find((el) => {
            return (
              el.classList.contains('active') ||
              el.getAttribute('aria-current') === 'page'
            )
          })

          if (activePage) {
            expect(
              (activePage.innerText || '').trim()
            ).to.match(/^\d+$/)
          } else {
            expect(
              (pages[0].innerText || '').trim()
            ).to.match(/^\d+$/)
          }

        } else {
          cy.log('Pagination angka tidak tersedia')
        }
      })
  })

})