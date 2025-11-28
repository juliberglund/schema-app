import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ClientsSection = ({ clients, theme, onSelectClient }) => (
  <View style={styles.section}>
    <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>Brukare</Text>
      <Text style={{ color: theme.muted }}>
        Klicka på en brukare för att se schema och information.
      </Text>
    </View>
    <View style={styles.wrapper}>
      {clients.length === 0 && (
        <Text style={{ color: theme.muted }}>
          Inga brukare ännu. Lägg till en i admin-fliken.
        </Text>
      )}
      {clients.map((client) => (
        <TouchableOpacity
          key={client.id}
          onPress={() => onSelectClient(client.id)}
          style={[
            styles.card,
            { backgroundColor: theme.card, shadowColor: theme.text },
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: "#e0edff" }]}>
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              {client.initials}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, { color: theme.text }]}>
              {client.fullName}
            </Text>
            <Text style={{ color: theme.muted }}>Initialer: {client.initials}</Text>
          </View>
          <Text style={[styles.arrow, { color: theme.primary }]}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  infoCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  wrapper: { gap: 12 },
  card: {
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: { fontWeight: "700", fontSize: 16 },
  arrow: { fontSize: 24, fontWeight: "600" },
});
