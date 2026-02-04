/**
 * Copyright © 2025 MFA (Med Farah). All rights reserved.
 * Académie Arabe - Systems LMS universitte*
 */

import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Platform } from "react-native";
import { GradeManagementProvider } from "../context/GradeManagementContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { UserProvider, useUser } from "../context/UserContext";
import { useProtectSource } from "../hooks/useProtectSource";
import i18n from "../i18n";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Wait for segments to be ready
    if (segments.length === 0) return;

    const currentRoute = segments[0];
    const isOnLoginPage = currentRoute === undefined || currentRoute === "index";
    const isOnProtectedRoute = currentRoute === "(tabs)" || currentRoute === "(screens)";

    // Small timeout to ensure navigation is ready
    const timeout = setTimeout(() => {
      if (!user) {
        // User is not authenticated - redirect to login if trying to access protected routes
        if (isOnProtectedRoute) {
          router.replace("/");
        }
      } else {
        // User is authenticated - redirect to home if on login page
        if (isOnLoginPage) {
          router.replace("/home");
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [user, segments, isMounted]);

  return <>{children}</>;
}

function AppContent() {
  const { colors, isDark } = useTheme();
  useProtectSource();

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      SystemUI.setBackgroundColorAsync(colors.background);
    }
    console.log("Developed by Med Farah");
  }, [colors.background]);

  return (
    <>
      <AuthGuard>
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
          <Stack.Screen name="(screens)/student-card" options={{ title: "Student Card", headerShown: true }} />
          <Stack.Screen name="(screens)/courses" options={{ title: "Courses", headerShown: true }} />
          <Stack.Screen name="(screens)/course-detail" options={{ title: "Course Details", headerShown: true }} />
          <Stack.Screen name="(screens)/user-management" options={{ title: "User Management", headerShown: true }} />
          <Stack.Screen name="(screens)/system-settings" options={{ title: "System Settings", headerShown: true }} />
          <Stack.Screen name="(screens)/reports" options={{ title: "Reports & Analytics", headerShown: true }} />
          <Stack.Screen name="(screens)/term-certificate" options={{ title: "Term Certificate", headerShown: true }} />
        </Stack>
      </AuthGuard>
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
