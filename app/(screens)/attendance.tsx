import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_STUDENTS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function AttendanceScreen() {
    const { colors } = useTheme();
    const { user } = useUser();
    const [attendanceList, setAttendanceList] = useState(
        MOCK_STUDENTS.map(s => ({ ...s, present: true }))
    );

    const toggleAttendance = (id: string) => {
        setAttendanceList(prev => prev.map(s =>
            s.id === id ? { ...s, present: !s.present } : s
        ));
    };

    const submitAttendance = () => {
        Alert.alert("Success", "Attendance for today has been recorded.");
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
                    <Text style={styles.submitBtnText}>Submit Records</Text>
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
