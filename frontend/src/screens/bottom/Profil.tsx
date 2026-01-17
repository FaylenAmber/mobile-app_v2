import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "../../components/Title";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Header title="Profil" />
            <View style={{ padding: 20 }}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/img/rai_merta.png')}
                        style={styles.avatar} />
                    <Text style={styles.name}>Pengawas A</Text>
                    <Text style={styles.role}>Pengawas</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informasi Akun</Text>
                    
                    <Text style={styles.item}>ID Pengguna: 123456</Text>
                    <Text style={styles.item}>Email: pengawas@gmail.com</Text>
                    <Text style={styles.item}>Nomor HP: 08123456789</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pengaturan</Text>
                    
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Ubah Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Bantuan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Tentang Aplikasi</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#ddd",
    },
    name: {
        fontSize: 22,
        marginTop: 10,
        fontFamily: "FuzzyBubbles-Regular"
    },
    role: {
        fontSize: 14,
        color: "#888",
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    item: {
        fontSize: 14,
        paddingVertical: 4,
        color: "#444",
    },
    menuItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    menuText: {
        fontSize: 15,
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: "#FF4E4E",
        paddingVertical: 12,
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
});
