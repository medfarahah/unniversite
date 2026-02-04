/**
 * Copyright © 2025 MFA (Med Farah). All rights reserved.
 * Académie Arabe - Systems LMS universitte*
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_STUDENTS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function UserManagementScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { user } = useUser();
    const [filter, setFilter] = useState<'all' | 'students' | 'teachers' | 'admins'>('all');

    const stats = {
        total: 150,
        students: 120,
        teachers: 25,
        admins: 5,
    };

    const handleUserAction = (action: string, userId: string) => {
        Alert.alert(
            t('userManagement.confirm'),
            t('userManagement.confirmMessage', { action, userId }),
            [
                { text: t('common.cancel'), style: 'cancel' },
                { text: t('common.confirm'), onPress: () => Alert.alert(t('userManagement.success')) },
            ]
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
                        <Ionicons name="people" size={32} color="#FFF" />
                        <Text style={styles.statValue}>{stats.total}</Text>
                        <Text style={styles.statLabel}>{t('userManagement.totalUsers')}</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: colors.success }]}>
                        <Ionicons name="school" size={32} color="#FFF" />
                        <Text style={styles.statValue}>{stats.students}</Text>
                        <Text style={styles.statLabel}>{t('userManagement.students')}</Text>
                    </View>
                </View>
                <View style={styles.statsContainer}>
                    <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
                        <Ionicons name="person" size={32} color="#FFF" />
                        <Text style={styles.statValue}>{stats.teachers}</Text>
                        <Text style={styles.statLabel}>{t('userManagement.teachers')}</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#6366F1' }]}>
                        <Ionicons name="shield-checkmark" size={32} color="#FFF" />
                        <Text style={styles.statValue}>{stats.admins}</Text>
                        <Text style={styles.statLabel}>{t('userManagement.admins')}</Text>
                    </View>
                </View>

                {/* Filter Buttons */}
                <View style={styles.filterContainer}>
                    {(['all', 'students', 'teachers', 'admins'] as const).map((filterType) => (
                        <TouchableOpacity
                            key={filterType}
                            style={[
                                styles.filterBtn,
                                filter === filterType && { backgroundColor: colors.primary },
                                filter !== filterType && { backgroundColor: colors.surface, borderColor: colors.border },
                            ]}
                            onPress={() => setFilter(filterType)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filter === filterType && { color: '#FFF' },
                                    filter !== filterType && { color: colors.text },
                                ]}
                            >
                                {t(`userManagement.${filterType}`)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Users List */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        {t('userManagement.userList')}
                    </Text>
                    {MOCK_STUDENTS.map((student) => (
                        <View key={student.id} style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={styles.userInfo}>
                                <View style={[styles.userIcon, { backgroundColor: colors.primary + '15' }]}>
                                    <Ionicons name="person" size={24} color={colors.primary} />
                                </View>
                                <View style={styles.userDetails}>
                                    <Text style={[styles.userName, { color: colors.text }]}>{student.name}</Text>
                                    <Text style={[styles.userId, { color: colors.textSecondary }]}>
                                        ID: {student.id} • {student.department}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.userActions}>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: colors.primary + '15' }]}
                                    onPress={() => handleUserAction(t('userManagement.edit'), student.id)}
                                >
                                    <Ionicons name="create-outline" size={18} color={colors.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: colors.error + '15' }]}
                                    onPress={() => handleUserAction(t('userManagement.delete'), student.id)}
                                >
                                    <Ionicons name="trash-outline" size={18} color={colors.error} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Add User Button */}
                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: colors.primary }]}
                    onPress={() => Alert.alert(t('userManagement.addUser'))}
                >
                    <Ionicons name="add" size={24} color="#FFF" />
                    <Text style={styles.addButtonText}>{t('userManagement.addUser')}</Text>
                </TouchableOpacity>
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
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    statCard: {
        flex: 1,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    statValue: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFF',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '600',
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    filterBtn: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    filterText: {
        fontSize: 13,
        fontWeight: '600',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 16,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    userIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    userId: {
        fontSize: 13,
    },
    userActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 8,
        marginTop: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});


