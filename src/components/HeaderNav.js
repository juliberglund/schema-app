import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HeaderNav = ({
  theme,
  navScreens,
  activeScreen,
  onChangeScreen,
  onPressMenu,
}) => (
  <View style={styles.container}>
    <Text style={[styles.brand, { color: theme.primary }]}>Nest</Text>
    <View style={styles.navRow}>
      {navScreens.map((screen) => {
        const isActive = activeScreen === screen.id;
        return (
          <TouchableOpacity
            key={screen.id}
            onPress={() => onChangeScreen(screen.id)}
            style={[
              styles.navButton,
              {
                backgroundColor: isActive ? theme.primary : theme.card,
                shadowColor: theme.text,
              },
            ]}
          >
            <Text
              style={[
                styles.navIcon,
                { color: isActive ? "#fff" : theme.muted },
              ]}
            >
              {screen.icon}
            </Text>
            <Text
              style={[
                styles.navLabel,
                { color: isActive ? "#fff" : theme.muted },
              ]}
            >
              {screen.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
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
  container: {
    alignItems: "center",
    marginBottom: 24,
  },
  brand: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 12,
  },
  navRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginBottom: 12,
  },
  navButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    minWidth: 90,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  navIcon: {
    fontSize: 18,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
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
