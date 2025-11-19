import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ActivityModal = ({ activity, onClose, theme }) => (
  <Modal visible={!!activity} transparent animationType="fade">
    <View style={styles.backdrop}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          {activity?.clientInitials}: {activity?.title} ({activity?.time})
        </Text>
        <Text style={{ color: theme.muted, marginBottom: 20 }}>
          {activity?.instructions || "Inga instruktioner angivna."}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Stäng</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
