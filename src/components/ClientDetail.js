import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatHumanDate } from "../utils/dateUtils";

export const ClientDetail = ({
  client,
  activities,
  theme,
  onBack,
  onEdit,
  onDelete,
}) => (
  <View style={styles.section}>
    <TouchableOpacity onPress={onBack}>
      <Text style={[styles.backLink, { color: theme.primary }]}>
        ← Tillbaka till lista
      </Text>
    </TouchableOpacity>
    <Text style={[styles.title, { color: theme.text }]}>
      {client.fullName}
    </Text>
    <Text style={{ color: theme.muted, marginBottom: 16 }}>
      Initialer: {client.initials}
    </Text>
    <ScrollView style={{ maxHeight: 420 }} showsVerticalScrollIndicator={false}>
      {activities.length === 0 ? (
        <Text style={{ color: theme.muted }}>
          Inga aktiviteter planerade för denna brukare.
        </Text>
      ) : (
        activities.map((activity) => (
          <View
            key={activity.id}
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {activity.title}
            </Text>
            <Text style={{ color: theme.muted }}>
              {activity.isRecurring
                ? `Återkommande: ${
                    ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"][activity.recurringDay ?? 0]
                  }`
                : `Datum: ${
                    activity.date
                      ? formatHumanDate(new Date(activity.date))
                      : "Ej satt"
                  }`}
            </Text>
            <Text style={{ color: theme.muted }}>Tid: {activity.time}</Text>
            <Text style={{ color: theme.muted, marginBottom: 12 }}>
              Påminnelse: {activity.reminder ?? 0} min innan
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.editButton, { borderColor: theme.border }]}
                onPress={() => onEdit(activity)}
              >
                <Text style={{ color: theme.primary }}>Redigera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: theme.danger }]}
                onPress={() => onDelete(activity)}
              >
                <Text style={{ color: "#fff" }}>Ta bort</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  backLink: { marginBottom: 8, fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "700" },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 6 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
});
