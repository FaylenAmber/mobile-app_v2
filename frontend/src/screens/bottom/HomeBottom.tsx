import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/Title";
import Navbar from "../../components/Navbar";
import HomeRoute from "../../routes/HomeRoute";

export default function HomeBottom() {
  return (
    <View style={styles.container}>
      <Header title="Home" />
      <Navbar />
      <HomeRoute />
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
