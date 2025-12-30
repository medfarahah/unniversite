import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MOCK_ANNOUNCEMENTS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function AnnouncementsScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [newAnn, setNewAnn] = useState({ title: '', content: '' });

    const canCreate = user?.role === 'admin' || user?.role === 'delegate' || user?.role === 'teacher';

    const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(ann => {
        if (ann.isGlobal) return true;
        if (user?.role === 'admin') return true;
        return ann.department === user?.department && ann.level === user?.level;
    });

    const renderAnnouncement = ({ item }: { item: any }) => {
        const isAuthor = item.authorId === user?.id;
        const canManage = user?.role === 'admin' || isAuthor;

        return (
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
                <View style={styles.cardHeader}>
                    <View>
                        <View style={styles.typeTag}>
                            <Text style={[styles.typeText, { color: item.isGlobal ? colors.primary : colors.accent }]}>
                                {item.isGlobal ? "University Announcement" : `Class Announcement • ${item.level} ${item.department === 'Computer Science' ? 'CS' : 'IT'}`}
                            </Text>
                        </View>
                        <Text style={[styles.author, { color: colors.text }]}>{item.author}</Text>
                        <Text style={[styles.date, { color: colors.textSecondary }]}>{item.date}</Text>
                    </View>
                    {canManage && (
                        <TouchableOpacity style={styles.moreBtn}>
                            <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.content, { color: colors.textSecondary }]}>{item.content}</Text>

                <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="chatbubble-outline" size={18} color={colors.textSecondary} />
                        <Text style={[styles.actionText, { color: colors.textSecondary }]}>
                            {item.comments ? item.comments.length : 0} {t('announcements.comments')}
                        </Text>
                    </TouchableOpacity>
                    {canManage && (
                        <View style={styles.delegateActions}>
                            <TouchableOpacity style={styles.iconAction}>
                                <Ionicons name="create-outline" size={18} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconAction}>
                                <Ionicons name="trash-outline" size={18} color={colors.error} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={filteredAnnouncements}
                renderItem={renderAnnouncement}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />

            {canCreate && (
                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: colors.primary }]}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="add" color="#FFF" size={24} />
                </TouchableOpacity>
            )}

            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>{t('announcements.newAnnouncement')}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" color={colors.text} size={24} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            placeholder="Title"
                            placeholderTextColor={colors.textSecondary}
                            value={newAnn.title}
                            onChangeText={(txt) => setNewAnn({ ...newAnn, title: txt })}
                        />
                        <TextInput
                            style={[styles.textArea, { color: colors.text, borderColor: colors.border }]}
                            placeholder={t('announcements.placeholder')}
                            placeholderTextColor={colors.textSecondary}
                            multiline
                            numberOfLines={4}
                            value={newAnn.content}
                            onChangeText={(txt) => setNewAnn({ ...newAnn, content: txt })}
                        />

                        <TouchableOpacity
                            style={[styles.postBtn, { backgroundColor: colors.primary }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.postBtnText}>{t('announcements.post')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    typeTag: {
        marginBottom: 6,
    },
    typeText: {
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    author: {
        fontSize: 15,
        fontWeight: '700',
    },
    date: {
        fontSize: 12,
        marginTop: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    content: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: 1,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
    },
    delegateActions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconAction: {
        padding: 4,
    },
    moreBtn: {
        padding: 4,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        minHeight: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    textArea: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        textAlignVertical: 'top',
        minHeight: 120,
        marginBottom: 24,
    },
    postBtn: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    postBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
