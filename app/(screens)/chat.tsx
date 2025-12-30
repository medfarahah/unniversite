import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MOCK_GROUPS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function ChatScreen() {
    const { id, name } = useLocalSearchParams();
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { user } = useUser();
    const router = useRouter();
    const [message, setMessage] = useState('');

    const group = MOCK_GROUPS.find(g => g.id === id) || MOCK_GROUPS[0];
    const [messages, setMessages] = useState(group.messages);

    const sendMessage = () => {
        if (!message.trim()) return;
        const newMessage = {
            id: Date.now().toString(),
            sender: 'You',
            content: message,
            type: 'sent',
        };
        setMessages([...messages, newMessage]);
        setMessage('');
    };

    const renderMessage = ({ item }: { item: any }) => {
        const isMe = item.type === 'sent';
        return (
            <View style={[
                styles.messageWrapper,
                { alignItems: isMe ? 'flex-end' : 'flex-start' }
            ]}>
                {!isMe && <Text style={[styles.senderName, { color: colors.textSecondary }]}>{item.sender}</Text>}
                <View style={[
                    styles.bubble,
                    {
                        backgroundColor: isMe ? colors.primary : colors.surface,
                        borderBottomRightRadius: isMe ? 4 : 20,
                        borderBottomLeftRadius: isMe ? 20 : 4
                    }
                ]}>
                    <Text style={[styles.messageText, { color: isMe ? '#FFF' : colors.text }]}>
                        {item.content}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="chevron-back" color={colors.text} size={28} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>{name}</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>{t('groups.members')}: 42</Text>
                    </View>
                </View>

                <FlatList
                    data={[...messages].reverse()}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    inverted
                />

                <View style={[styles.inputArea, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
                    <TextInput
                        style={[styles.input, { color: colors.text, backgroundColor: colors.background }]}
                        placeholder={t('groups.typeMessage')}
                        placeholderTextColor={colors.textSecondary}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, { backgroundColor: message.trim() ? colors.primary : colors.border }]}
                        onPress={sendMessage}
                        disabled={!message.trim()}
                    >
                        <Ionicons name="send" color="#FFF" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 40 : 16,
        borderBottomWidth: 1,
    },
    backBtn: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    headerSubtitle: {
        fontSize: 12,
    },
    list: {
        padding: 16,
    },
    messageWrapper: {
        marginBottom: 16,
        maxWidth: '80%',
    },
    senderName: {
        fontSize: 12,
        marginBottom: 4,
        marginLeft: 8,
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        borderTopWidth: 1,
        gap: 12,
    },
    input: {
        flex: 1,
        height: 44,
        borderRadius: 22,
        paddingHorizontal: 16,
        fontSize: 15,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
