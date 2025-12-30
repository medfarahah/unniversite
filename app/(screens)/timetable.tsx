import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_TIMETABLE } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';

export default function TimetableScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const [activeDay, setActiveDay] = useState('Monday');

    const schedule = (MOCK_TIMETABLE as any)[activeDay] || [];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
                    {days.map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.tab,
                                { backgroundColor: activeDay === day ? colors.primary : colors.surface }
                            ]}
                            onPress={() => setActiveDay(day)}
                        >
                            <Text style={[
                                styles.tabText,
                                { color: activeDay === day ? '#FFF' : colors.textSecondary }
                            ]}>
                                {t(`timetable.${day.toLowerCase()}`)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.list}>
                {schedule.length > 0 ? schedule.map((item: any) => (
                    <View key={item.id} style={[styles.card, { backgroundColor: colors.surface }]}>
                        <View style={[styles.timeStrip, { backgroundColor: colors.primary }]} />
                        <View style={styles.cardContent}>
                            <Text style={[styles.subject, { color: colors.text }]}>{item.subject}</Text>
                            <View style={styles.detailRow}>
                                <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{item.time}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
                                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{item.room}</Text>
                            </View>
                        </View>
                    </View>
                )) : (
                    <View style={styles.empty}>
                        <Text style={{ color: colors.textSecondary }}>No classes scheduled</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        paddingVertical: 16,
        backgroundColor: 'transparent',
    },
    tabs: {
        paddingHorizontal: 20,
        gap: 12,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    tabText: {
        fontWeight: '700',
        fontSize: 14,
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    timeStrip: {
        width: 6,
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
    subject: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    detailText: {
        fontSize: 14,
    },
    empty: {
        alignItems: 'center',
        padding: 40,
    },
});
