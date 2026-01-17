import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header({title=''}) {
    return (
        <View style={styles.container}>
            <View style={styles.leftIcon}>
                <MaterialDesignIcons name="menu" size={36} color={"#000"} />
            </View>

            <Text style={styles.text}>{title}</Text>

            <View style={styles.rightIcon}>
                <MaterialDesignIcons name="bell-outline" size={30} color={"#000"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        position: "relative",
    },
    leftIcon: {
        width: 40,
    },
    rightIcon: {
        width: 40,
        alignItems: "flex-end",
        paddingRight: 4,
    },
    text: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 24,
        color: "#333",
        fontWeight: "bold",
    },
});
