import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const SideMenu = ({
  visible,
  onClose,
  navScreens,
  activeScreen,
  onChangeScreen,
  themeOptions,
  themeKey,
  onSelectTheme,
  onLogout,
  theme,
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={[styles.menu, { backgroundColor: theme.card }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.primary }]}>Meny</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.close, { color: theme.text }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionLabel, { color: theme.muted }]}>
          Navigation
        </Text>
        {navScreens.map((screen) => {
          const active = activeScreen === screen.id;
          return (
            <TouchableOpacity
              key={screen.id}
              onPress={() => {
                onChangeScreen(screen.id);
                onClose();
              }}
              style={[
                styles.navItem,
                {
                  backgroundColor: active ? theme.primary : theme.background,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? "#fff" : theme.text,
                  fontWeight: active ? "600" : "400",
                }}
              >
                {screen.icon} {screen.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <Text style={[styles.sectionLabel, { color: theme.muted }]}>Tema</Text>
        <View style={styles.themeList}>
          {themeOptions.map(([key, value]) => {
            const active = themeKey === key;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => onSelectTheme(key)}
                style={[
                  styles.themeButton,
                  {
                    backgroundColor: active ? theme.primary : theme.background,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: active ? "#fff" : theme.text,
                    fontWeight: "600",
                  }}
                >
                  {value.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { borderColor: theme.border }]}
          onPress={onLogout}
        >
          <Text style={{ color: theme.danger, fontWeight: "600" }}>
            Logga ut
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    width: 280,
    padding: 20,
    paddingTop: 40,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: "700" },
  close: { fontSize: 20 },
  sectionLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 12,
  },
  navItem: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
  },
  themeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  themeButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  logoutButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
});
