/**
 * Copyright © 2025 MFA (Med Farah). All rights reserved.
 * Académie Arabe - Systems LMS universitte*
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ReportsScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const reports = [
        { id: '1', title: t('reports.studentReport'), icon: 'school', color: '#3B82F6' },
        { id: '2', title: t('reports.attendanceReport'), icon: 'checkmark-circle', color: '#10B981' },
        { id: '3', title: t('reports.gradeReport'), icon: 'trophy', color: '#F59E0B' },
        { id: '4', title: t('reports.courseReport'), icon: 'book', color: '#8B5CF6' },
        { id: '5', title: t('reports.financialReport'), icon: 'cash', color: '#22C55E' },
        { id: '6', title: t('reports.systemReport'), icon: 'stats-chart', color: '#EC4899' },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {t('reports.title')}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    {t('reports.subtitle')}
                </Text>

                <View style={styles.reportsGrid}>
                    {reports.map((report) => (
                        <TouchableOpacity
                            key={report.id}
                            style={[styles.reportCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        >
                            <View style={[styles.reportIcon, { backgroundColor: report.color + '15' }]}>
                                <Ionicons name={report.icon as any} size={32} color={report.color} />
                            </View>
                            <Text style={[styles.reportTitle, { color: colors.text }]}>
                                {report.title}
                            </Text>
                            <Ionicons name="download-outline" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    ))}
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
    title: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 24,
    },
    reportsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    reportCard: {
        width: '47%',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    reportIcon: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    reportTitle: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
});


