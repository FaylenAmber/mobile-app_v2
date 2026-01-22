const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Xnine999",
  database: "db_konstruksi"
});

db.connect(err => {
    if (err) {
        console.error('Database gagal connect:', err);
        process.exit(1);
    }
    console.log('MySQL terhubung');
});

db.query(
    `CREATE TABLE IF NOT EXISTS mandor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        pekerjaan VARCHAR(150) NOT NULL
    )`,
    (err) => {
        if (err) console.error('Error membuat tabel mandor:', err);
        else console.log('Tabel mandor berhasil dibuat');
    }
);

db.query(
    `CREATE TABLE IF NOT EXISTS buruh (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        mandor_id INT,
        FOREIGN KEY (mandor_id) REFERENCES mandor(id)
        ON DELETE SET NULL
    )`,
    (err) => {
        if (err) console.error('Error membuat tabel buruh:', err);
        else console.log('Tabel buruh berhasil dibuat');
    }
);

db.query(
    `CREATE TABLE IF NOT EXISTS absensi_harian (
        id INT AUTO_INCREMENT PRIMARY KEY,
        buruh_id INT NOT NULL,
        tanggal DATE NOT NULL,
        status ENUM('hadir','izin','alpha') NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (buruh_id) REFERENCES buruh(id)
        ON DELETE CASCADE,
        UNIQUE KEY unique_buruh_tanggal (buruh_id, tanggal)
    )`,
    (err) => {
        if (err) console.error('Error membuat tabel absensi_harian:', err);
        else console.log('Tabel absensi_harian berhasil dibuat');
    }
);

db.query(
    `CREATE TABLE IF NOT EXISTS progress (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mandor_id INT NOT NULL,
        tanggal DATE NOT NULL,
        deskripsi VARCHAR(255) NOT NULL,
        persentase INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (mandor_id) REFERENCES mandor(id)
        ON DELETE CASCADE
    );`,
    (err) => {
        if (err) console.error('Error membuat tabel progress:', err);
        else console.log('Tabel progress berhasil dibuat');
    }
);

db.query(
    `CREATE TABLE IF NOT EXISTS progress_buruh (
        id INT AUTO_INCREMENT PRIMARY KEY,
        progress_id INT NOT NULL,
        buruh_id INT NOT NULL,

        FOREIGN KEY (progress_id) REFERENCES progress(id)
        ON DELETE CASCADE,

        FOREIGN KEY (buruh_id) REFERENCES buruh(id)
        ON DELETE CASCADE,

        UNIQUE KEY unique_progress_buruh (progress_id, buruh_id)
    );`,
    (err) => {
        if (err) console.error('Error membuat tabel progress_buruh:', err);
        else console.log('Tabel progress_buruh berhasil dibuat');
    }
);

setTimeout(() => {
    db.query(`SELECT COUNT(*) AS total FROM mandor`, (err, result) => {
        if (err) return;
        if (result[0].total === 0) {
            db.query(
            `INSERT INTO mandor (nama, pekerjaan) VALUES
            ('Wayan Kejer', 'Pemasangan Fondasi'),
            ('Made Wirata', 'Pengecoran Lantai')`,
            (err) => {
                if (err) console.error('Error insert mandor:', err);
                else console.log('Data mandor berhasil diinsert');
            });
        } else {
            console.log('Data mandor sudah ada');
        }
    });

    db.query(`SELECT COUNT(*) AS total FROM buruh`, (err, result) => {
        if (err) return;
        if (result[0].total === 0) {
            db.query(
            `INSERT INTO buruh (nama, mandor_id) VALUES
            ('Komang Putra', 1),
            ('Ketut Arya', 1),
            ('Putu Satria', 2)`,
            (err) => {
                if (err) console.error(err);
                else console.log('Data buruh berhasil diinsert');
            });
        } else {
            console.log('Data buruh sudah ada');
        }
    });

    db.query(`SELECT COUNT(*) AS total FROM progress`, (err, result) => {
        if (err) return;
        if (result[0].total === 0) {
            db.query(
            `INSERT INTO progress (mandor_id, tanggal, deskripsi, persentase) VALUES
            (1, '2025-01-14', 'Fondasi batu kali', 45),
            (2, '2025-01-15', 'Pengecoran lantai 1', 25)`,
            (err) => {
                if (err) console.error(err);
                else console.log('Data progress berhasil diinsert');
                
                setTimeout(() => {
                    db.end();
                    process.exit(0);
                }, 500);
            });
        } else {
            console.log('Data progress sudah ada');
            setTimeout(() => {
                db.end();
                process.exit(0);
            }, 500);
        }
    });
}, 2000);