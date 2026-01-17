import React from "react";
import { View, Text, StyleSheet } from "react-native";

type AttendanceCardProps = {
  title: string;
  value: number | string;
  date: string;
};

export default function AttendanceCard({ title, value, date }: AttendanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: "#777",
  },
});