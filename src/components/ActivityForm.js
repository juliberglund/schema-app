import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDate, formatHumanDate, weekDaysFrom } from "../utils/dateUtils";

const WEEK_LABELS = ["Må", "Ti", "On", "To", "Fr", "Lö", "Sö"];

export const ActivityForm = ({
  clients,
  activityClient,
  setActivityClient,
  activityTitle,
  setActivityTitle,
  activityTime,
  setActivityTime,
  activityReminder,
  setActivityReminder,
  isRecurring,
  setIsRecurring,
  activityDate,
  setActivityDate,
  recurringDay,
  setRecurringDay,
  activityInstructions,
  setActivityInstructions,
  feedback,
  onSubmit,
  theme,
}) => {
  useEffect(() => {
    if (
      clients.length > 0 &&
      !clients.find((client) => client.id === activityClient)
    ) {
      setActivityClient(clients[0].id);
    }
  }, [clients, activityClient, setActivityClient]);

  const disabled = clients.length === 0;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: theme.text }]}>
        Lägg till ny Aktivitet/Block
      </Text>
      <View
        style={[
          styles.formCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.label, { color: theme.text }]}>Brukare *</Text>
        {clients.length === 0 ? (
          <Text style={{ color: theme.muted, marginBottom: 12 }}>
            Lägg först till en brukare.
          </Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 12 }}
          >
            {clients.map((client) => (
              <TouchableOpacity
                key={client.id}
                onPress={() => setActivityClient(client.id)}
                style={[
                  styles.clientPill,
                  {
                    backgroundColor:
                      activityClient === client.id
                        ? theme.primary
                        : theme.background,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: activityClient === client.id ? "#fff" : theme.text,
                    fontWeight: "600",
                  }}
                >
                  {client.initials}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <TextInput
          value={activityTitle}
          onChangeText={setActivityTitle}
          placeholder="Titel (ex. Vattengympa)"
          placeholderTextColor={theme.muted}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.border },
          ]}
        />

        <View style={styles.inlineInputs}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={[styles.label, { color: theme.text }]}>Tid *</Text>
            <TextInput
              value={activityTime}
              onChangeText={setActivityTime}
              placeholder="09:00"
              placeholderTextColor={theme.muted}
              style={[
                styles.input,
                styles.inlineInput,
                { color: theme.text, borderColor: theme.border },
              ]}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={[styles.label, { color: theme.text }]}>
              Påminnelse (min)
            </Text>
            <TextInput
              value={activityReminder}
              onChangeText={setActivityReminder}
              placeholder="30"
              placeholderTextColor={theme.muted}
              keyboardType="numeric"
              style={[
                styles.input,
                styles.inlineInput,
                { color: theme.text, borderColor: theme.border },
              ]}
            />
          </View>
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor: !isRecurring
                  ? theme.primary
                  : theme.background,
                borderColor: theme.border,
              },
            ]}
            onPress={() => setIsRecurring(false)}
          >
            <Text style={{ color: !isRecurring ? "#fff" : theme.text }}>
              Enkel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor: isRecurring ? theme.primary : theme.background,
                borderColor: theme.border,
              },
            ]}
            onPress={() => setIsRecurring(true)}
          >
            <Text style={{ color: isRecurring ? "#fff" : theme.text }}>
              Återkommande
            </Text>
          </TouchableOpacity>
        </View>

        {!isRecurring ? (
          <>
            <Text style={[styles.label, { color: theme.text }]}>Datum</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {weekDaysFrom(new Date()).map((date) => {
                const key = formatDate(date);
                return (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.dayPill,
                      {
                        backgroundColor:
                          activityDate === key
                            ? theme.primary
                            : theme.background,
                        borderColor: theme.border,
                      },
                    ]}
                    onPress={() => setActivityDate(key)}
                  >
                    <Text
                      style={{
                        color: activityDate === key ? "#fff" : theme.text,
                        fontWeight: "600",
                      }}
                    >
                      {formatHumanDate(date)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        ) : (
          <>
            <Text style={[styles.label, { color: theme.text }]}>
              Veckodagar
            </Text>
            <View style={styles.weekdayRow}>
              {WEEK_LABELS.map((label, index) => {
                const selected = Array.isArray(recurringDay)
                  ? recurringDay.includes(index)
                  : recurringDay === index;
                return (
                  <TouchableOpacity
                    key={label}
                    onPress={() => {
                      const nextSet = new Set(
                        Array.isArray(recurringDay)
                          ? recurringDay
                          : typeof recurringDay === "number"
                            ? [recurringDay]
                            : []
                      );
                      if (selected) {
                        nextSet.delete(index);
                      } else {
                        nextSet.add(index);
                      }
                      setRecurringDay(Array.from(nextSet).sort());
                    }}
                    style={[
                      styles.weekdayButton,
                      {
                        backgroundColor: selected
                          ? theme.primary
                          : theme.background,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text style={{ color: selected ? "#fff" : theme.text }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        <Text style={[styles.label, { color: theme.text, marginTop: 12 }]}>
          Detaljerade instruktioner
        </Text>
        <TextInput
          value={activityInstructions}
          onChangeText={setActivityInstructions}
          placeholder="Hur-gör-man..."
          placeholderTextColor={theme.muted}
          multiline
          style={[
            styles.input,
            styles.multilineInput,
            { color: theme.text, borderColor: theme.border },
          ]}
        />

        {feedback.length > 0 && (
          <Text style={{ color: theme.muted }}>{feedback}</Text>
        )}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            {
              backgroundColor: disabled ? theme.border : theme.primary,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
          onPress={onSubmit}
          disabled={disabled}
        >
          <Text style={styles.primaryButtonText}>Spara Aktivitet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 32 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  formCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  label: { fontWeight: "600", marginBottom: 6 },
  clientPill: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
  },
  inlineInputs: { flexDirection: "row", marginTop: 10 },
  inlineInput: { marginTop: 6 },
  toggleRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  dayPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 10,
  },
  weekdayRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  weekdayButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  multilineInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
