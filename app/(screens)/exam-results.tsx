import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_EXAM_RESULTS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';

export default function ExamResultsScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'passed' | 'failed'>('all');

    const filteredResults = selectedFilter === 'all'
        ? MOCK_EXAM_RESULTS
        : MOCK_EXAM_RESULTS.filter(result => result.status === selectedFilter);

    const passedExams = MOCK_EXAM_RESULTS.filter(result => result.status === 'passed');
    const averageScore = MOCK_EXAM_RESULTS.reduce((sum, result) => sum + result.score, 0) / MOCK_EXAM_RESULTS.length;

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return colors.success;
        if (grade.startsWith('B')) return colors.primary;
        if (grade.startsWith('C')) return colors.accent;
        return colors.error;
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
                <View>
                    <Text style={styles.summaryTitle}>{t('examResults.title')}</Text>
                    <Text style={styles.summaryLabel}>{t('examResults.averageScore')}</Text>
                    <Text style={styles.summaryValue}>{averageScore.toFixed(1)}%</Text>
                </View>
                <Ionicons name="trophy-outline" color="rgba(255,255,255,0.3)" size={80} style={styles.bgIcon} />
            </View>

            <View style={styles.statsSection}>
                <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                    <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                    <Text style={[styles.statValue, { color: colors.text }]}>{passedExams.length}</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('examResults.passed')}</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                    <Ionicons name="document-text" size={24} color={colors.primary} />
                    <Text style={[styles.statValue, { color: colors.text }]}>{MOCK_EXAM_RESULTS.length}</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('examResults.totalExams')}</Text>
                </View>
            </View>

            <View style={styles.filterSection}>
                <View style={styles.filterButtons}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor: selectedFilter === 'all' ? colors.primary + '20' : colors.surface,
                                borderColor: selectedFilter === 'all' ? colors.primary : colors.border,
                            }
                        ]}
                        onPress={() => setSelectedFilter('all')}
                    >
                        <Text style={[styles.filterText, { color: selectedFilter === 'all' ? colors.primary : colors.text }]}>
                            {t('examResults.all')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor: selectedFilter === 'passed' ? colors.success + '20' : colors.surface,
                                borderColor: selectedFilter === 'passed' ? colors.success : colors.border,
                            }
                        ]}
                        onPress={() => setSelectedFilter('passed')}
                    >
                        <Text style={[styles.filterText, { color: selectedFilter === 'passed' ? colors.success : colors.text }]}>
                            {t('examResults.passed')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor: selectedFilter === 'failed' ? colors.error + '20' : colors.surface,
                                borderColor: selectedFilter === 'failed' ? colors.error : colors.border,
                            }
                        ]}
                        onPress={() => setSelectedFilter('failed')}
                    >
                        <Text style={[styles.filterText, { color: selectedFilter === 'failed' ? colors.error : colors.text }]}>
                            {t('examResults.failed')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.resultsSection}>
                {filteredResults.length === 0 ? (
                    <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
                        <Ionicons name="document-outline" size={48} color={colors.textSecondary} />
                        <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                            {t('examResults.noResults')}
                        </Text>
                    </View>
                ) : (
                    filteredResults.map((result) => (
                        <View key={result.id} style={[styles.resultCard, { backgroundColor: colors.surface }]}>
                            <View style={styles.resultHeader}>
                                <View style={styles.resultHeaderLeft}>
                                    <View style={[styles.examTypeBadge, { backgroundColor: colors.primary + '15' }]}>
                                        <Text style={[styles.examTypeText, { color: colors.primary }]}>
                                            {result.examType}
                                        </Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: result.status === 'passed' ? colors.success + '15' : colors.error + '15' }]}>
                                        <Ionicons 
                                            name={result.status === 'passed' ? 'checkmark-circle' : 'close-circle'} 
                                            size={16} 
                                            color={result.status === 'passed' ? colors.success : colors.error} 
                                        />
                                        <Text style={[styles.statusText, { color: result.status === 'passed' ? colors.success : colors.error }]}>
                                            {result.status === 'passed' ? t('examResults.passed') : t('examResults.failed')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={[styles.courseName, { color: colors.text }]}>{result.course}</Text>
                            <View style={styles.resultDetails}>
                                <View style={styles.scoreRow}>
                                    <View style={styles.scoreContainer}>
                                        <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>{t('examResults.score')}</Text>
                                        <Text style={[styles.scoreValue, { color: colors.text }]}>
                                            {result.score} / {result.maxScore}
                                        </Text>
                                    </View>
                                    <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(result.grade) + '15' }]}>
                                        <Text style={[styles.gradeText, { color: getGradeColor(result.grade) }]}>
                                            {result.grade}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.dateRow}>
                                    <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                                    <Text style={[styles.dateText, { color: colors.textSecondary }]}>{result.date}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
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
    statsSection: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
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
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    filterSection: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    filterButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
    },
    resultsSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    resultCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    resultHeaderLeft: {
        flexDirection: 'row',
        gap: 8,
    },
    examTypeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    examTypeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    courseName: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    resultDetails: {
        gap: 12,
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scoreContainer: {
        flex: 1,
    },
    scoreLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 20,
        fontWeight: '700',
    },
    gradeBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    gradeText: {
        fontSize: 18,
        fontWeight: '800',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateText: {
        fontSize: 14,
    },
    emptyState: {
        padding: 40,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    emptyStateText: {
        marginTop: 12,
        fontSize: 16,
    },
});

