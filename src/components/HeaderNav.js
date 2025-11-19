import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HeaderNav = ({ theme, onPressMenu }) => (
  <View style={styles.row}>
    <Text style={[styles.logo, { color: theme.primary }]}>Nest</Text>
    <TouchableOpacity
      onPress={onPressMenu}
      style={[
        styles.menuButton,
        { backgroundColor: theme.card, shadowColor: theme.text },
      ]}
    >
      <Text style={styles.menuIcon}>☰</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  menuIcon: {
    fontSize: 22,
    color: "#111",
  },
});
