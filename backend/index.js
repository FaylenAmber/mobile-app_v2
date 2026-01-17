const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Xnine999",
  database: "db_konstruksi"
});

db.connect(err => {
  if (err) {
    console.error('Database gagal connect:', err);
    return;
  }
  console.log('MySQL terhubung');
});

app.get('/', (req, res) => {
  res.json({ message: 'API Konstruksi berjalan' });
});

app.get('/api/mandor', (req, res) => {
  db.query('SELECT * FROM mandor', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get('/api/mandor/:id', (req, res) => {
  db.query(
    'SELECT * FROM mandor WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

app.post('/api/mandor', (req, res) => {
  const { nama, pekerjaan } = req.body;
  db.query(
    'INSERT INTO mandor (nama, pekerjaan) VALUES (?, ?)',
    [nama, pekerjaan],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId });
    }
  );
});

app.put('/api/mandor/:id', (req, res) => {
  const { nama, pekerjaan } = req.body;
  db.query(
    'UPDATE mandor SET nama = ?, pekerjaan = ? WHERE id = ?',
    [nama, pekerjaan, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Mandor berhasil diupdate' });
    }
  );
});

app.delete('/api/mandor/:id', (req, res) => {
  db.query(
    'DELETE FROM mandor WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Mandor berhasil dihapus' });
    }
  );
});

app.get('/api/buruh/mandor/:id', (req, res) => {
  db.query(
    'SELECT * FROM buruh WHERE mandor_id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.get('/api/buruh', (req, res) => {
  db.query('SELECT * FROM buruh', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get('/api/buruh/:id', (req, res) => {
  db.query(
    'SELECT * FROM buruh WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

app.post('/api/buruh', (req, res) => {
  const { nama, mandor_id } = req.body;
  db.query(
    'INSERT INTO buruh (nama, mandor_id) VALUES (?, ?)',
    [nama, mandor_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId });
    }
  );
});

app.put('/api/buruh/:id', (req, res) => {
  const { nama, mandor_id } = req.body;
  db.query(
    'UPDATE buruh SET nama = ?, mandor_id = ? WHERE id = ?',
    [nama, mandor_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Buruh berhasil diupdate' });
    }
  );
});

app.delete('/api/buruh/:id', (req, res) => {
  db.query(
    'DELETE FROM buruh WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Buruh berhasil dihapus' });
    }
  );
});

app.get('/api/absensi/today', (req, res) => {
  db.query(
    `SELECT a.id AS absensi_id, b.id AS buruh_id, b.nama AS buruh_nama, m.nama AS mandor_nama, a.status, a.tanggal
    FROM absensi_harian a
    JOIN buruh b ON a.buruh_id = b.id
    LEFT JOIN mandor m ON b.mandor_id = m.id
    WHERE a.tanggal = CURDATE()
    ORDER BY a.status, b.nama`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.get('/api/absensi/today/stats', (req, res) => {
  db.query(
    `SELECT COUNT(*) AS total,
      SUM(CASE WHEN status = 'hadir' THEN 1 ELSE 0 END) AS hadir,
      SUM(CASE WHEN status = 'izin' THEN 1 ELSE 0 END) AS izin,
      SUM(CASE WHEN status = 'alpha' THEN 1 ELSE 0 END) AS alpha
    FROM absensi_harian
    WHERE tanggal = CURDATE()`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0] || { total: 0, hadir: 0, izin: 0, alpha: 0 });
    }
  );
});

app.post('/api/absensi', (req, res) => {
  const { absensi } = req.body;
  
  if (!Array.isArray(absensi) || absensi.length === 0) {
    return res.status(400).json({ message: 'Data absensi tidak valid' });
  }
  const values = absensi.map(item => [
    item.buruh_id,
    new Date().toISOString().split('T')[0],
    item.status
  ]);

  db.query(
    `INSERT INTO absensi_harian (buruh_id, tanggal, status) 
     VALUES ? 
     ON DUPLICATE KEY UPDATE status = VALUES(status)`,
    [values],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ 
        message: 'Absensi berhasil disimpan',
        affectedRows: result.affectedRows 
      });
    }
  );
});

app.get('/api/absensi/date/:tanggal', (req, res) => {
  db.query(
    `SELECT a.id AS absensi_id, b.id AS buruh_id, b.nama AS buruh_nama, m.nama AS mandor_nama, a.status, a.tanggal
    FROM absensi_harian a
    JOIN buruh b ON a.buruh_id = b.id
    LEFT JOIN mandor m ON b.mandor_id = m.id
    WHERE a.tanggal = ?
    ORDER BY a.status, b.nama`,
    [req.params.tanggal],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.delete('/api/absensi/today', (req, res) => {
  db.query(
    'DELETE FROM absensi_harian WHERE tanggal = CURDATE()',
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ 
        message: 'Absensi hari ini berhasil dihapus',
        deletedRows: result.affectedRows 
      });
    }
  );
});

app.get('/api/progress', (req, res) => {
  db.query(`
    SELECT p.id, p.tanggal, p.deskripsi, p.persentase, m.nama AS mandor_nama,
      GROUP_CONCAT(b.nama SEPARATOR ', ') AS buruh_list
    FROM progress p
    JOIN mandor m ON p.mandor_id = m.id
    LEFT JOIN progress_buruh pb ON p.id = pb.progress_id
    LEFT JOIN buruh b ON pb.buruh_id = b.id
    GROUP BY p.id
    ORDER BY p.tanggal DESC
  `, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post('/api/progress', (req, res) => {
  const { mandor_id, tanggal, deskripsi, persentase, buruh_ids } = req.body;

  db.query(
    `INSERT INTO progress (mandor_id, tanggal, deskripsi, persentase)
     VALUES (?, ?, ?, ?)`,
    [mandor_id, tanggal, deskripsi, persentase],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const progressId = result.insertId;

      const values = buruh_ids.map(buruhId => [
        progressId,
        buruhId
      ]);

      db.query(
        `INSERT INTO progress_buruh (progress_id, buruh_id)
         VALUES ?`,
        [values],
        () => res.status(201).json({ message: 'Progress berhasil dibuat' })
      );
    }
  );
});

app.put('/api/progress/:id', (req, res) => {
  const { mandor_id, deskripsi, persentase, buruh_ids } = req.body;

  db.query(
    `UPDATE progress SET mandor_id=?, deskripsi=?, persentase=? WHERE id=?`,
    [mandor_id, deskripsi, persentase, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      db.query(
        `DELETE FROM progress_buruh WHERE progress_id=?`,
        [req.params.id],
        () => {
          const values = buruh_ids.map(b => [req.params.id, b]);
          db.query(
            `INSERT INTO progress_buruh (progress_id, buruh_id) VALUES ?`,
            [values],
            () => res.json({ message: 'Progress diperbarui' })
          );
        }
      );
    }
  );
});

app.delete('/api/progress/:id', (req, res) => {
  const progressId = req.params.id;

  db.query(
    'DELETE FROM progress_buruh WHERE progress_id = ?',
    [progressId],
    (err) => {
      if (err) return res.status(500).json(err);

      db.query(
        'DELETE FROM progress WHERE id = ?',
        [progressId],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          res.json({ message: 'Progress berhasil dihapus' });
        }
      );
    }
  );
});

app.listen(3000, () => {
  console.log(`Server berjalan di port 3000`);
});