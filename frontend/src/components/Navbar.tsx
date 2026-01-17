import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Navbar() {
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => nav.navigate({ name: 'Home', params: { screen: 'Home' }, } as never)}>
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => nav.navigate({ name: 'Home', params: { screen: 'Progress' }, } as never)}>
                <Text style={styles.text}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => nav.navigate({ name: 'Home', params: { screen: 'Laporan' }, } as never)}>
                <Text style={styles.text}>Laporan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingVertical: 10,
        gap: 15,
        marginLeft: 16,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
});
