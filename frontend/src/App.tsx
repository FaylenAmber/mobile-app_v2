import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeBottom from './screens/bottom/HomeBottom';
import AbsensiScreen from './screens/bottom/Absensi';
import Profil from './screens/bottom/Profil';
import History from './screens/bottom/History';
import TabIcon from './styles/TabIcon';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeBottom} options={{
              tabBarIcon: TabIcon.Home,
            }}/>
            <Tab.Screen name="Absensi" component={AbsensiScreen} options={{
              tabBarIcon: TabIcon.Absensi,
            }}/>
            <Tab.Screen name="History" component={History} options={{
              tabBarIcon: TabIcon.History,
            }}/>
            <Tab.Screen name="Profil" component={Profil} options={{
              tabBarIcon: TabIcon.Profil,
            }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;