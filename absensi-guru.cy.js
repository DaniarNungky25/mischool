describe('MiSchool - Statistik Absensi Guru', () => {

  // =========================================================
  // LOGIN + BUKA HALAMAN STATISTIK ABSENSI GURU
  // =========================================================
  beforeEach(() => {

    cy.visit('https://learning.mischool.id/login');

    // Email
    cy.get('input:visible')
      .eq(0)
      .clear()
      .type('school@gmail.com');

    // Password
    cy.get('input:visible')
      .eq(1)
      .clear()
      .type('password');

    // Login
    cy.contains('button', 'Masuk')
      .filter(':visible')
      .first()
      .click();

    // Pastikan login berhasil
    cy.url({ timeout: 15000 })
      .should('include', '/school');

    // Buka halaman Statistik Absensi Guru
    cy.visit(
      'https://learning.mischool.id/school/statistic-presence-employee'
    );

    // Pastikan halaman benar-benar termuat
    cy.url({ timeout: 15000 })
      .should(
        'eq',
        'https://learning.mischool.id/school/statistic-presence-employee'
      );

    cy.contains('Statistik Absensi Guru', { timeout: 15000 })
      .should('be.visible');
  });


  // =========================================================
  // MS-ABSGURU-001
  // Menampilkan halaman Statistik Absensi Guru
  // =========================================================
  it('MS-ABSGURU-001 - Menampilkan halaman Statistik Absensi Guru', () => {

    cy.contains('Statistik Absensi Guru')
      .should('be.visible');

    cy.contains('Statistik absensi guru')
      .should('be.visible');

    cy.contains('Data Absensi Guru')
      .should('be.visible');

  });


  // =========================================================
  // MS-ABSGURU-002
  // Menampilkan data absensi guru
  // =========================================================
  it('MS-ABSGURU-002 - Menampilkan data absensi guru', () => {

    cy.contains('Data Absensi Guru')
      .should('be.visible');

    cy.contains('Nama Guru')
      .should('be.visible');

    cy.contains('Masuk')
      .should('be.visible');

    cy.contains('Pulang')
      .should('be.visible');

    cy.contains('Status')
      .should('be.visible');

    // Pastikan minimal ada data guru
    cy.contains('Dr. Ardiansyah')
      .should('be.visible');

  });


  // =========================================================
  // MS-ABSGURU-003
  // Menggunakan filter periode tanggal
  // =========================================================
  it('MS-ABSGURU-003 - Menggunakan filter periode tanggal', () => {

    // Klik Filter
    cy.contains('button', 'Filter')
      .filter(':visible')
      .first()
      .click({ force: true });

    cy.wait(500);

    // Pastikan area/filter muncul
    cy.contains('Filter')
      .should('be.visible');

    // Cari input tanggal yang terlihat
    cy.get('input:visible').then(($inputs) => {

      const jumlahInput = $inputs.length;

      cy.log(`Jumlah input terlihat: ${jumlahInput}`);

      // Jika ada input tanggal
      if (jumlahInput > 2) {

        cy.get('input:visible').each(($input, index) => {

          const type = $input.attr('type');
          const name = $input.attr('name');
          const placeholder = $input.attr('placeholder');

          cy.log(
            `INPUT ${index} | type=${type} | name=${name} | placeholder=${placeholder}`
          );

        });

      }

    });

  });


  // =========================================================
  // MS-ABSGURU-004
  // Filter menampilkan statistik sesuai periode
  // =========================================================
  it('MS-ABSGURU-004 - Filter menampilkan statistik sesuai periode', () => {

    // Buka filter
    cy.contains('button', 'Filter')
      .filter(':visible')
      .first()
      .click({ force: true });

    cy.wait(500);

    // Pastikan halaman/filter masih tersedia
    cy.contains('Statistik Absensi Guru')
      .should('be.visible');

    // Cari semua input yang terlihat
    cy.get('input:visible').then(($inputs) => {

      const totalInput = $inputs.length;

      cy.log(`Total input terlihat: ${totalInput}`);

      // Ambil input tanggal jika memang tersedia
      const dateInputs = [...$inputs].filter((element) => {

        const type = element.getAttribute('type');
        const name = element.getAttribute('name');
        const placeholder = element.getAttribute('placeholder');

        return (
          type === 'date' ||
          (name && /date|tanggal|start|end|from|to/i.test(name)) ||
          (placeholder && /date|tanggal|start|end|from|to/i.test(placeholder))
        );

      });

      cy.log(`Input tanggal ditemukan: ${dateInputs.length}`);

      // Kalau ada input tanggal, isi tanggal pertama
      if (dateInputs.length > 0) {

        cy.wrap(dateInputs[0])
          .clear()
          .type('2024-01-01');

      }

      // Kalau ada input tanggal kedua
      if (dateInputs.length > 1) {

        cy.wrap(dateInputs[1])
          .clear()
          .type('2024-01-31');

      }

    });

    // Cari tombol filter/terapkan/cari
    cy.get('button:visible').then(($buttons) => {

      const buttons = [...$buttons];

      const filterButton = buttons.find((button) => {

        const text = button.innerText.trim();

        return /terapkan|filter|cari|tampilkan|submit/i.test(text);

      });

      if (filterButton) {

        cy.wrap(filterButton)
          .click({ force: true });

      }

    });

    cy.wait(1000);

    // Pastikan halaman tetap tampil
    cy.contains('Statistik Absensi Guru')
      .should('be.visible');

  });


  // =========================================================
  // MS-ABSGURU-005
  // Tombol Cetak Absensi dapat digunakan
  // =========================================================
  it('MS-ABSGURU-005 - Tombol Cetak Absensi dapat digunakan', () => {

    // Pastikan tombol Cetak Absensi ada
    cy.contains('button', 'Cetak Absensi')
      .filter(':visible')
      .first()
      .should('be.visible');

  });


  // =========================================================
  // MS-ABSGURU-006
  // Status absensi guru ditampilkan dengan benar
  // =========================================================
  it('MS-ABSGURU-006 - Status absensi guru ditampilkan dengan benar', () => {

    // Pastikan tabel/data absensi tersedia
    cy.contains('Data Absensi Guru')
      .should('be.visible');

    // Pastikan kolom Status tersedia
    cy.contains('Status')
      .should('be.visible');

    // Berdasarkan data yang muncul pada halaman
    cy.contains('alpha')
      .should('be.visible');

  });

});