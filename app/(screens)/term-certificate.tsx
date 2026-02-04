/**
 * Copyright © 2025 MFA (Med Farah). All rights reserved.
 * Académie Arabe - Systems LMS universitte*
 */

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_ACADEMIC_STATUS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');

export default function TermCertificateScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const [selectedSemester, setSelectedSemester] = useState('Semester 5');
    const status = MOCK_ACADEMIC_STATUS;

    const semesters = [
        { id: 's5', name: 'Semester 5', completed: true, gpa: 3.8, date: '2024-12-20' },
        { id: 's4', name: 'Semester 4', completed: true, gpa: 3.6, date: '2024-06-15' },
        { id: 's3', name: 'Semester 3', completed: true, gpa: 3.7, date: '2024-01-10' },
    ];

    const currentSemester = semesters.find(s => s.name === selectedSemester);

    const handleDownload = () => {
        Alert.alert(
            t('certificate.download'),
            t('certificate.downloadMessage'),
            [
                { text: t('common.cancel'), style: 'cancel' },
                { text: t('certificate.downloadPDF'), onPress: () => Alert.alert(t('certificate.downloadStarted')) },
            ]
        );
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: t('certificate.shareMessage', {
                    name: user?.name,
                    semester: selectedSemester,
                    gpa: currentSemester?.gpa
                }),
                title: t('certificate.shareTitle'),
            });
        } catch (error) {
            Alert.alert(t('certificate.shareError'));
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                {/* Semester Selector */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        {t('certificate.selectSemester')}
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.semesterList}>
                        {semesters.map((semester) => (
                            <TouchableOpacity
                                key={semester.id}
                                style={[
                                    styles.semesterCard,
                                    selectedSemester === semester.name && {
                                        backgroundColor: colors.primary,
                                        borderColor: colors.primary,
                                    },
                                    selectedSemester !== semester.name && {
                                        backgroundColor: colors.surface,
                                        borderColor: colors.border,
                                    },
                                ]}
                                onPress={() => setSelectedSemester(semester.name)}
                            >
                                <Text
                                    style={[
                                        styles.semesterText,
                                        selectedSemester === semester.name && { color: '#FFF' },
                                        selectedSemester !== semester.name && { color: colors.text },
                                    ]}
                                >
                                    {semester.name}
                                </Text>
                                {semester.completed && (
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={16}
                                        color={selectedSemester === semester.name ? '#FFF' : colors.success}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Certificate */}
                {currentSemester && currentSemester.completed && (
                    <View style={styles.certificateContainer}>
                        <View style={[styles.certificate, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            {/* Certificate Header */}
                            <View style={styles.certificateHeader}>
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={require('../../assets/images/logo.jpeg')}
                                        style={styles.logoImage}
                                        contentFit="contain"
                                    />
                                </View>
                                <Text style={[styles.universityName, { color: colors.text }]}>
                                    Académie Arabe
                                </Text>
                                <Text style={[styles.universitySubtitle, { color: colors.textSecondary }]}>
                                    Systems LMS universitte*
                                </Text>
                            </View>

                            {/* Certificate Body */}
                            <View style={styles.certificateBody}>
                                <Text style={[styles.certificateTitle, { color: colors.text }]}>
                                    {t('certificate.title')}
                                </Text>
                                <Text style={[styles.certificateText, { color: colors.text }]}>
                                    {t('certificate.awardedTo')}
                                </Text>
                                <Text style={[styles.studentName, { color: colors.primary }]}>
                                    {user?.name}
                                </Text>
                                <Text style={[styles.certificateText, { color: colors.text }]}>
                                    {t('certificate.forCompletion')} {selectedSemester}
                                </Text>
                                <Text style={[styles.certificateText, { color: colors.text }]}>
                                    {t('certificate.department')}: {user?.department}
                                </Text>
                                <Text style={[styles.certificateText, { color: colors.text }]}>
                                    {t('certificate.level')}: {user?.level}
                                </Text>
                                <View style={[styles.gpaContainer, { backgroundColor: colors.primary + '10' }]}>
                                    <Text style={[styles.gpaLabel, { color: colors.textSecondary }]}>
                                        {t('certificate.semesterGPA')}
                                    </Text>
                                    <Text style={[styles.gpaValue, { color: colors.primary }]}>
                                        {currentSemester.gpa}
                                    </Text>
                                </View>
                            </View>

                            {/* Certificate Footer */}
                            <View style={[styles.certificateFooter, { borderTopColor: colors.border }]}>
                                <View style={styles.signatureSection}>
                                    <Text style={[styles.signatureLabel, { color: colors.textSecondary }]}>
                                        {t('certificate.dean')}
                                    </Text>
                                    <Text style={[styles.signatureName, { color: colors.text }]}>
                                        Dr. Ahmed Hassan
                                    </Text>
                                </View>
                                <View style={styles.dateSection}>
                                    <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>
                                        {t('certificate.date')}
                                    </Text>
                                    <Text style={[styles.dateValue, { color: colors.text }]}>
                                        {new Date(currentSemester.date).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>

                            {/* Certificate Number */}
                            <View style={styles.certificateNumber}>
                                <Text style={[styles.certNumberText, { color: colors.textSecondary }]}>
                                    {t('certificate.certificateNumber')}: CERT-{user?.id}-{selectedSemester.replace(' ', '')}
                                </Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                                onPress={handleDownload}
                            >
                                <Ionicons name="download" size={20} color="#FFF" />
                                <Text style={styles.actionText}>{t('certificate.downloadPDF')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: colors.success }]}
                                onPress={handleShare}
                            >
                                <Ionicons name="share" size={20} color="#FFF" />
                                <Text style={styles.actionText}>{t('certificate.share')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {currentSemester && !currentSemester.completed && (
                    <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
                        <Ionicons name="document-outline" size={64} color={colors.textSecondary} />
                        <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                            {t('certificate.notCompleted')}
                        </Text>
                    </View>
                )}
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
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 12,
    },
    semesterList: {
        marginHorizontal: -4,
    },
    semesterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 2,
        marginRight: 12,
        gap: 8,
    },
    semesterText: {
        fontSize: 14,
        fontWeight: '700',
    },
    certificateContainer: {
        alignItems: 'center',
    },
    certificate: {
        width: width - 40,
        maxWidth: 600,
        borderRadius: 24,
        borderWidth: 2,
        padding: 32,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    certificateHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        padding: 8,
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },

    universityName: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
        textAlign: 'center',
    },
    universitySubtitle: {
        fontSize: 14,
        textAlign: 'center',
    },
    certificateBody: {
        alignItems: 'center',
        marginBottom: 32,
    },
    certificateTitle: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 24,
        textAlign: 'center',
    },
    certificateText: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    studentName: {
        fontSize: 32,
        fontWeight: '800',
        marginVertical: 16,
        textAlign: 'center',
    },
    gpaContainer: {
        padding: 20,
        borderRadius: 16,
        marginTop: 24,
        alignItems: 'center',
        minWidth: 200,
    },
    gpaLabel: {
        fontSize: 14,
        marginBottom: 8,
    },
    gpaValue: {
        fontSize: 36,
        fontWeight: '800',
    },
    certificateFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 24,
        marginTop: 24,
        borderTopWidth: 1,
    },
    signatureSection: {
        flex: 1,
        alignItems: 'center',
    },
    signatureLabel: {
        fontSize: 12,
        marginBottom: 8,
    },
    signatureName: {
        fontSize: 14,
        fontWeight: '700',
    },
    dateSection: {
        flex: 1,
        alignItems: 'center',
    },
    dateLabel: {
        fontSize: 12,
        marginBottom: 8,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    certificateNumber: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
    },
    certNumberText: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    actionText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
        borderRadius: 20,
        marginTop: 40,
    },
    emptyStateText: {
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
});

