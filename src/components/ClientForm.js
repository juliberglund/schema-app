import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const ClientForm = ({
  clientInitials,
  clientFullName,
  onChangeInitials,
  onChangeFullName,
  onSubmit,
  feedback,
  theme,
}) => (
  <View style={styles.wrapper}>
    <Text style={[styles.title, { color: theme.text }]}>Lägg till ny Brukare</Text>
    <View
      style={[
        styles.formCard,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <TextInput
        value={clientInitials}
        onChangeText={onChangeInitials}
        placeholder="Initialer (ex. N:N)"
        placeholderTextColor={theme.muted}
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
      />
      <TextInput
        value={clientFullName}
        onChangeText={onChangeFullName}
        placeholder="Fullständigt Namn (Valfritt)"
        placeholderTextColor={theme.muted}
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
      />
      {feedback.length > 0 && (
        <Text style={{ color: theme.muted }}>{feedback}</Text>
      )}
      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: theme.primary }]}
        onPress={onSubmit}
      >
        <Text style={styles.primaryButtonText}>Spara Brukare</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: 32 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  formCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
