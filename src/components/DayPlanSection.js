import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ActivityCard = ({ activity, theme, status, onOpen, onUpdateStatus }) => {
  const statusLabel =
    status === "done" ? "Klar" : status === "denied" ? "Inte klar" : "Öppen";
  const cardBg =
    status === "done"
      ? "#e8f9ef"
      : status === "denied"
      ? "#fdecec"
      : theme.card;

  return (
    <View style={[styles.card, { backgroundColor: cardBg, shadowColor: theme.text }]}>
      <View style={styles.cardHeader}>
        <View style={styles.timeGroup}>
          <View style={styles.clockIcon}>
            <Text style={{ color: theme.muted }}>🕒</Text>
          </View>
          <Text style={[styles.time, { color: theme.text }]}>{activity.time}</Text>
        </View>
        <View style={styles.clientBadge}>
          <Text style={[styles.clientText, { color: theme.primary }]}>
            {activity.clientInitials}
          </Text>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: "#22c55e" }]}
            onPress={() => onUpdateStatus(status === "done" ? "open" : "done")}
          >
            <Text style={styles.statusButtonText}>Klar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: "#ef4444" }]}
            onPress={() =>
              onUpdateStatus(status === "denied" ? "open" : "denied")
            }
          >
            <Text style={styles.statusButtonText}>Inte</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{activity.title}</Text>
      {activity.instructions ? (
        <Text
          style={[styles.instructions, { color: theme.muted }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {activity.instructions}
        </Text>
      ) : null}
      <View style={styles.footer}>
        <Text style={{ color: theme.muted }}>
          Status: {statusLabel} • Påminnelse {activity.reminder ?? 0} min
        </Text>
        <TouchableOpacity
          style={[styles.detailButton, { borderColor: theme.border }]}
          onPress={onOpen}
        >
          <Text style={{ color: theme.text }}>Detaljer</Text>
        </TouchableOpacity>
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
    <Text style={[styles.heading, { color: theme.text }]}>Dagens planering</Text>
    {activities.length === 0 ? (
      <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
        <Text style={{ color: theme.muted }}>Inga aktiviteter schemalagda.</Text>
      </View>
    ) : (
      activities.map((activity) => (
        <ActivityCard
          key={`${activity.id}-${activity.occurrenceDate}`}
          activity={activity}
          status={activity.status ?? "open"}
          theme={theme}
          onOpen={() => onOpenActivity(activity)}
          onUpdateStatus={(next) => onUpdateStatus(activity, next)}
        />
      ))
    )}
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  emptyCard: {
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  card: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  timeGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  clockIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  time: { fontWeight: "700" },
  clientBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "#dde9ff",
  },
  clientText: { fontWeight: "700", textTransform: "uppercase" },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginLeft: "auto",
  },
  statusButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusButtonText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  title: { fontSize: 17, fontWeight: "700", marginBottom: 6 },
  instructions: { fontSize: 14, marginBottom: 10 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  detailButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
});
