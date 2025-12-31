import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MOCK_ACADEMIC_STATUS } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');

export default function StudentCardScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const status = MOCK_ACADEMIC_STATUS;

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                {/* Student ID Card */}
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {/* Card Header */}
                    <View style={[styles.cardHeader, { backgroundColor: colors.primary }]}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/images/logo.jpeg')}
                                style={styles.logoImage}
                                contentFit="contain"
                            />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.universityName}>Académie Arabe</Text>
                            <Text style={styles.universitySubtitle}>Systems LMS universitte*</Text>
                        </View>
                    </View>

                    {/* Card Body */}
                    <View style={styles.cardBody}>
                        <View style={styles.studentInfo}>
                            <View style={styles.photoSection}>
                                <View style={[styles.photoContainer, { borderColor: colors.primary }]}>
                                    <Image
                                        source={{ uri: 'https://i.pravatar.cc/200?u=' + user?.id }}
                                        style={styles.photo}
                                    />
                                </View>
                                <View style={[styles.idBadge, { backgroundColor: colors.primary }]}>
                                    <Text style={styles.idBadgeText}>STUDENT ID</Text>
                                </View>
                            </View>

                            <View style={styles.detailsSection}>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Name</Text>
                                    <Text style={[styles.detailValue, { color: colors.text }]}>{user?.name}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Student ID</Text>
                                    <Text style={[styles.detailValue, { color: colors.text }]}>{user?.id}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Department</Text>
                                    <Text style={[styles.detailValue, { color: colors.text }]}>{user?.department}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Level</Text>
                                    <Text style={[styles.detailValue, { color: colors.text }]}>{user?.level}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Academic Year</Text>
                                    <Text style={[styles.detailValue, { color: colors.text }]}>2024-2025</Text>
                                </View>
                            </View>
                        </View>

                        {/* QR Code Section */}
                        <View style={[styles.qrSection, { backgroundColor: colors.background }]}>
                            <View style={styles.qrPlaceholder}>
                                <Ionicons name="qr-code-outline" size={64} color={colors.textSecondary} />
                                <Text style={[styles.qrText, { color: colors.textSecondary }]}>QR Code</Text>
                                <Text style={[styles.qrSubtext, { color: colors.textSecondary }]}>{user?.id}</Text>
                            </View>
                        </View>

                        {/* Card Footer */}
                        <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                            <View style={styles.footerItem}>
                                <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                                <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                    Valid until: {status.expectedGraduation}
                                </Text>
                            </View>
                            <View style={styles.footerItem}>
                                <Ionicons name="shield-checkmark-outline" size={16} color={colors.success} />
                                <Text style={[styles.footerText, { color: colors.success }]}>
                                    {status.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Instructions */}
                <View style={[styles.instructionsCard, { backgroundColor: colors.surface }]}>
                    <View style={styles.instructionsHeader}>
                        <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
                        <Text style={[styles.instructionsTitle, { color: colors.text }]}>
                            {t('studentCard.instructions')}
                        </Text>
                    </View>
                    <Text style={[styles.instructionsText, { color: colors.textSecondary }]}>
                        {t('studentCard.instructionsText')}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        width: width - 40,
        maxWidth: 400,
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
        marginBottom: 24,
    },
    cardHeader: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    headerText: {
        flex: 1,
    },
    universityName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 2,
    },
    universitySubtitle: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.9)',
    },
    cardBody: {
        padding: 20,
    },
    studentInfo: {
        marginBottom: 20,
    },
    photoSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        padding: 3,
        marginBottom: 12,
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 57,
    },
    idBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    idBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    detailsSection: {
        gap: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    qrSection: {
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    qrPlaceholder: {
        alignItems: 'center',
    },
    qrText: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 8,
    },
    qrSubtext: {
        fontSize: 10,
        marginTop: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        borderTopWidth: 1,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 11,
        fontWeight: '600',
    },
    instructionsCard: {
        width: width - 40,
        maxWidth: 400,
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    instructionsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    instructionsTitle: {
        fontSize: 14,
        fontWeight: '700',
    },
    instructionsText: {
        fontSize: 12,
        lineHeight: 18,
    },
});

