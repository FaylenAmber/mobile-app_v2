import api from './api';
import { AbsensiHarian, AbsensiItem, AbsensiStats } from '../models/absensi.model';

export const getAbsensiToday = async (): Promise<AbsensiHarian[]> => {
  const res = await api.get<AbsensiHarian[]>('/absensi/today');
  return res.data;
};

export const getAbsensiTodayStats = async (): Promise<AbsensiStats> => {
  const res = await api.get<AbsensiStats>('/absensi/today/stats');
  return res.data;
};

export const submitAbsensi = async (
  absensi: AbsensiItem[]
): Promise<{ message: string; affectedRows: number }> => {
  const res = await api.post<{ message: string; affectedRows: number }>(
    '/absensi',
    { absensi }
  );
  return res.data;
};

export const getAbsensiByDate = async (
  tanggal: string
): Promise<AbsensiHarian[]> => {
  const res = await api.get<AbsensiHarian[]>(`/absensi/date/${tanggal}`);
  return res.data;
};

export const deleteAbsensiToday = async (): Promise<{
  message: string;
  deletedRows: number;
}> => {
  const res = await api.delete<{ message: string; deletedRows: number }>(
    '/absensi/today'
  );
  return res.data;
};