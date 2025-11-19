import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ActivityCard = ({ activity, theme, status, onOpen, onUpdateStatus }) => {
  const statusColor =
    status === "done"
      ? theme.accent
      : status === "denied"
      ? theme.danger
      : theme.muted;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.text,
        },
      ]}
    >
      <View style={styles.timeBubble}>
        <Text style={[styles.time, { color: theme.text }]}>{activity.time}</Text>
      </View>
      <View style={styles.details}>
        <Text style={[styles.title, { color: theme.text }]}>
          {activity.clientInitials}: {activity.title}
        </Text>
        <Text style={[styles.sub, { color: statusColor }]}>
          Status:{" "}
          {status === "open" ? "Öppen" : status === "done" ? "Klar" : "Nekad"}
        </Text>
        {activity.reminder ? (
          <Text style={[styles.reminder, { color: theme.muted }]}>
            Påminnelse {activity.reminder} min innan
          </Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.detailButton, { borderColor: theme.border }]}
          onPress={onOpen}
        >
          <Text style={{ color: theme.text }}>Detaljer</Text>
        </TouchableOpacity>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: theme.accent }]}
            onPress={() => onUpdateStatus("done")}
          >
            <Text style={styles.statusText}>✔</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: theme.danger }]}
            onPress={() => onUpdateStatus("denied")}
          >
            <Text style={styles.statusText}>✖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const DayPlanSection = ({
  activities,
  theme,
  onOpenActivity,
  onUpdateStatus,
}) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: theme.text }]}>
      Dagens Planering
    </Text>
    {activities.length === 0 ? (
      <Text style={{ color: theme.muted }}>Inga aktiviteter planerade.</Text>
    ) : (
      activities.map((activity) => {
        const status = activity.status ?? "open";
        return (
          <ActivityCard
            key={`${activity.id}-${activity.occurrenceDate}`}
            activity={activity}
            status={status}
            theme={theme}
            onOpen={() => onOpenActivity(activity)}
            onUpdateStatus={(next) => onUpdateStatus(activity, next)}
          />
        );
      })
    )}
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOpacity: 0.09,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  timeBubble: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  time: { fontWeight: "700" },
  details: { flex: 1, marginLeft: 16 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  sub: { fontSize: 14, marginBottom: 4 },
  reminder: { fontSize: 12 },
  actions: { alignItems: "flex-end", gap: 8 },
  detailButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  actionRow: {
    flexDirection: "row",
    gap: 6,
  },
  statusButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: { color: "#fff", fontWeight: "700" },
});
