import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_GRADES } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';

export default function GradesScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [selectedSemester, setSelectedSemester] = useState(MOCK_GRADES[0]);

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
                <View>
                    <Text style={styles.semesterTitle}>{selectedSemester.semester}</Text>
                    <Text style={styles.gpaLabel}>{t('grades.gpa')}</Text>
                    <Text style={styles.gpaValue}>{selectedSemester.gpa}</Text>
                </View>
                <Ionicons name="medal-outline" color="rgba(255,255,255,0.3)" size={80} style={styles.bgIcon} />
            </View>

            <View style={styles.selectorSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('grades.semester')}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selector}>
                    {MOCK_GRADES.map((sem) => (
                        <TouchableOpacity
                            key={sem.id}
                            style={[
                                styles.semBtn,
                                {
                                    backgroundColor: selectedSemester.id === sem.id ? colors.primary + '20' : colors.surface,
                                    borderColor: selectedSemester.id === sem.id ? colors.primary : colors.border
                                }
                            ]}
                            onPress={() => setSelectedSemester(sem)}
                        >
                            <Text style={[
                                styles.semBtnText,
                                { color: selectedSemester.id === sem.id ? colors.primary : colors.text }
                            ]}>
                                {sem.semester}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.coursesSection}>
                <View style={styles.courseHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('grades.title')}</Text>
                    <Text style={{ color: colors.textSecondary }}>{selectedSemester.courses.length} Courses</Text>
                </View>

                {selectedSemester.courses.map((course, idx) => (
                    <View key={idx} style={[styles.courseCard, { backgroundColor: colors.surface }]}>
                        <View style={styles.courseInfo}>
                            <Text style={[styles.courseName, { color: colors.text }]}>{course.name}</Text>
                            <Text style={[styles.courseCredits, { color: colors.textSecondary }]}>{course.credits} {t('grades.credits')}</Text>
                        </View>
                        <View style={[styles.gradeBadge, { backgroundColor: colors.primary + '15' }]}>
                            <Text style={[styles.gradeText, { color: colors.primary }]}>{course.grade}</Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={[styles.lmsGuide, { backgroundColor: colors.surface }]}>
                <View style={styles.lmsHeader}>
                    <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
                    <Text style={[styles.lmsTitle, { color: colors.text }]}>{t('grades.lmsGuideTitle')}</Text>
                </View>
                <View style={styles.lmsSteps}>
                    <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep1')}</Text>
                    <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep2')}</Text>
                    <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep3')}</Text>
                    <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep4')}</Text>
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
    semesterTitle: {
        color: '#FFF',
        fontSize: 16,
        opacity: 0.8,
        marginBottom: 12,
    },
    gpaLabel: {
        color: '#FFF',
        fontSize: 14,
        opacity: 0.7,
    },
    gpaValue: {
        color: '#FFF',
        fontSize: 48,
        fontWeight: '800',
    },
    bgIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    selectorSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    selector: {
        flexDirection: 'row',
    },
    semBtn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 10,
    },
    semBtnText: {
        fontWeight: '600',
    },
    coursesSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    courseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    courseInfo: {
        flex: 1,
    },
    courseName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    courseCredits: {
        fontSize: 12,
    },
    gradeBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradeText: {
        fontSize: 18,
        fontWeight: '800',
    },
    lmsGuide: {
        margin: 20,
        marginTop: 0,
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 40,
    },
    lmsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    lmsTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    lmsSteps: {
        gap: 12,
    },
    lmsStep: {
        fontSize: 14,
        lineHeight: 20,
    },
});
