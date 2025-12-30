import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_ACADEMIC_STATUS, MOCK_ANNOUNCEMENTS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const router = useRouter();

    const isAdmin = user?.role === 'admin';
    const isTeacher = user?.role === 'teacher';
    const isDelegate = user?.role === 'delegate';
    const isStudent = user?.role === 'student' || isDelegate;

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: isAdmin ? colors.accent : (isTeacher ? colors.success : colors.primary) }]}>
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
                {/* Profile Card Section */}
                {isStudent && (
                    <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
                        <View style={styles.profileHeader}>
                            <View style={[styles.avatarContainer, { borderColor: colors.primary }]}>
                                <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=' + user?.id }}
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={[styles.profileName, { color: colors.text }]}>{user?.name}</Text>
                                <Text style={[styles.profileClass, { color: colors.textSecondary }]}>
                                    {user?.level} • {user?.department}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.gradesContainer, { borderTopColor: colors.border }]}>
                            <View style={styles.gradeItem}>
                                <View style={[styles.gradeIcon, { backgroundColor: colors.primary + '15' }]}>
                                    <Ionicons name="trophy-outline" size={24} color={colors.primary} />
                                </View>
                                <View style={styles.gradeInfo}>
                                    <Text style={[styles.gradeLabel, { color: colors.textSecondary }]}>GPA</Text>
                                    <Text style={[styles.gradeValue, { color: colors.text }]}>
                                        {MOCK_ACADEMIC_STATUS.gpa}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.gradeDivider, { backgroundColor: colors.border }]} />
                            <View style={styles.gradeItem}>
                                <View style={[styles.gradeIcon, { backgroundColor: colors.accent + '15' }]}>
                                    <Ionicons name="star-outline" size={24} color={colors.accent} />
                                </View>
                                <View style={styles.gradeInfo}>
                                    <Text style={[styles.gradeLabel, { color: colors.textSecondary }]}>CGPA</Text>
                                    <Text style={[styles.gradeValue, { color: colors.text }]}>
                                        {MOCK_ACADEMIC_STATUS.cgpa}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {!isStudent && (
                    <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
                        <View style={styles.profileHeader}>
                            <View style={[styles.avatarContainer, { borderColor: colors.primary }]}>
                                <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=' + user?.id }}
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={[styles.profileName, { color: colors.text }]}>{user?.name}</Text>
                                <Text style={[styles.profileClass, { color: colors.textSecondary }]}>
                                    {user?.title} • {user?.department || user?.staffId}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Quick Menu Section */}
                <View style={styles.quickMenuSection}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('home.quickAccess')}</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.quickMenuScrollContent}
                        style={styles.quickMenuScroll}
                    >
                        {isStudent && (
                            <>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/timetable')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#3B82F6' + '15' }]}>
                                        <Ionicons name="calendar" size={24} color="#3B82F6" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>{t('tabs.timetable')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/grades')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#F59E0B' + '15' }]}>
                                        <Ionicons name="school" size={24} color="#F59E0B" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>{t('tabs.grades')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/(screens)/exam-calendar')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#EC4899' + '15' }]}>
                                        <Ionicons name="calendar-outline" size={24} color="#EC4899" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>Exam Calendar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/(screens)/exam-results')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#F59E0B' + '15' }]}>
                                        <Ionicons name="trophy" size={24} color="#F59E0B" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>Exam Results</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {isTeacher && (
                            <>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/grades')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#F59E0B' + '15' }]}>
                                        <Ionicons name="create" size={24} color="#F59E0B" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>Manage Grades</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/timetable')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#3B82F6' + '15' }]}>
                                        <Ionicons name="calendar" size={24} color="#3B82F6" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>Schedule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/(screens)/attendance')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#22C55E' + '15' }]}>
                                        <Ionicons name="list" size={24} color="#22C55E" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>Attendance</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                                    onPress={() => router.push('/(screens)/resources')}
                                >
                                    <View style={[styles.quickMenuIcon, { backgroundColor: '#8B5CF6' + '15' }]}>
                                        <Ionicons name="document-text" size={24} color="#8B5CF6" />
                                    </View>
                                    <Text style={[styles.quickMenuText, { color: colors.text }]}>Resources</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        <TouchableOpacity
                            style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                            onPress={() => router.push('/announcements')}
                        >
                            <View style={[styles.quickMenuIcon, { backgroundColor: '#EC4899' + '15' }]}>
                                <Ionicons name="megaphone" size={24} color="#EC4899" />
                            </View>
                            <Text style={[styles.quickMenuText, { color: colors.text }]}>{t('tabs.announcements')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                            onPress={() => router.push('/groups')}
                        >
                            <View style={[styles.quickMenuIcon, { backgroundColor: '#10B981' + '15' }]}>
                                <Ionicons name="chatbubbles" size={24} color="#10B981" />
                            </View>
                            <Text style={[styles.quickMenuText, { color: colors.text }]}>{t('tabs.groups')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.quickMenuItem, { backgroundColor: colors.surface }]}
                            onPress={() => router.push('/menu')}
                        >
                            <View style={[styles.quickMenuIcon, { backgroundColor: colors.primary + '15' }]}>
                                <Ionicons name="apps" size={24} color={colors.primary} />
                            </View>
                            <Text style={[styles.quickMenuText, { color: colors.text }]}>{t('tabs.menu')}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.recentHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('home.recentAnnouncements')}</Text>
                    <TouchableOpacity onPress={() => router.push('/announcements')}>
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
                            <Text style={[styles.annAuthor, { color: ann.isGlobal ? colors.primary : (ann.author.includes('Delegate') ? colors.accent : colors.success) }]}>{ann.author}</Text>
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
    profileCard: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        padding: 3,
        marginRight: 16,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 37,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    profileClass: {
        fontSize: 14,
    },
    gradesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        borderTopWidth: 1,
    },
    gradeItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gradeIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    gradeInfo: {
        flex: 1,
    },
    gradeLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    gradeValue: {
        fontSize: 24,
        fontWeight: '800',
    },
    gradeDivider: {
        width: 1,
        height: 60,
        marginHorizontal: 16,
    },
    quickMenuSection: {
        marginBottom: 24,
    },
    quickMenuScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    quickMenuScrollContent: {
        paddingRight: 20,
        gap: 12,
    },
    quickMenuItem: {
        width: 100,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    quickMenuIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickMenuText: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
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
