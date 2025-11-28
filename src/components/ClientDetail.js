import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatHumanDate } from "../utils/dateUtils";

const WEEK_NAMES = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];

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
    <ScrollView style={{ maxHeight: 520 }} showsVerticalScrollIndicator={false}>
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
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  {activity.title}
                </Text>
                <Text style={{ color: theme.muted }}>
                  Tid: {activity.time}
                </Text>
              </View>
              <View
                style={[
                  styles.statusPill,
                  {
                    backgroundColor:
                      activity.status === "done"
                        ? theme.accent
                        : activity.status === "denied"
                        ? theme.danger
                        : theme.border,
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {activity.status === "done"
                    ? "Klar"
                    : activity.status === "denied"
                    ? "Nekad"
                    : "Öppen"}
                </Text>
              </View>
            </View>

            <Text style={{ color: theme.muted }}>
              {activity.isRecurring
                ? `Återkommande: ${Array.isArray(activity.recurringDay)
                    ? activity.recurringDay
                        .map((day) => WEEK_NAMES[day] || "")
                        .join(", ")
                    : WEEK_NAMES[activity.recurringDay ?? 0]
                  }`
                : `Datum: ${
                    activity.date
                      ? formatHumanDate(new Date(activity.date))
                      : "Ej satt"
                  }`}
            </Text>
            <Text style={{ color: theme.muted }}>
              Påminnelse: {activity.reminder ?? 0} min innan
            </Text>
            {activity.instructions ? (
              <Text style={{ color: theme.text, marginTop: 8 }}>
                {activity.instructions}
              </Text>
            ) : null}
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "700", fontSize: 16 },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: { color: "#fff", fontWeight: "700" },
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
