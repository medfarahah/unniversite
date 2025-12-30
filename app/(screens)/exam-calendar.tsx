import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_EXAM_CALENDAR } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';

export default function ExamCalendarScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

    const filteredExams = selectedFilter === 'all' 
        ? MOCK_EXAM_CALENDAR 
        : MOCK_EXAM_CALENDAR.filter(exam => exam.status === selectedFilter);

    const upcomingExams = MOCK_EXAM_CALENDAR.filter(exam => exam.status === 'upcoming');
    const completedExams = MOCK_EXAM_CALENDAR.filter(exam => exam.status === 'completed');

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
                <View>
                    <Text style={styles.summaryTitle}>{t('examCalendar.title')}</Text>
                    <Text style={styles.summaryLabel}>{t('examCalendar.upcomingExams')}</Text>
                    <Text style={styles.summaryValue}>{upcomingExams.length}</Text>
                </View>
                <Ionicons name="calendar-outline" color="rgba(255,255,255,0.3)" size={80} style={styles.bgIcon} />
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
                            {t('examCalendar.all')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor: selectedFilter === 'upcoming' ? colors.primary + '20' : colors.surface,
                                borderColor: selectedFilter === 'upcoming' ? colors.primary : colors.border,
                            }
                        ]}
                        onPress={() => setSelectedFilter('upcoming')}
                    >
                        <Text style={[styles.filterText, { color: selectedFilter === 'upcoming' ? colors.primary : colors.text }]}>
                            {t('examCalendar.upcoming')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor: selectedFilter === 'completed' ? colors.primary + '20' : colors.surface,
                                borderColor: selectedFilter === 'completed' ? colors.primary : colors.border,
                            }
                        ]}
                        onPress={() => setSelectedFilter('completed')}
                    >
                        <Text style={[styles.filterText, { color: selectedFilter === 'completed' ? colors.primary : colors.text }]}>
                            {t('examCalendar.completed')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.examsSection}>
                {filteredExams.length === 0 ? (
                    <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
                        <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
                        <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                            {t('examCalendar.noExams')}
                        </Text>
                    </View>
                ) : (
                    filteredExams.map((exam) => (
                        <View key={exam.id} style={[styles.examCard, { backgroundColor: colors.surface }]}>
                            <View style={styles.examHeader}>
                                <View style={styles.examHeaderLeft}>
                                    <View style={[styles.examTypeBadge, { backgroundColor: exam.status === 'upcoming' ? colors.primary + '15' : colors.success + '15' }]}>
                                        <Text style={[styles.examTypeText, { color: exam.status === 'upcoming' ? colors.primary : colors.success }]}>
                                            {exam.examType}
                                        </Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: exam.status === 'upcoming' ? colors.accent + '15' : colors.textSecondary + '15' }]}>
                                        <Text style={[styles.statusText, { color: exam.status === 'upcoming' ? colors.accent : colors.textSecondary }]}>
                                            {exam.status === 'upcoming' ? t('examCalendar.upcoming') : t('examCalendar.completed')}
                                        </Text>
                                    </View>
                                </View>
                                <Ionicons 
                                    name={exam.status === 'upcoming' ? 'time-outline' : 'checkmark-circle-outline'} 
                                    size={24} 
                                    color={exam.status === 'upcoming' ? colors.accent : colors.success} 
                                />
                            </View>
                            <Text style={[styles.courseName, { color: colors.text }]}>{exam.course}</Text>
                            <View style={styles.examDetails}>
                                <View style={styles.examDetailRow}>
                                    <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                                    <Text style={[styles.examDetailText, { color: colors.textSecondary }]}>{exam.date}</Text>
                                </View>
                                <View style={styles.examDetailRow}>
                                    <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                                    <Text style={[styles.examDetailText, { color: colors.textSecondary }]}>{exam.time}</Text>
                                </View>
                                <View style={styles.examDetailRow}>
                                    <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
                                    <Text style={[styles.examDetailText, { color: colors.textSecondary }]}>{exam.room}</Text>
                                </View>
                                <View style={styles.examDetailRow}>
                                    <Ionicons name="hourglass-outline" size={16} color={colors.textSecondary} />
                                    <Text style={[styles.examDetailText, { color: colors.textSecondary }]}>{exam.duration}</Text>
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
    examsSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    examCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    examHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    examHeaderLeft: {
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
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
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
    examDetails: {
        gap: 8,
    },
    examDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    examDetailText: {
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

