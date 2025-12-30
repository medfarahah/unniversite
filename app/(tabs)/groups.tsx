import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_GROUPS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function GroupsScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const router = useRouter();

    const isDelegate = user?.role === 'delegate' || user?.role === 'admin';

    const renderGroup = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.groupCard, { backgroundColor: colors.surface }]}
            onPress={() => router.push({ pathname: '/(screens)/chat', params: { id: item.id, name: item.name } })}
        >
            <View style={[styles.groupIcon, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="people" color={colors.primary} size={24} />
            </View>
            <View style={styles.groupInfo}>
                <Text style={[styles.groupName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.groupDesc, { color: colors.textSecondary }]} numberOfLines={1}>
                    {item.description}
                </Text>
            </View>
            <Ionicons name="chevron-forward" color={colors.textSecondary} size={20} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={MOCK_GROUPS}
                renderItem={renderGroup}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />

            {isDelegate && (
                <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
                    <Ionicons name="add" color="#FFF" size={24} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 16,
    },
    groupCard: {
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
    groupIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    groupInfo: {
        flex: 1,
    },
    groupName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    groupDesc: {
        fontSize: 13,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
});
