import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');

interface MenuItem {
    title: string;
    icon: string;
    color: string;
    route: string;
    category: string;
    role?: 'teacher' | 'student';
}

export default function MenuScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const router = useRouter();

    const isAdmin = user?.role === 'admin';
    const isTeacher = user?.role === 'teacher';
    const isDelegate = user?.role === 'delegate';
    const isStudent = user?.role === 'student' || isDelegate;

    const allMenuItems: MenuItem[] = [
        // Academic Features
        { title: t('tabs.timetable'), icon: 'calendar', color: '#3B82F6', route: '/timetable', category: 'academic' },
        { title: t('tabs.grades'), icon: 'school', color: '#F59E0B', route: '/grades', category: 'academic' },
        { title: 'Exam Calendar', icon: 'calendar-outline', color: '#EC4899', route: '/(screens)/exam-calendar', category: 'academic' },
        { title: 'Academic Status', icon: 'document-text', color: '#10B981', route: '/(screens)/academic-status', category: 'academic' },
        { title: 'Exam Results', icon: 'trophy', color: '#F59E0B', route: '/(screens)/exam-results', category: 'academic' },
        
        // Communication
        { title: t('tabs.announcements'), icon: 'megaphone', color: '#EC4899', route: '/announcements', category: 'communication' },
        { title: t('tabs.groups'), icon: 'chatbubbles', color: '#10B981', route: '/groups', category: 'communication' },
        
        // Teacher Tools
        { title: 'Manage Grades', icon: 'create', color: '#F59E0B', route: '/grades', category: 'teacher', role: 'teacher' },
        { title: 'Course Schedule', icon: 'calendar', color: '#3B82F6', route: '/timetable', category: 'teacher', role: 'teacher' },
        { title: 'Attendance', icon: 'list', color: '#22C55E', route: '/(screens)/attendance', category: 'teacher', role: 'teacher' },
        { title: 'Resources', icon: 'document-text', color: '#8B5CF6', route: '/(screens)/resources', category: 'teacher', role: 'teacher' },
        
        // Student Tools
        { title: 'Attendance', icon: 'checkmark-circle', color: '#22C55E', route: '/(screens)/attendance', category: 'student', role: 'student' },
        { title: 'Resources', icon: 'folder', color: '#8B5CF6', route: '/(screens)/resources', category: 'student', role: 'student' },
        { title: 'Chat', icon: 'chatbubble', color: '#10B981', route: '/(screens)/chat', category: 'student', role: 'student' },
        
        // Profile & Settings
        { title: t('tabs.profile'), icon: 'person', color: '#6366F1', route: '/profile', category: 'settings' },
        { title: t('tabs.settings'), icon: 'settings', color: '#6B7280', route: '/settings', category: 'settings' },
    ];

    const filteredItems = allMenuItems.filter(item => {
        if (item.role === 'teacher' && !isTeacher) return false;
        if (item.role === 'student' && !isStudent) return false;
        if (item.category === 'teacher' && !isTeacher) return false;
        if (item.category === 'student' && !isStudent) return false;
        return true;
    });

    const categories = {
        academic: { title: 'Academic', icon: 'school-outline' },
        communication: { title: 'Communication', icon: 'chatbubbles-outline' },
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
            style={[styles.menuItem, { backgroundColor: colors.surface }]}
            onPress={() => router.push(item.route)}
        >
            <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon as any} color={item.color} size={24} />
            </View>
            <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
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
                        <View style={styles.menuItemsContainer}>
                            {items.map((item, index) => (
                                <MenuItemCard key={`${item.route}-${index}`} item={item} />
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
        gap: 8,
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
});

