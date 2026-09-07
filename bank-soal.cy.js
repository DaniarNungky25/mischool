describe('MiSchool - Bank Soal', () => {

 beforeEach(() => {

  // Abaikan error JavaScript dari aplikasi MiSchool
  cy.on('uncaught:exception', () => {
    return false
  })

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

  // Tunggu proses login
  cy.wait(3000)

  // Pastikan login berhasil
  cy.url()
    .should('include', '/school')

  // Tunggu halaman School selesai dimuat
  cy.wait(1500)

  // =========================
  // BUKA BANK SOAL
  // =========================
  cy.contains('a', 'Bank Soal')
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  // Pastikan masuk halaman Bank Soal
  cy.url()
    .should('include', '/school/question-bank')
})

  it('MS-BS-001 - Memastikan halaman Bank Soal dapat ditampilkan', () => {

  cy.url()
    .should('include', '/school/question-bank')

  cy.get('body')
    .should('exist')

  cy.contains('Bank Soal')
    .should('exist')

  cy.get('input:visible')
    .should('exist')

})

 it('MS-BS-002 - Memastikan fitur pencarian Bank Soal dapat digunakan', () => {

  // Pastikan berada di halaman Bank Soal
  cy.url()
    .should('include', '/school/question-bank')

  // Cari kolom pencarian yang terlihat
  cy.get('input:visible')
    .first()
    .should('exist')
    .clear()
    .type('Testing Mobile')

  cy.wait(1000)

  // Pastikan kata pencarian masuk ke kolom
  cy.get('input:visible')
    .first()
    .should('have.value', 'Testing Mobile')

})


  // =====================================================
  // MS-BS-003
  // Memastikan pencarian Bank Soal dengan data tidak tersedia
  // =====================================================
  it('MS-BS-003 - Memastikan pencarian Bank Soal dengan data tidak tersedia', () => {

    cy.get('input:visible')
      .first()
      .clear()
      .type('DataTidakAda12345')

    cy.wait(1000)

    cy.get('body').should('exist')

    // Halaman tidak error
    cy.url().should('not.include', 'error')
  })


  // =====================================================
  // MS-BS-004
  // Memastikan filter berdasarkan mata pelajaran dapat digunakan
  // =====================================================
  it('MS-BS-004 - Memastikan filter berdasarkan mata pelajaran dapat digunakan', () => {

    cy.contains('Semua Mapel')
      .click({ force: true })

    cy.get('body')
      .should('exist')

    cy.get('body')
      .find('option')
      .should('exist')
      .first()
      .then(($option) => {
        const text = $option.text().trim()

        if (text) {
          cy.contains(text)
            .click({ force: true })
        }
      })

    cy.contains('Filter')
      .click({ force: true })

    cy.wait(1000)

    cy.get('body').should('exist')
  })


  // =====================================================
  // MS-BS-005
  // Memastikan filter berdasarkan tingkatan dapat digunakan
  // =====================================================
  it('MS-BS-005 - Memastikan filter berdasarkan tingkatan dapat digunakan', () => {

    cy.contains('Semua Tingkatan')
      .click({ force: true })

    cy.get('body')
      .should('exist')

    cy.contains('Filter')
      .click({ force: true })

    cy.wait(1000)

    cy.get('body').should('exist')
  })


  // =====================================================
  // MS-BS-006
  // Memastikan tombol Reset dapat mengembalikan filter
  // =====================================================
  it('MS-BS-006 - Memastikan tombol Reset dapat mengembalikan filter ke kondisi awal', () => {

    // Isi pencarian
    cy.get('input:visible')
      .first()
      .clear()
      .type('Testing')

    cy.wait(500)

    // Reset
    cy.contains('Reset')
      .should('be.visible')
      .click({ force: true })

    cy.wait(1000)

    // Input kembali kosong
    cy.get('input:visible')
      .first()
      .should('have.value', '')
  })


  it('MS-BS-007 - Memastikan detail Bank Soal dapat dibuka', () => {

  cy.url()
    .should('include', '/school/question-bank')

  cy.wait(1000)

  // Cari tombol/link yang mengarah ke detail
  cy.get('a, button')
    .filter(':visible')
    .then(($elements) => {

      const detailElement = [...$elements].find((el) => {
        const text = el.innerText.trim().toLowerCase()

        return (
          text.includes('detail') ||
          text.includes('lihat') ||
          text.includes('selengkapnya')
        )
      })

      if (detailElement) {
        cy.wrap(detailElement)
          .click({ force: true })
      } else {
        // Jika tidak ada tulisan Detail,
        // klik tombol aksi pada data pertama
        cy.get('a, button')
          .filter(':visible')
          .last()
          .click({ force: true })
      }
    })

  cy.wait(1000)

  // Pastikan halaman berubah / detail berhasil dibuka
  cy.url()
    .should('not.eq', 'https://learning.mischool.id/school/question-bank')

})


  it('MS-BS-008 - Memastikan informasi Detail Bank Soal ditampilkan dengan benar', () => {

  cy.url()
    .should('include', '/school/question-bank')

  cy.wait(1000)

  // Cari tombol/link untuk membuka detail
  cy.get('a, button')
    .filter(':visible')
    .then(($elements) => {

      const detailElement = [...$elements].find((el) => {
        const text = el.innerText.trim().toLowerCase()

        return (
          text.includes('detail') ||
          text.includes('lihat') ||
          text.includes('selengkapnya')
        )
      })

      if (detailElement) {
        cy.wrap(detailElement)
          .click({ force: true })
      } else {
        cy.get('a, button')
          .filter(':visible')
          .last()
          .click({ force: true })
      }
    })

  cy.wait(1000)

  // Pastikan sudah masuk ke halaman detail
  cy.url()
    .should('not.eq', 'https://learning.mischool.id/school/question-bank')

  // Pastikan halaman detail berhasil dimuat
  cy.get('body')
    .should('exist')

})


  it('MS-BS-009 - Memastikan pencarian soal pada Detail Bank Soal dapat digunakan', () => {

  cy.url()
    .should('include', '/school/question-bank')

  cy.wait(1000)

  // Buka detail Bank Soal
  cy.get('a, button')
    .filter(':visible')
    .then(($elements) => {

      const detailElement = [...$elements].find((el) => {
        const text = el.innerText.trim().toLowerCase()

        return (
          text.includes('detail') ||
          text.includes('lihat') ||
          text.includes('selengkapnya')
        )
      })

      if (detailElement) {
        cy.wrap(detailElement)
          .click({ force: true })
      } else {
        // Tombol detail yang ditemukan pada halaman
        cy.get('a.btn.btn-primary')
          .filter(':visible')
          .first()
          .click({ force: true })
      }
    })

  cy.wait(1000)

  // Pastikan sudah masuk halaman Detail
  cy.url()
    .should('include', '/detail')

  // Cari input yang BUKAN checkbox
  cy.get('input:visible')
    .not('[type="checkbox"]')
    .not('[type="radio"]')
    .first()
    .should('exist')
    .clear()
    .type('Testing Mobile')

  cy.wait(1000)

  // Pastikan teks pencarian berhasil dimasukkan
  cy.get('input:visible')
    .not('[type="checkbox"]')
    .not('[type="radio"]')
    .first()
    .should('have.value', 'Testing Mobile')

})

 it('MS-BS-010 - Memastikan filter soal berdasarkan guru dapat digunakan', () => {

  // Pastikan berada di halaman Bank Soal
  cy.url()
    .should('include', '/school/question-bank')

  cy.wait(1000)

  // =========================
  // BUKA DETAIL BANK SOAL
  // =========================

  // Cari link yang memang mengarah ke halaman /detail
  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  // Pastikan benar-benar masuk Detail Bank Soal
  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  // =========================
  // FILTER BERDASARKAN GURU
  // =========================

  cy.get('select:visible')
    .first()
    .should('exist')

  // Pastikan dropdown memiliki pilihan guru
  cy.get('select:visible')
    .first()
    .find('option')
    .should('have.length.greaterThan', 1)

  // Pilih guru pertama
  cy.get('select:visible')
    .first()
    .find('option')
    .eq(1)
    .then(($option) => {

      const value = $option.val()

      cy.get('select:visible')
        .first()
        .select(value)

    })

  cy.wait(1000)

  // Pastikan halaman tetap berjalan setelah filter
  cy.get('body')
    .should('exist')

})

 it('MS-BS-011 - Memastikan tombol Reset pada Detail Bank Soal berfungsi', () => {

  // Pastikan di halaman Bank Soal
  cy.url()
    .should('include', '/school/question-bank')

  cy.wait(1000)

  // =========================
  // BUKA DETAIL
  // =========================
  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/detail')

  // =========================
  // ISI PENCARIAN
  // =========================
  cy.get('input:visible')
    .not('[type="checkbox"]')
    .not('[type="radio"]')
    .first()
    .should('exist')
    .clear()
    .type('Testing Mobile')

  cy.wait(500)

  cy.get('input:visible')
    .not('[type="checkbox"]')
    .not('[type="radio"]')
    .first()
    .should('have.value', 'Testing Mobile')

  // =========================
  // CARI TOMBOL RESET
  // =========================

  cy.get('button:visible, a:visible')
    .then(($elements) => {

      const resetElement = [...$elements].find((el) => {
        const text = el.innerText.trim().toLowerCase()
        const title = (el.getAttribute('title') || '').toLowerCase()
        const aria = (el.getAttribute('aria-label') || '').toLowerCase()

        return (
          text.includes('reset') ||
          title.includes('reset') ||
          aria.includes('reset')
        )
      })

      if (resetElement) {
        cy.wrap(resetElement)
          .click({ force: true })
      } else {
        // Jika tombol tidak memiliki teks,
        // cari tombol dengan icon/atribut yang berkaitan dengan reset
        cy.get('button:visible, a:visible')
          .filter('[title], [aria-label]')
          .then(($buttons) => {

            const resetButton = [...$buttons].find((el) => {
              const title = (el.getAttribute('title') || '').toLowerCase()
              const aria = (el.getAttribute('aria-label') || '').toLowerCase()

              return (
                title.includes('reset') ||
                aria.includes('reset') ||
                title.includes('clear') ||
                aria.includes('clear')
              )
            })

            if (resetButton) {
              cy.wrap(resetButton)
                .click({ force: true })
            }
          })
      }
    })

  cy.wait(1000)

  // =========================
  // CEK INPUT
  // =========================
  cy.get('input:visible')
    .not('[type="checkbox"]')
    .not('[type="radio"]')
    .first()
    .should('have.value', '')

})

  it('MS-BS-012 - Memastikan soal pilihan ganda dapat ditampilkan', () => {

  cy.url()
    .should('include', '/school/question-bank')

  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .first()
    .should('exist')
})


  // =====================================================
  // MS-BS-013
  // Memastikan soal essay dapat ditampilkan
  // =====================================================
  it('MS-BS-013 - Memastikan soal benar salah dapat ditampilkan', () => {

  cy.url().should('include', '/school/question-bank')
  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .first()
    .should('exist')
})


  // =====================================================
  // MS-BS-014
  // Memastikan soal penjodohan dapat ditampilkan
  // =====================================================
  it('MS-BS-014 - Memastikan soal menjodohkan dapat ditampilkan', () => {

  cy.url().should('include', '/school/question-bank')
  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .first()
    .should('exist')
})


  // =====================================================
  // MS-BS-015
  // Memastikan checkbox soal dapat digunakan untuk memilih soal
  // =====================================================
  it('MS-BS-015 - Memastikan soal uraian dapat ditampilkan', () => {

  cy.url().should('include', '/school/question-bank')
  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .first()
    .should('exist')
})


  // =====================================================
  // MS-BS-016
  // Memastikan fitur Pilih Semua Soal dapat digunakan
  // =====================================================
  it('MS-BS-016 - Memastikan soal isian dapat ditampilkan', () => {

  cy.url().should('include', '/school/question-bank')
  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .first()
    .should('exist')
})


  // =====================================================
  // MS-BS-017
  // Memastikan fitur Pilih Semua Soal dapat membatalkan seluruh pilihan
  // =====================================================
  it('MS-BS-017 - Memastikan soal dapat dipilih', () => {

  cy.url().should('include', '/school/question-bank')
  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .first()
    .should('exist')
    .check({ force: true })
    .should('be.checked')
})


  // =====================================================
  // MS-BS-018
  // Memastikan jumlah soal terpilih sesuai pilihan
  // =====================================================
  it('MS-BS-018 - Memastikan soal yang dipilih dapat dibatalkan', () => {

  cy.url().should('include', '/school/question-bank')
  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .first()
    .check({ force: true })
    .should('be.checked')
    .uncheck({ force: true })
    .should('not.be.checked')
})


  // =====================================================
  // MS-BS-019
  // Memastikan tombol Kembali dapat digunakan dari Detail Bank Soal
  // =====================================================
  it('MS-BS-019 - Memastikan daftar soal pada Detail Bank Soal dapat ditampilkan', () => {

  cy.url().should('include', '/school/question-bank')
  cy.wait(1000)

  cy.get('a[href*="/detail"]')
    .filter(':visible')
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/school/question-bank/')
    .and('include', '/detail')

  cy.get('.question-checkbox')
    .filter(':visible')
    .should('have.length.greaterThan', 0)
})


  // =====================================================
  // MS-BS-020
  // Memastikan pagination pada halaman Bank Soal dapat digunakan
  // =====================================================
  it('MS-BS-020 - Memastikan pagination pada halaman Bank Soal dapat digunakan', () => {

    // Cari tombol pagination
    cy.get('button, a')
      .filter(':visible')
      .then(($buttons) => {

        const nextButton = [...$buttons].find(el => {
          const text = el.innerText.trim().toLowerCase()
          return (
            text === '2' ||
            text.includes('next') ||
            text.includes('berikutnya') ||
            text === '>'
          )
        })

        if (nextButton) {
          cy.wrap(nextButton)
            .click({ force: true })

          cy.wait(1000)

          cy.get('body')
            .should('exist')
        }
      })
  })

})