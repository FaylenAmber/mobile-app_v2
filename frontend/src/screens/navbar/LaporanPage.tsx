import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getBuruh } from "../../services/buruh.service";
import { getMandor } from "../../services/mandor.service";
import { getAbsensiToday } from "../../services/absensi.service";
import { Buruh } from "../../models/buruh.model";
import { Mandor } from "../../models/mandor.model";

type StatusAbsen = "hadir" | "izin" | "alpha";

export default function LaporanScreen() {
  const [buruh, setBuruh] = useState<Buruh[]>([]);
  const [mandor, setMandor] = useState<Mandor[]>([]);
  const [absensi, setAbsensi] = useState<Record<number, StatusAbsen>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const buruhData = await getBuruh();
    const mandorData = await getMandor();
    const absensiToday = await getAbsensiToday(); // ambil absensi yang sudah submit

    setBuruh(buruhData);
    setMandor(mandorData);

    const mappedAbsensi: Record<number, StatusAbsen> = {};
    absensiToday.forEach((item: any) => {
      mappedAbsensi[item.buruh_id] = item.status;
    });
    setAbsensi(mappedAbsensi);
  };

  const getNamaMandor = (mandorId?: number | null) => {
    const m = mandor.find((x) => x.id === mandorId);
    return m ? m.nama : "Buruh Lepas";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Laporan Kehadiran</Text>
      <Text style={styles.subtitle}>
        {new Date().toLocaleDateString("id-ID", { 
          weekday: "long", 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        })}
      </Text>

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Nama Buruh</Text>
        <Text style={styles.headerList}>Mandor</Text>
        <Text style={styles.headerList}>Hadir</Text>
        <Text style={styles.headerList}>Alpha</Text>
        <Text style={styles.headerList}>Izin</Text>
      </View>

      {buruh.map((b) => (
        <View key={b.id} style={styles.row}>
          <Text style={[styles.name, { flex: 1 }]}>{b.nama}</Text>
          <Text style={[styles.name, { width: 100 }]}>{getNamaMandor(b.mandor_id)}</Text>
          <Text style={[styles.name, { width: 50, textAlign: "center" }]}>{absensi[b.id] === "hadir" ? "H" : "-"}</Text>
          <Text style={[styles.name, { width: 50, textAlign: "center" }]}>{absensi[b.id] === "alpha" ? "X" : "-"}</Text>
          <Text style={[styles.name, { width: 50, textAlign: "center" }]}>{absensi[b.id] === "izin" ? "I" : "-"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    fontWeight: "bold",
  },
  headerList: {
    width: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },
});
