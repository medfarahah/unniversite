/**
 * Copyright © 2025 MFA (Med Farah). All rights reserved.
 * Académie Arabe - Systems LMS universitte*
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function SystemSettingsScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [maintenance, setMaintenance] = useState(false);
    const [autoBackup, setAutoBackup] = useState(true);

    const SettingRow = ({ icon, label, value, onPress, right }: any) => (
        <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primary + '15' }]}>
                    <Ionicons name={icon} size={20} color={colors.primary} />
                </View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
            </View>
            {right || (
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            )}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                {/* System Status */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        {t('systemSettings.systemStatus')}
                    </Text>
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <View style={styles.statusRow}>
                            <View style={styles.statusInfo}>
                                <Ionicons name="server" size={24} color={colors.success} />
                                <View style={styles.statusText}>
                                    <Text style={[styles.statusLabel, { color: colors.text }]}>
                                        {t('systemSettings.serverStatus')}
                                    </Text>
                                    <Text style={[styles.statusValue, { color: colors.success }]}>
                                        {t('systemSettings.online')}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
                        </View>
                    </View>
                </View>

                {/* General Settings */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        {t('systemSettings.general')}
                    </Text>
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <SettingRow
                            icon="notifications"
                            label={t('systemSettings.notifications')}
                            right={
                                <Switch
                                    value={notifications}
                                    onValueChange={setNotifications}
                                    trackColor={{ false: colors.border, true: colors.primary }}
                                />
                            }
                        />
                        <SettingRow
                            icon="cloud-upload"
                            label={t('systemSettings.autoBackup')}
                            right={
                                <Switch
                                    value={autoBackup}
                                    onValueChange={setAutoBackup}
                                    trackColor={{ false: colors.border, true: colors.primary }}
                                />
                            }
                        />
                        <SettingRow
                            icon="construct"
                            label={t('systemSettings.maintenanceMode')}
                            right={
                                <Switch
                                    value={maintenance}
                                    onValueChange={setMaintenance}
                                    trackColor={{ false: colors.border, true: colors.error }}
                                />
                            }
                        />
                    </View>
                </View>

                {/* Database */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        {t('systemSettings.database')}
                    </Text>
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <SettingRow
                            icon="server"
                            label={t('systemSettings.backupDatabase')}
                            onPress={() => Alert.alert(t('systemSettings.backupStarted'))}
                        />
                        <SettingRow
                            icon="refresh"
                            label={t('systemSettings.clearCache')}
                            onPress={() => Alert.alert(t('systemSettings.cacheCleared'))}
                        />
                    </View>
                </View>

                {/* Security */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        {t('systemSettings.security')}
                    </Text>
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <SettingRow
                            icon="shield-checkmark"
                            label={t('systemSettings.securitySettings')}
                            onPress={() => Alert.alert(t('systemSettings.comingSoon'))}
                        />
                        <SettingRow
                            icon="key"
                            label={t('systemSettings.apiKeys')}
                            onPress={() => Alert.alert(t('systemSettings.comingSoon'))}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 8,
        marginLeft: 4,
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    statusInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statusText: {
        gap: 4,
    },
    statusLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    statusValue: {
        fontSize: 12,
        fontWeight: '700',
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    settingIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
});


