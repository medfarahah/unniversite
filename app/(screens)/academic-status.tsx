import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MOCK_ACADEMIC_STATUS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function AcademicStatusScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { user } = useUser();
    const router = useRouter();
    const status = MOCK_ACADEMIC_STATUS;

    useEffect(() => {
        // Only students and delegates can access academic status
        if (user?.role === 'teacher' || user?.role === 'admin') {
            Alert.alert(
                t('academicStatus.accessDenied'),
                t('academicStatus.teacherAccessDenied'),
                [{ text: 'OK', onPress: () => router.back() }]
            );
        }
    }, [user]);

    // Don't render if user is not a student
    if (user?.role === 'teacher' || user?.role === 'admin') {
        return null;
    }

    const getStatusColor = (standing: string) => {
        if (standing.includes('Good')) return colors.success;
        if (standing.includes('Warning')) return colors.accent;
        return colors.error;
    };

    const progressPercentage = (status.completedCredits / status.totalCredits) * 100;

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
                <View>
                    <Text style={styles.summaryTitle}>{t('academicStatus.title')}</Text>
                    <Text style={styles.summaryLabel}>{t('academicStatus.currentSemester')}</Text>
                    <Text style={styles.summaryValue}>{status.currentSemester}</Text>
                </View>
                <Ionicons name="school-outline" color="rgba(255,255,255,0.3)" size={80} style={styles.bgIcon} />
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('academicStatus.studentInfo')}</Text>
                <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('academicStatus.studentId')}</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>{status.studentId}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('academicStatus.name')}</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>{status.name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('academicStatus.department')}</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>{status.department}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('academicStatus.level')}</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>{status.level}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('academicStatus.academicProgress')}</Text>
                <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
                    <View style={styles.progressHeader}>
                        <Text style={[styles.progressLabel, { color: colors.text }]}>{t('academicStatus.creditsProgress')}</Text>
                        <Text style={[styles.progressPercentage, { color: colors.primary }]}>
                            {status.completedCredits} / {status.totalCredits}
                        </Text>
                    </View>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                        <View 
                            style={[
                                styles.progressFill, 
                                { 
                                    width: `${progressPercentage}%`, 
                                    backgroundColor: colors.primary 
                                }
                            ]} 
                        />
                    </View>
                    <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                        {progressPercentage.toFixed(1)}% {t('academicStatus.completed')}
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('academicStatus.grades')}</Text>
                <View style={styles.gradesGrid}>
                    <View style={[styles.gradeCard, { backgroundColor: colors.surface }]}>
                        <Ionicons name="trophy-outline" size={24} color={colors.primary} />
                        <Text style={[styles.gradeLabel, { color: colors.textSecondary }]}>{t('academicStatus.gpa')}</Text>
                        <Text style={[styles.gradeValue, { color: colors.primary }]}>{status.gpa}</Text>
                    </View>
                    <View style={[styles.gradeCard, { backgroundColor: colors.surface }]}>
                        <Ionicons name="star-outline" size={24} color={colors.accent} />
                        <Text style={[styles.gradeLabel, { color: colors.textSecondary }]}>{t('academicStatus.cgpa')}</Text>
                        <Text style={[styles.gradeValue, { color: colors.accent }]}>{status.cgpa}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('academicStatus.academicStanding')}</Text>
                <View style={[styles.standingCard, { backgroundColor: colors.surface }]}>
                    <View style={[styles.standingBadge, { backgroundColor: getStatusColor(status.academicStanding) + '15' }]}>
                        <Ionicons name="checkmark-circle" size={24} color={getStatusColor(status.academicStanding)} />
                        <Text style={[styles.standingText, { color: getStatusColor(status.academicStanding) }]}>
                            {status.academicStanding}
                        </Text>
                    </View>
                    <View style={styles.standingDetails}>
                        <View style={styles.standingRow}>
                            <Text style={[styles.standingLabel, { color: colors.textSecondary }]}>{t('academicStatus.status')}</Text>
                            <Text style={[styles.standingValue, { color: colors.text }]}>{status.status}</Text>
                        </View>
                        <View style={styles.standingRow}>
                            <Text style={[styles.standingLabel, { color: colors.textSecondary }]}>{t('academicStatus.warnings')}</Text>
                            <Text style={[styles.standingValue, { color: colors.text }]}>{status.warnings}</Text>
                        </View>
                        <View style={styles.standingRow}>
                            <Text style={[styles.standingLabel, { color: colors.textSecondary }]}>{t('academicStatus.probation')}</Text>
                            <Text style={[styles.standingValue, { color: status.probation ? colors.error : colors.success }]}>
                                {status.probation ? t('academicStatus.yes') : t('academicStatus.no')}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('academicStatus.enrollmentInfo')}</Text>
                <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('academicStatus.enrollmentDate')}</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>{status.enrollmentDate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('academicStatus.expectedGraduation')}</Text>
                        <Text style={[styles.infoValue, { color: colors.text }]}>{status.expectedGraduation}</Text>
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
    summaryCard: {
        margin: 20,
        padding: 24,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    summaryTitle: {
        color: '#FFF',
        fontSize: 16,
        opacity: 0.8,
        marginBottom: 12,
    },
    summaryLabel: {
        color: '#FFF',
        fontSize: 14,
        opacity: 0.7,
    },
    summaryValue: {
        color: '#FFF',
        fontSize: 48,
        fontWeight: '800',
    },
    bgIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    infoCard: {
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    infoLabel: {
        fontSize: 14,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    progressCard: {
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    progressPercentage: {
        fontSize: 16,
        fontWeight: '700',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
    },
    gradesGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    gradeCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    gradeLabel: {
        fontSize: 12,
        marginTop: 8,
        marginBottom: 4,
    },
    gradeValue: {
        fontSize: 24,
        fontWeight: '800',
    },
    standingCard: {
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    standingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        gap: 8,
    },
    standingText: {
        fontSize: 16,
        fontWeight: '700',
    },
    standingDetails: {
        gap: 12,
    },
    standingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    standingLabel: {
        fontSize: 14,
    },
    standingValue: {
        fontSize: 14,
        fontWeight: '600',
    },
});

