import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_TIMETABLE } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';

export default function TimetableScreen() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const [activeDay, setActiveDay] = useState('Sunday');

    const schedule = (MOCK_TIMETABLE as any)[activeDay] || [];

    const getDayAbbreviation = (day: string) => {
        const abbreviations: Record<string, string> = {
            'Sunday': 'Sun',
            'Monday': 'Mon',
            'Tuesday': 'Tue',
            'Wednesday': 'Wed',
            'Thursday': 'Thu',
        };
        return abbreviations[day] || day.substring(0, 3);
    };

    const getDayIcon = (day: string) => {
        const icons: Record<string, string> = {
            'Sunday': 'sunny',
            'Monday': 'calendar',
            'Tuesday': 'calendar',
            'Wednesday': 'calendar',
            'Thursday': 'calendar',
        };
        return icons[day] || 'calendar';
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.tabContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.tabs}
                >
                    {days.map((day) => {
                        const isActive = activeDay === day;
                        return (
                            <TouchableOpacity
                                key={day}
                                style={[
                                    styles.dayButton,
                                    { backgroundColor: colors.surface }
                                ]}
                                onPress={() => setActiveDay(day)}
                            >
                                <View style={[
                                    styles.dayIcon,
                                    { backgroundColor: isActive ? '#FF6B35' : '#2C3E50' }
                                ]}>
                                    <Ionicons 
                                        name={getDayIcon(day) as any} 
                                        size={20} 
                                        color="#FFF" 
                                    />
                                </View>
                                <Text style={[
                                    styles.dayAbbreviation,
                                    { color: colors.text }
                                ]}>
                                    {getDayAbbreviation(day)}
                                </Text>
                                {isActive && (
                                    <View style={[styles.activeIndicator, { backgroundColor: '#FF6B35' }]} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
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
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
    },
    tabs: {
        gap: 12,
        paddingHorizontal: 4,
    },
    dayButton: {
        width: 70,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    dayIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    dayAbbreviation: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 4,
    },
    activeIndicator: {
        width: 24,
        height: 3,
        borderRadius: 2,
        marginTop: 2,
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
