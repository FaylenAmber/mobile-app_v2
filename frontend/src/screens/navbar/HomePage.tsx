import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import StatCard from "../../components/StatCard";
import Avatar from "../../components/Avatar";
import { getAbsensiToday, getAbsensiTodayStats } from "../../services/absensi.service";
import { AbsensiHarian, AbsensiStats } from "../../models/absensi.model";

export default function HomePage() {
  const [absensiList, setAbsensiList] = useState<AbsensiHarian[]>([]);
  const [stats, setStats] = useState<AbsensiStats>({ total: 0, hadir: 0, izin: 0, alpha: 0 });

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const absensi = await getAbsensiToday();
    const statsData = await getAbsensiTodayStats();

    setAbsensiList(absensi);

    setStats({
      total: Number(statsData.total) || 0,
      hadir: Number(statsData.hadir) || 0,
      izin: Number(statsData.izin) || 0,
      alpha: Number(statsData.alpha) || 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>
        {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </Text>

      <View style={styles.row}>
        <StatCard title="Jumlah Buruh Hadir" value={stats.hadir} />
        <StatCard title="Jumlah Izin" value={stats.izin + stats.alpha} />
      </View>

      {absensiList.length > 0 && (
        <View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Absen Terakhir</Text>
          <Text style={styles.highlightName}>
            {absensiList[0].buruh_nama}
          </Text>
          <Text style={styles.highlightSub}>
            {absensiList[0].mandor_nama || "Buruh Lepas"}
          </Text>
          <View style={[
            styles.highlightBadge,
          ]}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              {absensiList[0].status.toUpperCase()}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.rekapContainer}>
        <Text style={styles.rekapTitle}>Rekap Kehadiran Hari Ini</Text>

        <FlatList
          data={absensiList}
          keyExtractor={(item) => item.absensi_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Avatar />
              <View style={{marginLeft: 10, flex: 1}}>
                <Text style={styles.nama}>{item.buruh_nama}</Text>
                <Text style={{color: "#666", fontSize: 13}}>
                  {item.mandor_nama || "Buruh Lepas"}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={{color: "#fff", fontSize: 12}}>
                  {item.status}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rekapContainer: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    flex: 1,
  },
  rekapTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  nama: {
    fontWeight: "600",
    fontSize: 15,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 30,
  },
  highlightCard: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  highlightTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  highlightName: {
    fontSize: 16,
    fontWeight: "700",
  },
  highlightSub: {
    fontSize: 13,
    color: "#777",
    marginBottom: 6,
  },
  highlightBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
  },
});