import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatShortDate } from "../utils/dateUtils";

export const DateNavigator = ({ selectedDate, onPrevDay, onNextDay, theme }) => (
  <View
    style={[
      styles.container,
      { backgroundColor: theme.card, borderColor: theme.border },
    ]}
  >
    <TouchableOpacity
      style={[styles.dayButton, { backgroundColor: theme.background }]}
      onPress={onPrevDay}
    >
      <Text style={{ color: theme.text }}>{"< Föregående dag"}</Text>
    </TouchableOpacity>
    <View style={styles.dateCenter}>
      <Text style={[styles.dateLabel, { color: theme.primary }]}>
        {formatShortDate(selectedDate)}
      </Text>
      <Text style={[styles.weekday, { color: theme.accent }]}>
        {selectedDate.toLocaleDateString("sv-SE", { weekday: "long" })}
      </Text>
    </View>
    <TouchableOpacity
      style={[styles.dayButton, { backgroundColor: theme.background }]}
      onPress={onNextDay}
    >
      <Text style={{ color: theme.text }}>{"Nästa dag >"}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  dateCenter: {
    alignItems: "center",
    gap: 4,
  },
  dateLabel: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  weekday: {
    textTransform: "capitalize",
  },
});
