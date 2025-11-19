import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const WEEK_LABELS = ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"];

export const EditActivityModal = ({
  visible,
  activity,
  onClose,
  onSave,
  onDelete,
  theme,
  clients,
}) => {
  const [form, setForm] = useState({
    title: "",
    clientId: "",
    time: "09:00",
    reminder: "30",
    date: "",
    isRecurring: false,
    recurringDay: 1,
    instructions: "",
  });

  useEffect(() => {
    if (activity) {
      setForm({
        title: activity.title || "",
        clientId: activity.clientId || "",
        time: activity.time || "09:00",
        reminder: String(activity.reminder ?? "30"),
        date: activity.date || "",
        isRecurring: !!activity.isRecurring,
        recurringDay:
          typeof activity.recurringDay === "number"
            ? activity.recurringDay
            : 1,
        instructions: activity.instructions || "",
      });
    }
  }, [activity]);

  if (!activity) return null;

  const updateForm = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(activity.id, {
      ...form,
      reminder: Number(form.reminder) || 0,
      date: form.isRecurring ? null : form.date,
      isRecurring: form.isRecurring,
      recurringDay: form.isRecurring ? form.recurringDay : null,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, { color: theme.text }]}>
              Redigera aktivitet
            </Text>

            <Text style={[styles.label, { color: theme.text }]}>Brukare</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {clients.map((client) => (
                <TouchableOpacity
                  key={client.id}
                  onPress={() => updateForm({ clientId: client.id })}
                  style={[
                    styles.clientPill,
                    {
                      backgroundColor:
                        form.clientId === client.id
                          ? theme.primary
                          : theme.background,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: form.clientId === client.id ? "#fff" : theme.text,
                      fontWeight: "600",
                    }}
                  >
                    {client.initials}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.label, { color: theme.text }]}>Titel</Text>
            <TextInput
              value={form.title}
              onChangeText={(text) => updateForm({ title: text })}
              style={[
                styles.input,
                { borderColor: theme.border, color: theme.text },
              ]}
              placeholder="Titel"
              placeholderTextColor={theme.muted}
            />

            <Text style={[styles.label, { color: theme.text }]}>Tid</Text>
            <TextInput
              value={form.time}
              onChangeText={(text) => updateForm({ time: text })}
              style={[
                styles.input,
                { borderColor: theme.border, color: theme.text },
              ]}
            />

            <Text style={[styles.label, { color: theme.text }]}>
              Påminnelse (min)
            </Text>
            <TextInput
              value={form.reminder}
              onChangeText={(text) => updateForm({ reminder: text })}
              style={[
                styles.input,
                { borderColor: theme.border, color: theme.text },
              ]}
              keyboardType="numeric"
            />

            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  {
                    backgroundColor: !form.isRecurring
                      ? theme.primary
                      : theme.background,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => updateForm({ isRecurring: false })}
              >
                <Text style={{ color: !form.isRecurring ? "#fff" : theme.text }}>
                  Engångs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  {
                    backgroundColor: form.isRecurring
                      ? theme.primary
                      : theme.background,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => updateForm({ isRecurring: true })}
              >
                <Text style={{ color: form.isRecurring ? "#fff" : theme.text }}>
                  Återkommande
                </Text>
              </TouchableOpacity>
            </View>

            {!form.isRecurring ? (
              <>
                <Text style={[styles.label, { color: theme.text }]}>
                  Datum (ÅÅÅÅ-MM-DD)
                </Text>
                <TextInput
                  value={form.date || ""}
                  onChangeText={(text) => updateForm({ date: text })}
                  style={[
                    styles.input,
                    { borderColor: theme.border, color: theme.text },
                  ]}
                  placeholder="2024-11-19"
                  placeholderTextColor={theme.muted}
                />
              </>
            ) : (
              <>
                <Text style={[styles.label, { color: theme.text }]}>
                  Veckodag
                </Text>
                <View style={styles.weekdayRow}>
                  {WEEK_LABELS.map((label, index) => (
                    <TouchableOpacity
                      key={label}
                      onPress={() => updateForm({ recurringDay: index })}
                      style={[
                        styles.weekdayButton,
                        {
                          backgroundColor:
                            form.recurringDay === index
                              ? theme.primary
                              : theme.background,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            form.recurringDay === index ? "#fff" : theme.text,
                        }}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            <Text style={[styles.label, { color: theme.text }]}>
              Instruktioner
            </Text>
            <TextInput
              value={form.instructions}
              onChangeText={(text) => updateForm({ instructions: text })}
              style={[
                styles.input,
                styles.multiline,
                { borderColor: theme.border, color: theme.text },
              ]}
              multiline
              placeholder="Detaljer..."
              placeholderTextColor={theme.muted}
            />

            <View style={styles.footerActions}>
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: theme.danger }]}
                onPress={() => onDelete(activity)}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Ta bort
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.primary }]}
                onPress={handleSave}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Spara</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.cancelLink}>
              <Text style={{ color: theme.muted }}>Avbryt</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  label: { fontWeight: "600", marginTop: 12, marginBottom: 6 },
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
  toggleRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  toggle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
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
  multiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  footerActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  deleteButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelLink: {
    marginTop: 12,
    alignItems: "center",
  },
});
