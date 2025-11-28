import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatFullDate } from "../utils/dateUtils";

export const DateNavigator = ({ selectedDate, onPrevDay, onNextDay, theme }) => (
  <View style={[styles.wrapper, { backgroundColor: theme.card }]}>
    <TouchableOpacity style={styles.arrow} onPress={onPrevDay}>
      <Text style={[styles.arrowText, { color: theme.primary }]}>‹</Text>
    </TouchableOpacity>
    <View style={styles.center}>
      <Text style={[styles.dateText, { color: theme.text }]}>
        {formatFullDate(selectedDate)}
      </Text>
    </View>
    <TouchableOpacity style={styles.arrow} onPress={onNextDay}>
      <Text style={[styles.arrowText, { color: theme.primary }]}>›</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  arrow: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 28,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
