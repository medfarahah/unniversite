/**
 * Copyright © 2025 MFA (Med Farah). All rights reserved.
 * Académie Arabe - Systems LMS universitte*
 */

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function ProfileScreen() {
    const { t } = useTranslation();
    const { user, logout } = useUser();
    const { colors } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    const InfoRow = ({ icon: IconName, label, value }: any) => (
        <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
            <View style={[styles.infoIcon, { backgroundColor: colors.primary + '10' }]}>
                <Ionicons name={IconName} size={20} color={colors.primary} />
            </View>
            <View>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View style={styles.logoSection}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo.jpeg')}
                            style={styles.logo}
                            contentFit="contain"
                        />
                    </View>
                </View>
                <View style={[styles.avatarContainer, { borderColor: colors.primary }]}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=' + user?.id }}
                        style={styles.avatar}
                    />
                </View>
                <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
                <Text style={[styles.role, { color: colors.primary }]}>{t(`roles.${user?.role}`)}</Text>
            </View>

            <View style={[styles.infoSection, { backgroundColor: colors.surface }]}>
                <InfoRow icon="person" label={t('profile.studentId')} value={user?.id} />
                <InfoRow icon="mail" label="Email" value={`${user?.name.toLowerCase().replace(' ', '.')}@university.edu`} />
                <InfoRow icon="location" label={t('profile.department')} value={user?.department} />
                <InfoRow icon="call" label={t('profile.level')} value={user?.level} />
            </View>

            <TouchableOpacity
                style={[styles.logoutBtn, { borderColor: colors.error }]}
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" color={colors.error} size={20} />
                <Text style={[styles.logoutText, { color: colors.error }]}>{t('profile.logout')}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 32,
    },
    logoSection: {
        marginBottom: 16,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        padding: 4,
        marginBottom: 16,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 56,
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    infoSection: {
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoLabel: {
        fontSize: 12,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    logoutBtn: {
        margin: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        gap: 12,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
    },
});
