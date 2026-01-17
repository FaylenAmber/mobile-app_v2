import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from "../../components/Title";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

export default function History() {
  return (
    <ScrollView style={styles.container}>
        <Header title="History" />

        <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.sectionTitle}>Hari Ini</Text>
            <View style={styles.item}>
                <View style={styles.avatar}>
                    <MaterialDesignIcons name="account-circle" size={36} color={"#000"} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Rekap absen pada (08:00) berhasil diproses</Text>

                    <TouchableOpacity style={styles.detailButton}>
                        <Text style={styles.detailText}>Lihat detail</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.sectionTitle}>7 Hari Lalu</Text>
            <View style={styles.item}>
                <View style={styles.avatar}>
                    <MaterialDesignIcons name="account-circle" size={36} color={"#000"} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Rekap absen berhasil dikirim ke (Admin1)</Text>
                    <TouchableOpacity style={styles.detailButton}>
                        <Text style={styles.detailText}>Lihat detail</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.item}>
                <View style={styles.avatar}>
                    <MaterialDesignIcons name="account-circle" size={36} color={"#000"} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Rekap absen pada (07:45) berhasil diproses</Text>
                    <TouchableOpacity style={styles.detailButton}>
                        <Text style={styles.detailText}>Lihat detail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 20,
        color: '#333',
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 14,
        marginBottom: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#e3e7ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    detailButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        borderRadius: 6,
    },
    detailText: {
        fontSize: 13,
        color: '#0066cc',
        fontWeight: '600',
    },
});
