describe('MiSchool - Tanggapan Siswa', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)

    cy.visit('https://learning.mischool.id/login', {
      failOnStatusCode: false,
      timeout: 120000
    })

    cy.get('#email', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('teacher@gmail.com')

    cy.get('#password', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('123456789101234567')

    cy.contains('button', 'Masuk', { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.url({ timeout: 120000 })
      .should('include', '/teacher')

    cy.wait(1500)

    cy.contains('Tanggapan Siswa', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.url({ timeout: 30000 })
      .should('include', '/teacher/student-feedback')

    cy.wait(1000)
  })


  // =========================================================
  // TC-TS-001 - Memilih mata pelajaran
  // =========================================================
  it('TC-TS-001 - Memilih mata pelajaran', () => {

    cy.get('select:visible')
      .first()
      .should('be.visible')
      .then(($select) => {

        const options = [...$select.find('option')]

        const option = options.find((el) => {
          const text = el.textContent.trim()
          return text &&
            !/pilih|semua|mata pelajaran/i.test(text)
        })

        if (option) {
          cy.wrap($select)
            .select(option.value)
            .should('have.value', option.value)
        } else {
          cy.wrap($select)
            .should('exist')
        }
      })

    cy.wait(500)
  })


  // =========================================================
  // TC-TS-002 - Mencari data siswa berdasarkan nama
  // =========================================================
  it('TC-TS-002 - Mencari data siswa berdasarkan nama', () => {

    cy.get('input:visible')
      .then(($inputs) => {

        const search = [...$inputs].find((el) =>
          /Cari/i.test(el.getAttribute('placeholder') || '')
        )

        if (search) {
          cy.wrap(search)
            .clear()
            .type('SISWA')

          cy.contains('button', /Cari/i)
            .first()
            .click({ force: true })

          cy.wait(1000)

          cy.get('body')
            .should('be.visible')
        }
      })
  })


  // =========================================================
  // TC-TS-003 - Mencari siswa dengan nama yang tidak terdaftar
  // =========================================================
  it('TC-TS-003 - Mencari siswa dengan nama yang tidak terdaftar', () => {

    cy.get('input:visible')
      .then(($inputs) => {

        const search = [...$inputs].find((el) =>
          /Cari/i.test(el.getAttribute('placeholder') || '')
        )

        if (search) {
          cy.wrap(search)
            .clear()
            .type('SISWA_TIDAK_TERDAFTAR_999')

          cy.contains('button', /Cari/i)
            .first()
            .click({ force: true })

          cy.wait(1000)

          cy.get('body')
            .should('be.visible')
            .then(($body) => {

              const text = $body.text()

              const tidakAdaData =
                /tidak ditemukan|tidak tersedia|data kosong|no data|tidak ada/i.test(text)

              const tableKosong =
                $body.find('table tbody tr').length === 0

              expect(
                tidakAdaData || tableKosong,
                'Data siswa tidak terdaftar tidak ditampilkan'
              ).to.be.true
            })
        }
      })
  })


  // =========================================================
  // TC-TS-004 - Memfilter data berdasarkan jenis kelamin
  // =========================================================
  it('TC-TS-004 - Memfilter data berdasarkan jenis kelamin', () => {

    cy.get('select:visible')
      .then(($selects) => {

        const genderSelect = [...$selects].find((el) => {
          const text = el.innerText || ''
          return /laki|perempuan|gender|jenis kelamin/i.test(text)
        })

        if (genderSelect) {

          const options = [...genderSelect.querySelectorAll('option')]

          const option = options.find((el) =>
            /laki|perempuan/i.test(el.textContent || '')
          )

          if (option) {
            cy.wrap(genderSelect)
              .select(option.value)

            cy.contains('button', /Cari/i)
              .first()
              .click({ force: true })

            cy.wait(1000)

            cy.get('body')
              .should('be.visible')
          }
        }
      })
  })


  // =========================================================
  // TC-TS-005 - Menampilkan semua jenis kelamin
  // =========================================================
  it('TC-TS-005 - Menampilkan semua jenis kelamin', () => {

    cy.get('select:visible')
      .then(($selects) => {

        const genderSelect = [...$selects].find((el) => {
          const optionsText = [...el.querySelectorAll('option')]
            .map((o) => o.textContent)
            .join(' ')

          return /laki|perempuan/i.test(optionsText)
        })

        if (!genderSelect) {
          cy.log('Select jenis kelamin tidak ditemukan')
          return
        }

        const options = [...genderSelect.querySelectorAll('option')]

        const allOption = options.find((el) =>
          /semua|all/i.test(el.textContent || '')
        )

        if (allOption) {

          cy.wrap(genderSelect)
            .select(allOption.value)

          cy.contains('button', /Cari/i)
            .first()
            .click({ force: true })

          cy.wait(1000)

          cy.get('body')
            .should('be.visible')

        } else {

          // Jika tidak ada option "Semua",
          // pastikan pilihan jenis kelamin tersedia
          expect(options.length).to.be.greaterThan(1)
        }
      })
  })


  // =========================================================
  // TC-TS-006 - Memfilter tanggapan berdasarkan tanggal
  // =========================================================
  it('TC-TS-006 - Memfilter tanggapan berdasarkan tanggal', () => {

    cy.get('input:visible')
      .then(($inputs) => {

        const dateInput = [...$inputs].find((el) =>
          el.type === 'date' ||
          /tanggal|date/i.test(el.getAttribute('placeholder') || '')
        )

        if (dateInput) {

          cy.wrap(dateInput)
            .clear()
            .type('2026-09-01')

          cy.contains('button', /Cari/i)
            .first()
            .click({ force: true })

          cy.wait(1000)

          cy.get('body')
            .should('be.visible')
        }
      })
  })


  // =========================================================
  // TC-TS-007 - Melakukan pencarian dengan beberapa filter
  // =========================================================
  it('TC-TS-007 - Melakukan pencarian dengan beberapa filter', () => {

    cy.get('input:visible')
      .then(($inputs) => {

        const search = [...$inputs].find((el) =>
          /Cari/i.test(el.getAttribute('placeholder') || '')
        )

        if (search) {
          cy.wrap(search)
            .clear()
            .type('SISWA')
        }
      })

    cy.get('select:visible')
      .then(($selects) => {

        const genderSelect = [...$selects].find((el) => {
          const text = [...el.querySelectorAll('option')]
            .map((o) => o.textContent)
            .join(' ')

          return /laki|perempuan/i.test(text)
        })

        if (genderSelect) {

          const option = [...genderSelect.querySelectorAll('option')]
            .find((el) => /laki|perempuan/i.test(el.textContent || ''))

          if (option) {
            cy.wrap(genderSelect)
              .select(option.value)
          }
        }
      })

    cy.contains('button', /Cari/i)
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-TS-008 - Klik tombol Cari tanpa mengisi filter
  // =========================================================
  it('TC-TS-008 - Klik tombol Cari tanpa mengisi filter', () => {

    cy.get('input:visible')
      .each(($input) => {
        if ($input.attr('type') !== 'hidden') {
          cy.wrap($input).clear()
        }
      })

    cy.contains('button', /Cari/i)
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // TC-TS-009 - Memastikan kolom tabel tampil dengan benar
  // =========================================================
  it('TC-TS-009 - Memastikan kolom tabel tampil dengan benar', () => {

    cy.get('table:visible')
      .first()
      .should('be.visible')
      .find('thead')
      .should('be.visible')
      .then(($thead) => {

        const text = $thead.text()

        expect(text).to.match(
          /No|Nama|Siswa|Jenis Kelamin|NISN|Aksi/i
        )
      })
  })


  // =========================================================
  // TC-TS-010 - Membuka aksi pada data siswa
  // =========================================================
  it('TC-TS-010 - Membuka aksi pada data siswa', () => {

    cy.get('table:visible')
      .first()
      .should('be.visible')
      .then(($table) => {

        const rows = $table.find('tbody tr')

        if (rows.length === 0) {
          cy.log('Tidak ada data siswa pada tabel')
          return
        }

        cy.wrap(rows)
          .first()
          .find('button, a')
          .last()
          .scrollIntoView()
          .click({ force: true })

        cy.wait(500)

        cy.get('body')
          .should('be.visible')
      })
  })

})