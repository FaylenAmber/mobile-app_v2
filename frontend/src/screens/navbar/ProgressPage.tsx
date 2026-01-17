import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Modal, TextInput, Pressable, Alert, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../styles/Button";
import { getProgress, createProgress, updateProgress, deleteProgress } from "../../services/progress.service";
import { getBuruh, createBuruh } from "../../services/buruh.service";
import { getMandor, createMandor } from "../../services/mandor.service";
import { Buruh } from "../../models/buruh.model";
import { ProgressItem } from "../../models/progress.model";
import { Mandor } from "../../models/mandor.model";

export default function ProgressScreen() {
  const [progressList, setProgressList] = useState<ProgressItem[]>([]);
  const [buruhList, setBuruhList] = useState<Buruh[]>([]);
  const [mandorList, setMandorList] = useState<Mandor[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<ProgressItem | null>(null);

  const [deskripsi, setDeskripsi] = useState("");
  const [persentase, setPersentase] = useState("0");
  const [buruhNames, setBuruhNames] = useState<string[]>([""]);
  const [mandorId, setMandorId] = useState<number | null>(null);
  const [addingMandor, setAddingMandor] = useState(false);
  const [mandorNama, setMandorNama] = useState("");
  const [mandorPekerjaan, setMandorPekerjaan] = useState("");


  const loadData = async () => {
    const progress = await getProgress();
    const buruh = await getBuruh();
    const mandor = await getMandor();

    setProgressList(progress);
    setBuruhList(buruh);
    setMandorList(mandor);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const openAdd = () => {
    setEditing(null);
    setDeskripsi("");
    setPersentase("0");
    setBuruhNames([""]);
    setMandorId(null);
    setModalVisible(true);
  };

  const openEdit = (item: ProgressItem) => {
    setEditing(item);
    setDeskripsi(item.deskripsi);
    setPersentase(String(item.persentase));
    setMandorId(item.mandor_id ?? null);
    setBuruhNames(
      item.buruh_list
        ? item.buruh_list.split(",").map((b) => b.trim())
        : [""]
    );
    setModalVisible(true);
  };

  const addBuruhInput = () => {
    setBuruhNames((prev) => [...prev, ""]);
  };

  const saveProgress = async () => {
    if (!deskripsi.trim()) {
      Alert.alert("Deskripsi wajib diisi");
      return;
    }

    if (!mandorId) {
      Alert.alert("Mandor wajib dipilih");
      return;
    }

    const filteredNames = buruhNames.map((n) => n.trim()).filter(Boolean);
    if (filteredNames.length === 0) {
      Alert.alert("Minimal isi 1 nama buruh");
      return;
    }

    try {
      const buruhIds: number[] = [];

      for (let name of filteredNames) {
        let existing = buruhList.find(
          (b) =>
            b.nama.toLowerCase() === name.toLowerCase() &&
            b.mandor_id === mandorId
        );

        if (existing) {
          buruhIds.push(existing.id);
        } else {
          const newBuruh = await createBuruh(name, mandorId);
          buruhIds.push(newBuruh.id);
        }
      }

      const payload = {
        mandor_id: mandorId,
        tanggal: new Date().toISOString().split("T")[0],
        deskripsi,
        persentase: Number(persentase),
        buruh_ids: buruhIds,
      };

      if (editing) {
        await updateProgress(editing.id, payload);
      } else {
        await createProgress(payload);
      }

      setModalVisible(false);
      loadData();
    } catch (err) {
      console.error(err);
      Alert.alert("Gagal menyimpan progress");
    }
  };

  const saveMandor = async () => {
    if (!mandorNama.trim()) {
        Alert.alert("Nama mandor wajib diisi");
        return;
    }

    try {
        const res = await createMandor(mandorNama, mandorPekerjaan);

        const updatedMandor = await getMandor();
        setMandorList(updatedMandor);

        setMandorId(res.id);

        setMandorNama("");
        setMandorPekerjaan("");
        setAddingMandor(false);
    } catch (err) {
        console.error(err);
        Alert.alert("Gagal menambah mandor");
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert("Hapus Progress", "Yakin ingin menghapus progress ini?", [
      { text: "Batal" },
      {
        text: "Hapus",
        onPress: async () => {
          await deleteProgress(id);
          loadData();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress Pekerjaan</Text>
        <Button title="Tambah" onPress={openAdd} />
      </View>

      <FlatList
        data={progressList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => openEdit(item)}>
            <View style={styles.cardHeader}>
              <Text style={styles.desc}>{item.deskripsi}</Text>
              <Pressable onPress={() => confirmDelete(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </Pressable>
            </View>

            <Text style={styles.meta}>Mandor: {item.mandor_nama}</Text>
            <Text style={styles.meta}>Buruh: {item.buruh_list || "-"}</Text>

            <View style={styles.progressRow}>
              <View
                style={[styles.bar, { width: `${item.persentase}%` }]}
              />
              <Text style={styles.percent}>{item.persentase}%</Text>
            </View>
          </Pressable>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modal}>
          <Text style={styles.modalTitle}>
            {editing ? "Edit Progress" : "Tambah Progress"}
          </Text>

          <Text style={styles.section}>Mandor</Text>

            {mandorList.map((m) => (
            <Pressable
                key={m.id}
                style={[
                styles.mandorItem,
                mandorId === m.id && styles.mandorActive,
                ]}
                onPress={() => setMandorId(m.id)}
            >
                <Text>{m.nama}</Text>
            </Pressable>
            ))}

            {!addingMandor ? (
            <Pressable onPress={() => setAddingMandor(true)}>
                <Text style={styles.add}>+ Tambah Mandor Baru</Text>
            </Pressable>
            ) : (
            <View style={styles.mandorForm}>
                <TextInput
                style={styles.input}
                placeholder="Nama mandor"
                value={mandorNama}
                onChangeText={setMandorNama}
                />
                <TextInput
                style={styles.input}
                placeholder="Pekerjaan (opsional)"
                value={mandorPekerjaan}
                onChangeText={setMandorPekerjaan}
                />

                <View style={styles.row}>
                <Button title="Batal" onPress={() => setAddingMandor(false)} />
                <Button title="Simpan Mandor" onPress={saveMandor} />
                </View>
            </View>
            )}

          <TextInput
            style={styles.input}
            placeholder="Deskripsi pekerjaan"
            value={deskripsi}
            onChangeText={setDeskripsi}
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Persentase"
            value={persentase}
            onChangeText={setPersentase}
          />

          <Text style={styles.section}>Buruh</Text>
          {buruhNames.map((name, index) => (
            <View key={index} style={styles.buruhRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder={`Nama buruh #${index + 1}`}
                value={name}
                onChangeText={(text) => {
                  setBuruhNames((prev) => {
                    const copy = [...prev];
                    copy[index] = text;
                    return copy;
                  });
                }}
              />
              <Pressable
                onPress={() =>
                  setBuruhNames((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                <Text style={styles.delete}>X</Text>
              </Pressable>
            </View>
          ))}

          <Pressable onPress={addBuruhInput}>
            <Text style={styles.add}>+ Tambah Buruh</Text>
          </Pressable>

          <View style={styles.row}>
            <Button title="Batal" onPress={() => setModalVisible(false)} />
            <Button title="Simpan" onPress={saveProgress} />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  desc: { fontWeight: "bold" },
  meta: { color: "#555", marginTop: 4 },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  bar: {
    height: 6,
    backgroundColor: "#4caf50",
    borderRadius: 4,
    flex: 1,
  },
  percent: { marginLeft: 8 },
  delete: { color: "red", fontWeight: "bold", padding: 4 },
  modal: { padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  section: { fontWeight: "bold", marginVertical: 8 },
  add: { color: "#2196f3", marginVertical: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  buruhRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  mandorItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 6,
  },
  mandorActive: {
    backgroundColor: "#e0f2f1",
    borderColor: "#009688",
  },
  mandorForm: {
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fafafa",
  },
});
