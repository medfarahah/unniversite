import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');

type ViewStyle = 'card' | 'line';

interface MenuItem {
    title: string;
    icon: string;
    color: string;
    route: string;
    category: string;
    role?: 'admin' | 'teacher' | 'student';
}

export default function MenuScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const router = useRouter();
    const [viewStyle, setViewStyle] = useState<ViewStyle>('card');

    const isAdmin = user?.role === 'admin';
    const isTeacher = user?.role === 'teacher';
    const isDelegate = user?.role === 'delegate';
    const isStudent = user?.role === 'student' || isDelegate;

    const allMenuItems: MenuItem[] = [
        // Admin - Full Management Access
        { title: 'User Management', icon: 'people', color: '#6366F1', route: '/(screens)/user-management', category: 'admin', role: 'admin' },
        { title: 'System Settings', icon: 'settings', color: '#6B7280', route: '/(screens)/system-settings', category: 'admin', role: 'admin' },
        { title: 'Reports & Analytics', icon: 'bar-chart', color: '#10B981', route: '/(screens)/reports', category: 'admin', role: 'admin' },
        { title: 'Manage All Courses', icon: 'book', color: '#8B5CF6', route: '/(screens)/courses', category: 'admin', role: 'admin' },
        { title: 'Manage All Announcements', icon: 'megaphone', color: '#EC4899', route: '/announcements', category: 'admin', role: 'admin' },
        { title: 'Manage All Grades', icon: 'create', color: '#F59E0B', route: '/grades', category: 'admin', role: 'admin' },
        { title: 'Manage Timetable', icon: 'calendar', color: '#3B82F6', route: '/timetable', category: 'admin', role: 'admin' },
        { title: 'Manage Attendance', icon: 'list', color: '#22C55E', route: '/(screens)/attendance', category: 'admin', role: 'admin' },
        { title: 'Manage Resources', icon: 'document-text', color: '#8B5CF6', route: '/(screens)/resources', category: 'admin', role: 'admin' },
        { title: 'Manage Exam Calendar', icon: 'calendar-outline', color: '#EC4899', route: '/(screens)/exam-calendar', category: 'admin', role: 'admin' },
        { title: 'Manage Exam Results', icon: 'trophy', color: '#F59E0B', route: '/(screens)/exam-results', category: 'admin', role: 'admin' },
        { title: 'View All Groups', icon: 'chatbubbles', color: '#10B981', route: '/groups', category: 'admin', role: 'admin' },
        
        // Teacher Only Features
        { title: 'Manage Grades', icon: 'create', color: '#F59E0B', route: '/grades', category: 'teacher', role: 'teacher' },
        { title: 'Course Schedule', icon: 'calendar', color: '#3B82F6', route: '/timetable', category: 'teacher', role: 'teacher' },
        { title: 'Attendance', icon: 'list', color: '#22C55E', route: '/(screens)/attendance', category: 'teacher', role: 'teacher' },
        { title: 'Resources', icon: 'document-text', color: '#8B5CF6', route: '/(screens)/resources', category: 'teacher', role: 'teacher' },
        { title: 'My Courses', icon: 'book', color: '#8B5CF6', route: '/(screens)/courses', category: 'teacher', role: 'teacher' },
        { title: t('tabs.announcements'), icon: 'megaphone', color: '#EC4899', route: '/announcements', category: 'teacher', role: 'teacher' },
        
        // Student Only Features
        { title: t('tabs.timetable'), icon: 'calendar', color: '#3B82F6', route: '/timetable', category: 'student', role: 'student' },
        { title: 'Courses', icon: 'book', color: '#8B5CF6', route: '/(screens)/courses', category: 'student', role: 'student' },
        { title: t('tabs.grades'), icon: 'school', color: '#F59E0B', route: '/grades', category: 'student', role: 'student' },
        { title: 'Exam Calendar', icon: 'calendar-outline', color: '#EC4899', route: '/(screens)/exam-calendar', category: 'student', role: 'student' },
        { title: 'Academic Status', icon: 'document-text', color: '#10B981', route: '/(screens)/academic-status', category: 'student', role: 'student' },
        { title: 'Exam Results', icon: 'trophy', color: '#F59E0B', route: '/(screens)/exam-results', category: 'student', role: 'student' },
        { title: 'Student Card', icon: 'card', color: '#6366F1', route: '/(screens)/student-card', category: 'student', role: 'student' },
        { title: 'Term Certificate', icon: 'ribbon', color: '#F59E0B', route: '/(screens)/term-certificate', category: 'student', role: 'student' },
        { title: 'Attendance', icon: 'checkmark-circle', color: '#22C55E', route: '/(screens)/attendance', category: 'student', role: 'student' },
        { title: 'Resources', icon: 'folder', color: '#8B5CF6', route: '/(screens)/resources', category: 'student', role: 'student' },
        { title: t('tabs.announcements'), icon: 'megaphone', color: '#EC4899', route: '/announcements', category: 'student', role: 'student' },
        { title: t('tabs.groups'), icon: 'chatbubbles', color: '#10B981', route: '/groups', category: 'student', role: 'student' },
        { title: 'Chat', icon: 'chatbubble', color: '#10B981', route: '/(screens)/chat', category: 'student', role: 'student' },
        
        // Common Features (Profile & Settings - available to all)
        { title: t('tabs.profile'), icon: 'person', color: '#6366F1', route: '/profile', category: 'settings' },
        { title: t('tabs.settings'), icon: 'settings', color: '#6B7280', route: '/settings', category: 'settings' },
    ];

    const filteredItems = allMenuItems.filter(item => {
        // If item has a role restriction, only show to that role
        if (item.role === 'admin' && !isAdmin) return false;
        if (item.role === 'teacher' && !isTeacher) return false;
        if (item.role === 'student' && !isStudent) return false;
        
        // If item has a category restriction, only show to that role
        if (item.category === 'admin' && !isAdmin) return false;
        if (item.category === 'teacher' && !isTeacher) return false;
        if (item.category === 'student' && !isStudent) return false;
        
        // Settings category is available to all
        if (item.category === 'settings') return true;
        
        // If no role or category specified, don't show (safety)
        if (!item.role && item.category !== 'settings') return false;
        
        return true;
    });

    const categories = {
        academic: { title: 'Academic', icon: 'school-outline' },
        communication: { title: 'Communication', icon: 'chatbubbles-outline' },
        admin: { title: 'Admin Tools', icon: 'shield-checkmark-outline' },
        teacher: { title: 'Teacher Tools', icon: 'person-outline' },
        student: { title: 'Student Tools', icon: 'people-outline' },
        settings: { title: 'Profile & Settings', icon: 'settings-outline' },
    };

    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    const MenuItemCard = ({ item }: { item: MenuItem }) => (
        <TouchableOpacity
            style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push(item.route)}
            activeOpacity={0.7}
        >
            <View style={[styles.menuCardIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} color={item.color} size={32} />
            </View>
            <Text style={[styles.menuCardText, { color: colors.text }]} numberOfLines={2}>
                {item.title}
            </Text>
            <View style={[styles.menuCardBadge, { backgroundColor: item.color + '10' }]}>
                <Ionicons name="arrow-forward-circle" size={16} color={item.color} />
            </View>
        </TouchableOpacity>
    );

    const MenuItemLine = ({ item }: { item: MenuItem }) => (
        <TouchableOpacity
            style={[styles.menuItemLine, { backgroundColor: colors.surface, borderLeftColor: item.color }]}
            onPress={() => router.push(item.route)}
        >
            <View style={styles.menuItemLineContent}>
                <View style={[styles.menuIconLine, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon as any} color={item.color} size={20} />
                </View>
                <Text style={[styles.menuItemLineText, { color: colors.text }]}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                <View>
                    <Text style={styles.headerTitle}>{t('menu.title')}</Text>
                    <Text style={styles.headerSubtitle}>{t('menu.subtitle')}</Text>
                </View>
                <Ionicons name="apps-outline" color="rgba(255,255,255,0.3)" size={60} style={styles.headerIcon} />
            </View>

            {/* View Style Selector */}
            <View style={styles.styleSelectorContainer}>
                <View style={[styles.styleSelector, { backgroundColor: colors.surface }]}>
                    <TouchableOpacity
                        style={[
                            styles.styleButton,
                            {
                                backgroundColor: viewStyle === 'card' ? colors.primary : 'transparent',
                                borderColor: colors.border,
                            }
                        ]}
                        onPress={() => setViewStyle('card')}
                    >
                        <Ionicons 
                            name="grid-outline" 
                            size={20} 
                            color={viewStyle === 'card' ? '#FFF' : colors.textSecondary} 
                        />
                        <Text style={[
                            styles.styleButtonText,
                            { color: viewStyle === 'card' ? '#FFF' : colors.textSecondary }
                        ]}>
                            {t('menu.cardView')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.styleButton,
                            {
                                backgroundColor: viewStyle === 'line' ? colors.primary : 'transparent',
                                borderColor: colors.border,
                            }
                        ]}
                        onPress={() => setViewStyle('line')}
                    >
                        <Ionicons 
                            name="list-outline" 
                            size={20} 
                            color={viewStyle === 'line' ? '#FFF' : colors.textSecondary} 
                        />
                        <Text style={[
                            styles.styleButtonText,
                            { color: viewStyle === 'line' ? '#FFF' : colors.textSecondary }
                        ]}>
                            {t('menu.lineView')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {Object.entries(groupedItems).map(([category, items]) => (
                    <View key={category} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <Ionicons 
                                name={categories[category as keyof typeof categories]?.icon as any} 
                                size={20} 
                                color={colors.primary} 
                            />
                            <Text style={[styles.categoryTitle, { color: colors.text }]}>
                                {categories[category as keyof typeof categories]?.title || category}
                            </Text>
                        </View>
                        <View style={viewStyle === 'card' ? styles.menuItemsContainer : styles.menuItemsLineContainer}>
                            {items.map((item, index) => (
                                viewStyle === 'card' ? (
                                    <MenuItemCard key={`${item.route}-${index}`} item={item} />
                                ) : (
                                    <MenuItemLine key={`${item.route}-${index}`} item={item} />
                                )
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
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
        position: 'relative',
        overflow: 'hidden',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    headerIcon: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    content: {
        padding: 20,
    },
    categorySection: {
        marginBottom: 32,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    menuItemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    menuCard: {
        width: (width - 52) / 2,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    menuCardIcon: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    menuCardText: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 20,
    },
    menuCardBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    menuIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuItemText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    styleSelectorContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    styleSelector: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 4,
        gap: 4,
    },
    styleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        gap: 6,
    },
    styleButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    menuItemsLineContainer: {
        gap: 4,
    },
    menuItemLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 12,
        borderLeftWidth: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    menuItemLineContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconLine: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuItemLineText: {
        fontSize: 15,
        fontWeight: '600',
        flex: 1,
    },
});

