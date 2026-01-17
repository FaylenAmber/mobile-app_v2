import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/navbar/HomePage';
import LaporanPage from '../screens/navbar/LaporanPage';
import ProgressPage from '../screens/navbar/ProgressPage';

const route = createNativeStackNavigator();

export default function HomeRoute() {
    return (
        <route.Navigator screenOptions={{ headerShown: false }}>
        <route.Screen name="Home" component={HomePage} />
        <route.Screen name="Laporan" component={LaporanPage} />
        <route.Screen name="Progress" component={ProgressPage} />
        </route.Navigator>
    );
}
