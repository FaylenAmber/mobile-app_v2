import api from './api';
import { Mandor } from '../models/mandor.model';

export const getMandor = async (): Promise<Mandor[]> => {
  const res = await api.get<Mandor[]>('/mandor');
  return res.data;
};

export const getMandorById = async (
  id: number
): Promise<Mandor> => {
  const res = await api.get<Mandor>(`/mandor/${id}`);
  return res.data;
};

export const createMandor = async (
  nama: string,
  pekerjaan: string
): Promise<{ id: number }> => {
  const res = await api.post<{ id: number }>('/mandor', {
    nama,
    pekerjaan,
  });
  return res.data;
};

export const updateMandor = async (
  id: number,
  nama: string,
  pekerjaan: string
): Promise<{ message: string }> => {
  const res = await api.put<{ message: string }>(`/mandor/${id}`, {
    nama,
    pekerjaan,
  });
  return res.data;
};

export const deleteMandor = async (
  id: number
): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/mandor/${id}`);
  return res.data;
};
