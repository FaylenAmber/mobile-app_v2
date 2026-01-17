export interface AbsensiItem {
  buruh_id: number;
  status: 'hadir' | 'izin' | 'alpha';
}

export interface AbsensiHarian {
  absensi_id: number;
  buruh_id: number;
  buruh_nama: string;
  mandor_nama: string | null;
  status: 'hadir' | 'izin' | 'alpha';
  tanggal: string;
}

export interface AbsensiStats {
  total: number;
  hadir: number;
  izin: number;
  alpha: number;
}