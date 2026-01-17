import api from './api';

export const getProgress = async () => {
  const res = await api.get('/progress');
  return res.data;
};

export const createProgress = async (data: {
  mandor_id: number;
  tanggal: string;
  deskripsi: string;
  persentase: number;
  buruh_ids: number[];
}) => {
  const res = await api.post('/progress', data);
  return res.data;
};

export const updateProgress = async (id: number, data: {
  mandor_id: number;
  tanggal: string;
  deskripsi: string;
  persentase: number;
  buruh_ids: number[];
}) => {
  const res = await api.put(`/progress/${id}`, data);
  return res.data;
};

export const deleteProgress = async (id: number) => {
  const res = await api.delete(`/progress/${id}`);
  return res.data;
};