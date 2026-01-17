import api from './api';
import { Buruh } from '../models/buruh.model';

export const getBuruhByMandor = async (
  mandorId: number
): Promise<Buruh[]> => {
  const res = await api.get<Buruh[]>(`/buruh/mandor/${mandorId}`);
  return res.data;
};

export const getBuruhById = async (
  id: number
): Promise<Buruh> => {
  const res = await api.get<Buruh>(`/buruh/${id}`);
  return res.data;
};

export const getBuruh = async (): Promise<Buruh[]> => {
  const res = await api.get<Buruh[]>('/buruh');
  return res.data;
};

export const createBuruh = async (
  nama: string,
  mandor_id?: number | null
): Promise<{ id: number }> => {
  const res = await api.post<{ id: number }>(`/buruh`, {
    nama,
    mandor_id: mandor_id ?? null,
  });
  return res.data;
};

export const updateBuruh = async (
  id: number,
  nama: string,
  mandor_id?: number | null
): Promise<{ message: string }> => {
  const res = await api.put<{ message: string }>(`/buruh/${id}`, {
    nama,
    mandor_id: mandor_id ?? null,
  });
  return res.data;
};

export const deleteBuruh = async (
  id: number
): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/buruh/${id}`);
  return res.data;
};
