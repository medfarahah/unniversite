import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function TabLayout() {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    height: Platform.OS === 'ios' ? 88 : 64,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    paddingTop: 10,
                },
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTintColor: colors.text,
                headerShadowVisible: false,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: t('tabs.home'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="announcements"
                options={{
                    title: t('tabs.announcements'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="megaphone" size={size} color={color} />,
                    headerShown: true,
                }}
            />
            <Tabs.Screen
                name="groups"
                options={{
                    title: t('tabs.groups'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
                    headerShown: true,
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: t('tabs.menu'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="apps" size={size} color={color} />,
                    headerShown: true,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('tabs.profile'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                    headerShown: true,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: t('tabs.settings'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
                    headerShown: true,
                }}
            />
        </Tabs>
    );
}
