import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { Platform } from "react-native";
import { GradeManagementProvider } from "../context/GradeManagementContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import i18n from "../i18n";

function AppContent() {
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      SystemUI.setBackgroundColorAsync(colors.background);
    }
  }, [colors.background]);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/exam-calendar" options={{ title: "Exam Calendar", headerShown: true }} />
        <Stack.Screen name="(screens)/academic-status" options={{ title: "Academic Status", headerShown: true }} />
        <Stack.Screen name="(screens)/exam-results" options={{ title: "Exam Results", headerShown: true }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <UserProvider>
          <GradeManagementProvider>
            <AppContent />
          </GradeManagementProvider>
        </UserProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
