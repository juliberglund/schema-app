import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatHumanDate } from "../utils/dateUtils";

export const WeekViewSection = ({ weekOverview, theme }) => (
  <View style={styles.section}>
    <Text style={[styles.title, { color: theme.text }]}>Veckovy</Text>
    <View style={styles.weekWrapper}>
      {weekOverview.map((day) => (
        <View
          key={day.key}
          style={[
            styles.weekCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.weekDay, { color: theme.text }]}>
            {formatHumanDate(day.date)}
          </Text>
          {day.blocks.length === 0 ? (
            <Text style={{ color: theme.muted, fontSize: 12 }}>
              Ingen aktivitet
            </Text>
          ) : (
            day.blocks.map((activity) => (
              <View key={`${activity.id}-${day.key}`} style={styles.weekBlock}>
                <Text style={[styles.blockTitle, { color: theme.text }]}>
                  {activity.time} {activity.clientInitials}
                </Text>
                <Text style={{ color: theme.muted, fontSize: 12 }}>
                  {activity.title}
                </Text>
              </View>
            ))
          )}
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  weekWrapper: { gap: 12 },
  weekCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  weekDay: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  weekBlock: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  blockTitle: { fontWeight: "600", fontSize: 13 },
});
