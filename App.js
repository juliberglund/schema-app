import React, { useEffect, useMemo, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { HeaderNav } from "./src/components/HeaderNav";
import { DateNavigator } from "./src/components/DateNavigator";
import { ViewToggle } from "./src/components/ViewToggle";
import { DayPlanSection } from "./src/components/DayPlanSection";
import { WeekViewSection } from "./src/components/WeekViewSection";
import { ClientsSection } from "./src/components/ClientsSection";
import { ClientDetail } from "./src/components/ClientDetail";
import { ClientForm } from "./src/components/ClientForm";
import { ActivityForm } from "./src/components/ActivityForm";
import { ActivityModal } from "./src/components/ActivityModal";
import { SideMenu } from "./src/components/SideMenu";
import { EditActivityModal } from "./src/components/EditActivityModal";
import { LoginScreen } from "./src/components/LoginScreen";
import { NAV_SCREENS } from "./src/data/initialData";
import { THEMES } from "./src/theme/themes";
import { formatDate, formatTime, weekDaysFrom } from "./src/utils/dateUtils";
import { db } from "./firebaseConfig";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState("home");
  const [themeKey, setThemeKey] = useState("light");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState("day");

  const [clients, setClients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [modalActivity, setModalActivity] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Client form state
  const [clientInitials, setClientInitials] = useState("");
  const [clientFullName, setClientFullName] = useState("");
  const [clientFeedback, setClientFeedback] = useState("");

  // Activity form state
  const [activityClient, setActivityClient] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityTime, setActivityTime] = useState("09:00");
  const [activityDate, setActivityDate] = useState(formatDate(new Date()));
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDay, setRecurringDay] = useState([new Date().getDay()]);
  const [activityInstructions, setActivityInstructions] = useState("");
  const [activityReminder, setActivityReminder] = useState("30");
  const [activityFeedback, setActivityFeedback] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [activityToast, setActivityToast] = useState(null);
  const toastTimer = useRef(null);

  const theme = THEMES[themeKey];
  const themeOptions = Object.entries(THEMES);

  useEffect(() => {
    const clientsRef = collection(db, "clients");
    const activitiesRef = collection(db, "activities");

    const unsubscribeClients = onSnapshot(
      query(clientsRef, orderBy("createdAt", "asc")),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setClients(data);
      }
    );

    const unsubscribeActivities = onSnapshot(
      query(activitiesRef, orderBy("time", "asc")),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setActivities(data);
      }
    );

    return () => {
      unsubscribeClients();
      unsubscribeActivities();
    };
  }, []);

  useEffect(() => {
    if (activeScreen !== "clients") {
      setSelectedClientId(null);
    }
  }, [activeScreen]);

  useEffect(() => {
    if (
      selectedClientId &&
      !clients.find((client) => client.id === selectedClientId)
    ) {
      setSelectedClientId(null);
    }
  }, [clients, selectedClientId]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const dayKey = formatDate(selectedDate);
  const todaysActivities = useMemo(() => {
    const enriched = activities
      .flatMap((activity) => {
        if (activity.isRecurring) {
          const days = Array.isArray(activity.recurringDay)
            ? activity.recurringDay
            : [activity.recurringDay];
          if (days.includes(selectedDate.getDay())) {
            return [{ ...activity, occurrenceDate: dayKey }];
          }
          return [];
        }
        if (activity.date === dayKey) {
          return [{ ...activity, occurrenceDate: dayKey }];
        }
        return [];
      })
      .map((activity) => {
        const client = clients.find((c) => c.id === activity.clientId);
        return {
          ...activity,
          clientInitials: client?.initials ?? "Okänd",
          clientName: client?.fullName ?? "Okänd brukare",
        };
      })
      .sort((a, b) => formatTime(a.time).localeCompare(formatTime(b.time)));
    return enriched;
  }, [activities, clients, dayKey, selectedDate]);

  const weekOverview = useMemo(() => {
    const days = weekDaysFrom(selectedDate);
    return days.map((date) => {
      const key = formatDate(date);
      const blocks = activities
        .flatMap((activity) => {
          if (activity.isRecurring) {
            const days = Array.isArray(activity.recurringDay)
              ? activity.recurringDay
              : [activity.recurringDay];
            if (days.includes(date.getDay())) {
              return [{ ...activity, occurrenceDate: key }];
            }
            return [];
          }
          if (activity.date === key) {
            return [{ ...activity, occurrenceDate: key }];
          }
          return [];
        })
        .map((activity) => {
          const client = clients.find((c) => c.id === activity.clientId);
          return {
            ...activity,
            clientInitials: client?.initials ?? "Okänd",
          };
        })
        .sort((a, b) => formatTime(a.time).localeCompare(formatTime(b.time)));
      return { date, key, blocks };
    });
  }, [activities, clients, selectedDate]);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId) || null,
    [clients, selectedClientId]
  );

  const selectedClientActivities = useMemo(() => {
    if (!selectedClientId) return [];
    const now = new Date();
    const keyFor = (activity) => {
      if (activity.isRecurring && Array.isArray(activity.recurringDay)) {
        const current = now.getDay();
        const days = activity.recurringDay.slice().sort();
        const next = days.find((day) => day >= current) ?? days[0] + 7;
        const diff = next - current;
        const time = activity.time || "00:00";
        return `${String(diff).padStart(2, "0")}-${time}`;
      }
      const date = activity.date || "9999-12-31";
      return `${date}-${activity.time || "00:00"}`;
    };
    return activities
      .filter((activity) => activity.clientId === selectedClientId)
      .sort((a, b) => keyFor(a).localeCompare(keyFor(b)));
  }, [activities, selectedClientId]);

  const handleStatusChange = async (activity, status) => {
    const nextStatus = activity.status === status ? "open" : status;
    try {
      await updateDoc(doc(db, "activities", activity.id), {
        status: nextStatus,
      });
    } catch (error) {
      console.warn("Kunde inte uppdatera status", error);
    }
  };

  const shiftDay = (direction) => {
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + direction);
    setSelectedDate(next);
    setActivityDate(formatDate(next));
  };

  const handleAddClient = async () => {
    if (!clientInitials.trim()) {
      setClientFeedback("Initialer behövs.");
      return;
    }
    try {
      await addDoc(collection(db, "clients"), {
        initials: clientInitials.trim(),
        fullName: clientFullName.trim() || `Brukare ${clientInitials.trim()}`,
        createdAt: serverTimestamp(),
      });
      setClientInitials("");
      setClientFullName("");
      setClientFeedback("Ny brukare sparad.");
    } catch (error) {
      setClientFeedback("Kunde inte spara just nu.");
    }
  };

  const resetActivityForm = () => {
    const defaultClient = clients[0]?.id ?? "";
    setActivityClient(defaultClient);
    setActivityTitle("");
    setActivityTime("09:00");
    setActivityReminder("30");
    setActivityInstructions("");
    setIsRecurring(false);
    setRecurringDay([new Date().getDay()]);
    setActivityDate(formatDate(new Date()));
  };

  const showActivityToast = (message) => {
    setActivityToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setActivityToast(null), 5000);
  };

  const handleAddActivity = async () => {
    if (!activityClient || !activityTitle.trim()) {
      setActivityFeedback("Välj brukare och titel.");
      return;
    }
    if (!isRecurring && !activityDate) {
      setActivityFeedback("Välj datum.");
      return;
    }
    try {
      await addDoc(collection(db, "activities"), {
        clientId: activityClient,
        title: activityTitle.trim(),
        time: activityTime,
        date: isRecurring ? null : activityDate,
        isRecurring,
        recurringDay: isRecurring
          ? Array.isArray(recurringDay)
            ? recurringDay
            : [recurringDay]
          : null,
        instructions: activityInstructions.trim(),
        reminder: Number(activityReminder) || 0,
        status: "open",
        createdAt: serverTimestamp(),
      });
      resetActivityForm();
      showActivityToast("Aktivitet sparad");
      setActivityFeedback("");
    } catch (error) {
      setActivityFeedback("Kunde inte spara aktiviteten.");
    }
  };

  const handleDeleteActivity = async (activity) => {
    try {
      await deleteDoc(doc(db, "activities", activity.id));
    } catch (error) {
      console.warn("Kunde inte ta bort aktivitet", error);
    }
  };

  const handleUpdateActivity = async (activityId, updates) => {
    try {
      await updateDoc(doc(db, "activities", activityId), {
        ...updates,
        recurringDay: updates.isRecurring
          ? Array.isArray(updates.recurringDay)
            ? updates.recurringDay
            : [updates.recurringDay]
          : null,
      });
    } catch (error) {
      console.warn("Kunde inte uppdatera aktivitet", error);
      throw error;
    }
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: theme.background }]}
      >
        <StatusBar style={theme.statusBar} />
        <LoginScreen onLogin={() => setIsLoggedIn(true)} theme={theme} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.statusBar} />
      <View style={styles.container}>
        <HeaderNav
          theme={theme}
          navScreens={NAV_SCREENS}
          activeScreen={activeScreen}
          onChangeScreen={setActiveScreen}
          onPressMenu={() => setMenuOpen(true)}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {activeScreen === "home" && (
            <>
              <DateNavigator
                selectedDate={selectedDate}
                onPrevDay={() => shiftDay(-1)}
                onNextDay={() => shiftDay(1)}
                theme={theme}
              />
              <ViewToggle
                viewMode={viewMode}
                onChange={setViewMode}
                theme={theme}
              />

              {viewMode === "day" ? (
                <DayPlanSection
                  activities={todaysActivities}
                  theme={theme}
                  onOpenActivity={setModalActivity}
                  onUpdateStatus={handleStatusChange}
                />
              ) : (
                <WeekViewSection weekOverview={weekOverview} theme={theme} />
              )}
            </>
          )}

          {activeScreen === "clients" && (
            <>
              {selectedClient && (
                <ClientDetail
                  client={selectedClient}
                  activities={selectedClientActivities}
                  theme={theme}
                  onBack={() => setSelectedClientId(null)}
                  onEdit={(activity) => setEditingActivity(activity)}
                  onDelete={handleDeleteActivity}
                />
              )}
              {!selectedClient && (
                <ClientsSection
                  clients={clients}
                  theme={theme}
                  onSelectClient={setSelectedClientId}
                />
              )}
            </>
          )}

          {activeScreen === "add" && (
            <>
              <ClientForm
                clientInitials={clientInitials}
                clientFullName={clientFullName}
                onChangeInitials={setClientInitials}
                onChangeFullName={setClientFullName}
                onSubmit={handleAddClient}
                feedback={clientFeedback}
                theme={theme}
              />
              <ActivityForm
                clients={clients}
                activityClient={activityClient}
                setActivityClient={setActivityClient}
                activityTitle={activityTitle}
                setActivityTitle={setActivityTitle}
                activityTime={activityTime}
                setActivityTime={setActivityTime}
                activityReminder={activityReminder}
                setActivityReminder={setActivityReminder}
                isRecurring={isRecurring}
                setIsRecurring={setIsRecurring}
                activityDate={activityDate}
                setActivityDate={setActivityDate}
                recurringDay={recurringDay}
                setRecurringDay={setRecurringDay}
                activityInstructions={activityInstructions}
                setActivityInstructions={setActivityInstructions}
                feedback={activityFeedback}
                onSubmit={handleAddActivity}
                theme={theme}
              />
              {activityToast && (
                <View
                  style={[
                    styles.toast,
                    { backgroundColor: theme.card, shadowColor: theme.text },
                  ]}
                >
                  <Text style={{ flex: 1, color: theme.text }}>
                    {activityToast}
                  </Text>
                  <TouchableOpacity onPress={() => setActivityToast(null)}>
                    <Text style={{ color: theme.primary }}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>

      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        navScreens={NAV_SCREENS}
        activeScreen={activeScreen}
        onChangeScreen={setActiveScreen}
        themeOptions={themeOptions}
        themeKey={themeKey}
        onSelectTheme={(key) => setThemeKey(key)}
        onLogout={() => {
          setMenuOpen(false);
          setIsLoggedIn(false);
        }}
        theme={theme}
      />

      <EditActivityModal
        visible={!!editingActivity}
        activity={editingActivity}
        onClose={() => setEditingActivity(null)}
        onSave={handleUpdateActivity}
        onDelete={(activity) => {
          handleDeleteActivity(activity);
          setEditingActivity(null);
        }}
        theme={theme}
        clients={clients}
      />

      <ActivityModal
        activity={modalActivity}
        onClose={() => setModalActivity(null)}
        theme={theme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 40,
    padding: 16,
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
