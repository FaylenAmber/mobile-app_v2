import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import SearchComponent from "../../components/SearchBar";
import Button from "../../styles/Button";
import { getBuruh } from "../../services/buruh.service";
import { getMandor } from "../../services/mandor.service";
import { submitAbsensi } from "../../services/absensi.service";
import { Buruh } from "../../models/buruh.model";
import { Mandor } from "../../models/mandor.model";
import { getAbsensiToday } from "../../services/absensi.service";

type StatusAbsen = "hadir" | "izin" | "alpha";

export default function AbsensiScreen() {
  const [buruh, setBuruh] = useState<Buruh[]>([]);
  const [mandor, setMandor] = useState<Mandor[]>([]);
  const [absensi, setAbsensi] = useState<Record<number, StatusAbsen>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const buruhData = await getBuruh();
    const mandorData = await getMandor();
    const absensiToday = await getAbsensiToday();

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

  const setStatus = (buruhId: number, status: StatusAbsen) => {
    setAbsensi((prev) => ({
      ...prev,
      [buruhId]: status,
    }));
  };

  const handleUpdate = async () => {
    const absensiArray = Object.entries(absensi).map(([buruh_id, status]) => ({
      buruh_id: parseInt(buruh_id, 10),
      status,
    }));

    await submitAbsensi(absensiArray);
    await loadData();
  };

  const handleSubmit = async () => {
    const absensiArray = Object.entries(absensi).map(([buruh_id, status]) => ({
      buruh_id: parseInt(buruh_id, 10),
      status,
    }));

    await submitAbsensi(absensiArray);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Absensi</Text>
      <Text style={styles.subtitle}>
        {new Date().toLocaleDateString("id-ID", { 
          weekday: "long", 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        })}
      </Text>

      <SearchComponent />

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Kehadiran</Text>
        <Text style={styles.headerList}>Hadir</Text>
        <Text style={styles.headerList}>Alpha</Text>
        <Text style={styles.headerList}>Izin</Text>
      </View>

      {buruh.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.list}>
            <Text style={styles.name}>{item.nama}</Text>
            <Text style={styles.sub}>
              {getNamaMandor(item.mandor_id)}
            </Text>
          </View>

          <Pressable
            style={[ styles.checkbox, absensi[item.id] === "hadir" && styles.checked ]}
            onPress={() => setStatus(item.id, "hadir")}
          />

          <Pressable
            style={[ styles.checkbox, absensi[item.id] === "alpha" && styles.checked ]}
            onPress={() => setStatus(item.id, "alpha")}
          />

          <Pressable
            style={[ styles.checkbox, absensi[item.id] === "izin" && styles.checked ]}
            onPress={() => setStatus(item.id, "izin")}
          />
        </View>
      ))}

      <View style={styles.buttonRow}>
        <Button 
          title="Update" 
          onPress={handleUpdate} 
        />
        <Button 
          title="Submit" 
          onPress={handleSubmit} 
        />
      </View>
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
  list: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  sub: {
    fontSize: 12,
    color: "#777",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 4,
    marginHorizontal: 14,
  },
  checked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  summary: {
    marginTop: 10,
    marginBottom: 25,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 25,
    marginBottom: 40,
    gap: 10,
  },
});