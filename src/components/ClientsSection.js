import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ClientsSection = ({ clients, theme, onSelectClient }) => (
  <View style={styles.section}>
    <Text style={[styles.title, { color: theme.text }]}>Välj Brukare</Text>
    <View style={styles.wrapper}>
      {clients.length === 0 && (
        <Text style={{ color: theme.muted }}>
          Inga brukare ännu. Lägg till en under fliken "Lägg till".
        </Text>
      )}
      {clients.map((client) => (
        <TouchableOpacity
          key={client.id}
          onPress={() => onSelectClient(client.id)}
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.initials, { color: theme.primary }]}>
            👥 {client.initials}
          </Text>
          <Text style={{ color: theme.muted }}>{client.fullName}</Text>
          <Text style={[styles.link, { color: theme.primary }]}>
            Visa schema →
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  wrapper: { gap: 12 },
  card: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 10,
  },
  initials: { fontWeight: "700", fontSize: 18, marginBottom: 4 },
  link: { marginTop: 8, fontWeight: "600" },
});
