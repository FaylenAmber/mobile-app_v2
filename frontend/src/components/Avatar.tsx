import React from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";

export default function Avatar({ size = 42, color = "#6C63FF", background = "#EAE6FF" }) {
  return (
    <View
      style={{
        width: size + 10,
        height: size + 10,
        borderRadius: (size + 10) / 2,
        backgroundColor: background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons name="account-circle" size={size} color={color} />
    </View>
  );
}
