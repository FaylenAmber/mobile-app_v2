export interface Progress {
  id: number;
  mandor_id: number;
  tanggal: string;
  deskripsi: string;
  persentase: number;
}

export type ProgressItem = {
  id: number;
  deskripsi: string;
  persentase: number;
  mandor_nama: string;
  buruh_ids?: number[];
  buruh_list?: string;
  mandor_id?: number;
};