import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const LoginScreen = ({ onLogin, theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, shadowColor: theme.text },
        ]}
      >
        <Text style={[styles.brand, { color: theme.primary }]}>Nest</Text>
        <Text style={{ color: theme.muted, marginBottom: 24 }}>
          Planera dagens omsorg på ett ställe.
        </Text>
        <TextInput
          placeholder="E-post"
          placeholderTextColor={theme.muted}
          style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Lösenord"
          placeholderTextColor={theme.muted}
          style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: theme.primary }]}
          onPress={onLogin}
        >
          <Text style={styles.loginText}>Logga in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  brand: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
