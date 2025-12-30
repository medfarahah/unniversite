import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_RESOURCES } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function ResourcesScreen() {
    const { colors } = useTheme();
    const { user } = useUser();
    const isTeacher = user?.role === 'teacher';

    const handleDownload = (title: string) => {
        Alert.alert("Download Started", `Downloading ${title}...`);
    };

    const handleUpload = () => {
        Alert.alert("Upload", "Demo: Opening file picker...");
    };

    const getIconName = (type: string) => {
        switch (type) {
            case 'pdf': return 'document-text';
            case 'docx': return 'document';
            case 'pptx': return 'easel';
            default: return 'file-tray';
        }
    };

    const renderResource = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.resourceCard, { backgroundColor: colors.surface }]}
            onPress={() => handleDownload(item.title)}
        >
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={getIconName(item.type)} size={24} color={colors.primary} />
            </View>
            <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                <Text style={[styles.resourceMeta, { color: colors.textSecondary }]}>{item.category} • {item.size}</Text>
            </View>
            <Ionicons name="download-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.listHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Academic Materials</Text>
                {isTeacher && (
                    <TouchableOpacity
                        style={[styles.uploadBtn, { backgroundColor: colors.primary }]}
                        onPress={handleUpload}
                    >
                        <Ionicons name="cloud-upload" size={18} color="#FFF" />
                        <Text style={styles.uploadBtnText}>Upload</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={MOCK_RESOURCES}
                renderItem={renderResource}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    uploadBtnText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
    list: {
        padding: 16,
    },
    resourceCard: {
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
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    resourceInfo: {
        flex: 1,
    },
    resourceTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    resourceMeta: {
        fontSize: 12,
    },
});
