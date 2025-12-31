import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_COURSES } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function CoursesScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const router = useRouter();
    const [filter, setFilter] = useState<'all' | 'enrolled' | 'completed'>('all');

    const isTeacher = user?.role === 'teacher';
    const isStudent = user?.role === 'student' || user?.role === 'delegate';

    // Filter courses based on role
    let filteredCourses = MOCK_COURSES;
    if (isTeacher) {
        // Teachers see courses they teach
        filteredCourses = MOCK_COURSES.filter(course => course.instructorId === user?.id);
    } else if (isStudent) {
        // Students see all courses, but we'll filter by enrollment status
        if (filter === 'enrolled') {
            filteredCourses = MOCK_COURSES.filter(course => course.enrolled);
        } else if (filter === 'completed') {
            filteredCourses = MOCK_COURSES.filter(course => course.status === 'Completed');
        }
    }

    const getGradeColor = (grade: string | null) => {
        if (!grade) return colors.textSecondary;
        const gradeValue = parseFloat(grade.split('/')[0]);
        if (gradeValue >= 16) return colors.success;
        if (gradeValue >= 14) return colors.primary;
        if (gradeValue >= 12) return colors.accent;
        if (gradeValue >= 10) return colors.accent;
        return colors.error;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress':
                return colors.primary;
            case 'Completed':
                return colors.success;
            case 'Upcoming':
                return colors.accent;
            default:
                return colors.textSecondary;
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                {/* Filter Buttons for Students */}
                {isStudent && (
                    <View style={styles.filterContainer}>
                        <TouchableOpacity
                            style={[
                                styles.filterBtn,
                                filter === 'all' && { backgroundColor: colors.primary },
                                filter !== 'all' && { backgroundColor: colors.surface, borderColor: colors.border },
                            ]}
                            onPress={() => setFilter('all')}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filter === 'all' && { color: '#FFF' },
                                    filter !== 'all' && { color: colors.text },
                                ]}
                            >
                                {t('courses.all')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterBtn,
                                filter === 'enrolled' && { backgroundColor: colors.primary },
                                filter !== 'enrolled' && { backgroundColor: colors.surface, borderColor: colors.border },
                            ]}
                            onPress={() => setFilter('enrolled')}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filter === 'enrolled' && { color: '#FFF' },
                                    filter !== 'enrolled' && { color: colors.text },
                                ]}
                            >
                                {t('courses.enrolled')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterBtn,
                                filter === 'completed' && { backgroundColor: colors.primary },
                                filter !== 'completed' && { backgroundColor: colors.surface, borderColor: colors.border },
                            ]}
                            onPress={() => setFilter('completed')}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filter === 'completed' && { color: '#FFF' },
                                    filter !== 'completed' && { color: colors.text },
                                ]}
                            >
                                {t('courses.completed')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {isTeacher ? t('courses.myCourses') : t('courses.title')}
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        {filteredCourses.length} {t('courses.coursesFound')}
                    </Text>
                </View>

                {/* Courses List */}
                {filteredCourses.length === 0 ? (
                    <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
                        <Ionicons name="book-outline" size={64} color={colors.textSecondary} />
                        <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                            {t('courses.noCourses')}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.coursesList}>
                        {filteredCourses.map((course) => (
                            <TouchableOpacity
                                key={course.id}
                                style={[styles.courseCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                                activeOpacity={0.7}
                                onPress={() => router.push(`/(screens)/course-detail?courseId=${course.id}`)}
                            >
                                <View style={styles.courseHeader}>
                                    <View style={styles.courseHeaderLeft}>
                                        <View style={[styles.courseCodeBadge, { backgroundColor: colors.primary + '15' }]}>
                                            <Text style={[styles.courseCode, { color: colors.primary }]}>
                                                {course.code}
                                            </Text>
                                        </View>
                                        <View style={styles.courseTitleSection}>
                                            <Text style={[styles.courseName, { color: colors.text }]}>
                                                {course.name}
                                            </Text>
                                            <Text style={[styles.courseCredits, { color: colors.textSecondary }]}>
                                                {course.credits} {t('courses.credits')} • {course.semester}
                                            </Text>
                                        </View>
                                    </View>
                                    {course.grade && (
                                        <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(course.grade) + '15' }]}>
                                            <Text style={[styles.gradeText, { color: getGradeColor(course.grade) }]}>
                                                {course.grade}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(course.status) + '15' }]}>
                                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(course.status) }]} />
                                    <Text style={[styles.statusText, { color: getStatusColor(course.status) }]}>
                                        {course.status}
                                    </Text>
                                </View>

                                <View style={styles.courseInfo}>
                                    <View style={styles.infoRow}>
                                        <Ionicons name="person-outline" size={16} color={colors.textSecondary} />
                                        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                                            {course.instructor}
                                        </Text>
                                    </View>
                                    {course.schedule && course.schedule.length > 0 && (
                                        <View style={styles.infoRow}>
                                            <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                                            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                                                {course.schedule[0].day} {course.schedule[0].time}
                                            </Text>
                                        </View>
                                    )}
                                    {course.schedule && course.schedule.length > 0 && (
                                        <View style={styles.infoRow}>
                                            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
                                            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                                                {course.schedule[0].room}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {course.schedule && course.schedule.length > 1 && (
                                    <View style={[styles.scheduleSection, { borderTopColor: colors.border }]}>
                                        <Text style={[styles.scheduleTitle, { color: colors.textSecondary }]}>
                                            {t('courses.fullSchedule')}:
                                        </Text>
                                        {course.schedule.map((schedule, index) => (
                                            <View key={index} style={styles.scheduleRow}>
                                                <Text style={[styles.scheduleText, { color: colors.text }]}>
                                                    {schedule.day} {schedule.time} - {schedule.room}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
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
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
    },
    coursesList: {
        gap: 16,
    },
    courseCard: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    courseHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    courseCodeBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    courseCode: {
        fontSize: 12,
        fontWeight: '700',
    },
    courseTitleSection: {
        flex: 1,
    },
    courseName: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    courseCredits: {
        fontSize: 13,
    },
    gradeBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    gradeText: {
        fontSize: 14,
        fontWeight: '700',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 16,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    courseInfo: {
        gap: 8,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 14,
    },
    scheduleSection: {
        paddingTop: 12,
        marginTop: 12,
        borderTopWidth: 1,
    },
    scheduleTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
    },
    scheduleRow: {
        marginBottom: 4,
    },
    scheduleText: {
        fontSize: 13,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
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

