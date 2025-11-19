import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ViewToggle = ({ viewMode, onChange, theme }) => (
  <View style={styles.row}>
    <TouchableOpacity
      onPress={() => onChange("day")}
      style={[
        styles.button,
        {
          backgroundColor: viewMode === "day" ? theme.primary : theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <Text
        style={{
          color: viewMode === "day" ? "#fff" : theme.text,
          fontWeight: "600",
        }}
      >
        Dag
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onChange("week")}
      style={[
        styles.button,
        {
          backgroundColor: viewMode === "week" ? theme.primary : theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <Text
        style={{
          color: viewMode === "week" ? "#fff" : theme.text,
          fontWeight: "600",
        }}
      >
        Vecka
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
});
