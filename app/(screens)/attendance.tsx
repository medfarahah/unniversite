import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_STUDENT_ATTENDANCE, MOCK_STUDENTS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function AttendanceScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { user } = useUser();
    const [attendanceList, setAttendanceList] = useState(
        MOCK_STUDENTS.map(s => ({ ...s, present: true }))
    );

    const isTeacher = user?.role === 'teacher';
    const isStudent = user?.role === 'student' || user?.role === 'delegate';

    const toggleAttendance = (id: string) => {
        setAttendanceList(prev => prev.map(s =>
            s.id === id ? { ...s, present: !s.present } : s
        ));
    };

    const submitAttendance = () => {
        Alert.alert("Success", "Attendance for today has been recorded.");
    };

    const getAttendanceColor = (rate: number) => {
        if (rate >= 90) return colors.success;
        if (rate >= 75) return colors.accent;
        return colors.error;
    };

    const renderStudent = ({ item }: { item: any }) => (
        <View style={[styles.studentCard, { backgroundColor: colors.surface }]}>
            <View style={styles.studentInfo}>
                <Text style={[styles.studentName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.studentId, { color: colors.textSecondary }]}>ID: {item.id}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.statusBtn,
                    { backgroundColor: item.present ? colors.success + '20' : colors.error + '20' }
                ]}
                onPress={() => toggleAttendance(item.id)}
            >
                <Ionicons
                    name={item.present ? "checkmark-circle" : "close-circle"}
                    size={24}
                    color={item.present ? colors.success : colors.error}
                />
                <Text style={[
                    styles.statusText,
                    { color: item.present ? colors.success : colors.error }
                ]}>
                    {item.present ? "Present" : "Absent"}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderCourseAttendance = ({ item }: { item: typeof MOCK_STUDENT_ATTENDANCE[0] }) => {
        const attendanceColor = getAttendanceColor(item.attendanceRate);
        return (
            <View style={[styles.courseCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={styles.courseHeader}>
                    <View style={[styles.courseCodeBadge, { backgroundColor: colors.primary + '15' }]}>
                        <Text style={[styles.courseCode, { color: colors.primary }]}>{item.courseCode}</Text>
                    </View>
                    <View style={styles.courseInfo}>
                        <Text style={[styles.courseName, { color: colors.text }]}>{item.courseName}</Text>
                        <Text style={[styles.instructorName, { color: colors.textSecondary }]}>
                            {item.instructor}
                        </Text>
                    </View>
                </View>
                
                <View style={styles.attendanceStats}>
                    <View style={styles.statItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                        <View style={styles.statContent}>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                {t('attendance.present')}
                            </Text>
                            <Text style={[styles.statValue, { color: colors.text }]}>
                                {item.present}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="close-circle" size={20} color={colors.error} />
                        <View style={styles.statContent}>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                {t('attendance.absent')}
                            </Text>
                            <Text style={[styles.statValue, { color: colors.text }]}>
                                {item.absent}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="calendar" size={20} color={colors.primary} />
                        <View style={styles.statContent}>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                {t('attendance.total')}
                            </Text>
                            <Text style={[styles.statValue, { color: colors.text }]}>
                                {item.totalClasses}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.attendanceRateBar, { backgroundColor: colors.background }]}>
                    <View style={[styles.attendanceRateFill, { 
                        width: `${item.attendanceRate}%`,
                        backgroundColor: attendanceColor 
                    }]} />
                    <Text style={[styles.attendanceRateText, { color: colors.text }]}>
                        {item.attendanceRate.toFixed(1)}%
                    </Text>
                </View>
            </View>
        );
    };

    // Student View - Show course attendance
    if (isStudent) {
        return (
            <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={[styles.header, { backgroundColor: colors.primary }]}>
                    <Text style={styles.headerTitle}>{t('attendance.myAttendance')}</Text>
                    <Text style={styles.headerSubtitle}>{user?.name}</Text>
                </View>

                <View style={styles.content}>
                    <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.summaryTitle, { color: colors.text }]}>
                            {t('attendance.summary')}
                        </Text>
                        <View style={styles.summaryStats}>
                            <View style={styles.summaryItem}>
                                <Text style={[styles.summaryValue, { color: colors.text }]}>
                                    {MOCK_STUDENT_ATTENDANCE.reduce((sum, course) => sum + course.absent, 0)}
                                </Text>
                                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                                    {t('attendance.totalAbsences')}
                                </Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={[styles.summaryValue, { color: colors.text }]}>
                                    {MOCK_STUDENT_ATTENDANCE.length}
                                </Text>
                                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                                    {t('attendance.courses')}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        {t('attendance.byCourse')}
                    </Text>

                    <FlatList
                        data={MOCK_STUDENT_ATTENDANCE}
                        renderItem={renderCourseAttendance}
                        keyExtractor={item => item.courseId}
                        scrollEnabled={false}
                        contentContainerStyle={styles.coursesList}
                    />
                </View>
            </ScrollView>
        );
    }

    // Teacher View - Mark attendance for students
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.success }]}>
                <Text style={styles.headerTitle}>{user?.department}</Text>
                <Text style={styles.headerSubtitle}>Attendance - {new Date().toLocaleDateString()}</Text>
            </View>

            <FlatList
                data={attendanceList}
                renderItem={renderStudent}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />

            <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
                <TouchableOpacity
                    style={[styles.submitBtn, { backgroundColor: colors.success }]}
                    onPress={submitAttendance}
                >
                    <Text style={styles.submitBtnText}>{t('attendance.submitRecords')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingTop: 40,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginTop: 4,
    },
    content: {
        padding: 20,
    },
    summaryCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 16,
    },
    summaryStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 16,
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
        alignItems: 'center',
        marginBottom: 16,
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
    courseInfo: {
        flex: 1,
    },
    courseName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    instructorName: {
        fontSize: 13,
    },
    attendanceStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statContent: {
        alignItems: 'flex-start',
    },
    statLabel: {
        fontSize: 11,
        marginBottom: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    attendanceRateBar: {
        height: 32,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    attendanceRateFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        borderRadius: 16,
    },
    attendanceRateText: {
        fontSize: 13,
        fontWeight: '700',
        zIndex: 1,
    },
    list: {
        padding: 16,
    },
    studentCard: {
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
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    studentId: {
        fontSize: 12,
    },
    statusBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        minWidth: 100,
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 13,
        fontWeight: '700',
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
    },
    submitBtn: {
        height: 52,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    submitBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
