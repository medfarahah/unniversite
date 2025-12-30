import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_ANNOUNCEMENTS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const router = useRouter();

    const isAdmin = user?.role === 'admin';
    const isDelegate = user?.role === 'delegate';
    const isStudent = user?.role === 'student';

    const QuickAction = ({ title, icon: IconName, color, route }: any) => (
        <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.surface }]}
            onPress={() => router.push(route)}
        >
            <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
                <Ionicons name={IconName} color={color} size={28} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: isAdmin ? colors.accent : (isDelegate ? colors.success : colors.primary) }]}>
                <View>
                    <Text style={styles.greeting}>{t('home.greeting', { name: user?.name.split(' ')[0] })}</Text>
                    <Text style={styles.department}>
                        {user?.title} • {user?.id}
                    </Text>
                    {!isAdmin && <Text style={styles.subDept}>{user?.department}</Text>}
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                    {isAdmin ? <Ionicons name="shield-checkmark" color="#FFF" size={24} /> : <Ionicons name="notifications" color="#FFF" size={24} />}
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    {isDelegate ? "Management Tools" : t('home.quickAccess')}
                </Text>
                <View style={styles.actionsGrid}>
                    {isStudent && (
                        <>
                            <QuickAction
                                title={t('tabs.timetable')}
                                icon="calendar"
                                color="#3B82F6"
                                route="/(screens)/timetable"
                            />
                            <QuickAction
                                title={t('tabs.grades')}
                                icon="school"
                                color="#F59E0B"
                                route="/(screens)/grades"
                            />
                        </>
                    )}

                    {isDelegate && (
                        <>
                            <QuickAction
                                title="Manage Schedule"
                                icon="calendar"
                                color="#3B82F6"
                                route="/(screens)/timetable"
                            />
                            <QuickAction
                                title="Update Grades"
                                icon="create"
                                color="#F59E0B"
                                route="/(screens)/grades"
                            />
                            <QuickAction
                                title="Attendance"
                                icon="list"
                                color="#8B5CF6"
                                route="/(tabs)/home"
                            />
                        </>
                    )}

                    <QuickAction
                        title={t('tabs.announcements')}
                        icon="megaphone"
                        color="#EC4899"
                        route="/(tabs)/announcements"
                    />
                    <QuickAction
                        title={t('tabs.groups')}
                        icon="chatbubbles"
                        color="#10B981"
                        route="/(tabs)/groups"
                    />
                </View>

                <View style={styles.recentHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('home.recentAnnouncements')}</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/announcements')}>
                        <Text style={{ color: colors.primary }}>{t('home.viewAll')}</Text>
                    </TouchableOpacity>
                </View>

                {MOCK_ANNOUNCEMENTS.slice(0, 2).map((ann) => (
                    <View key={ann.id} style={[styles.annCard, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.annTitle, { color: colors.text }]}>{ann.title}</Text>
                        <Text style={[styles.annContent, { color: colors.textSecondary }]} numberOfLines={2}>
                            {ann.content}
                        </Text>
                        <View style={styles.annFooter}>
                            <Text style={[styles.annAuthor, { color: isDelegate ? colors.success : colors.primary }]}>{ann.author}</Text>
                            <Text style={[styles.annDate, { color: colors.textSecondary }]}>{ann.date}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingTop: 40,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFF',
    },
    department: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '700',
        marginTop: 4,
    },
    subDept: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
    },
    notificationBtn: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    actionCard: {
        width: (width - 52) / 2,
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    annCard: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    annTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    annContent: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    annFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    annAuthor: {
        fontSize: 12,
        fontWeight: '600',
    },
    annDate: {
        fontSize: 12,
    },
});
