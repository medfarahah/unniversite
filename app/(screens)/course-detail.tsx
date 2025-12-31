import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { MOCK_COURSES } from '../../constants/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function CourseDetailScreen() {
    const { t } = useTranslation();
    const { courseId } = useLocalSearchParams<{ courseId: string }>();
    const { user } = useUser();
    const { colors } = useTheme();
    const router = useRouter();
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);

    const course = MOCK_COURSES.find(c => c.id === courseId);
    const isStudent = user?.role === 'student' || user?.role === 'delegate';
    const isTeacher = user?.role === 'teacher';

    if (!course) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.text }]}>Course not found</Text>
            </View>
        );
    }

    const handleOpenPDF = async (url: string, name: string) => {
        try {
            await WebBrowser.openBrowserAsync(url);
        } catch (error) {
            Alert.alert('Error', `Could not open ${name}`);
        }
    };

    const handleScanQR = () => {
        // Simulate QR code scanning
        // In a real app, you would use expo-camera or expo-barcode-scanner
        setShowQRScanner(true);
        
        // Simulate scanning after 2 seconds
        setTimeout(() => {
            const qrData = `COURSE:${course.id}:${new Date().toISOString()}`;
            setScannedData(qrData);
            handleQRScanned(qrData);
        }, 2000);
    };

    const handleQRScanned = (data: string) => {
        // Parse QR data: COURSE:COURSE_ID:TIMESTAMP
        const parts = data.split(':');
        if (parts[0] === 'COURSE' && parts[1] === course.id) {
            Alert.alert(
                t('courseDetail.attendanceMarked'),
                t('courseDetail.attendanceSuccess'),
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setShowQRScanner(false);
                            setScannedData(null);
                        }
                    }
                ]
            );
        } else {
            Alert.alert(
                t('courseDetail.invalidQR'),
                t('courseDetail.invalidQRMessage')
            );
        }
    };

    const getPDFIcon = (type: string) => {
        switch (type) {
            case 'syllabus':
                return 'document-text';
            case 'lecture':
                return 'book';
            case 'assessment':
                return 'clipboard';
            case 'assignment':
                return 'create';
            default:
                return 'document';
        }
    };

    const getPDFTypeLabel = (type: string) => {
        switch (type) {
            case 'syllabus':
                return t('courseDetail.syllabus');
            case 'lecture':
                return t('courseDetail.lecture');
            case 'assessment':
                return t('courseDetail.assessment');
            case 'assignment':
                return t('courseDetail.assignment');
            default:
                return type;
        }
    };

    const groupedPDFs = (course.pdfs || []).reduce((acc, pdf) => {
        if (!acc[pdf.type]) {
            acc[pdf.type] = [];
        }
        acc[pdf.type].push(pdf);
        return acc;
    }, {} as Record<string, typeof course.pdfs>);

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Course Header */}
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                <View style={styles.headerContent}>
                    <View style={[styles.codeBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                        <Text style={styles.codeText}>{course.code}</Text>
                    </View>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseInfo}>
                        {course.credits} {t('courses.credits')} • {course.semester}
                    </Text>
                </View>
            </View>

            <View style={styles.content}>
                {/* Quick Actions */}
                {isStudent && (
                    <View style={styles.quickActions}>
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: colors.success }]}
                            onPress={handleScanQR}
                        >
                            <Ionicons name="qr-code" size={24} color="#FFF" />
                            <Text style={styles.actionText}>{t('courseDetail.scanAttendance')}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Course Description */}
                {course.description && (
                    <View style={[styles.section, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            {t('courseDetail.description')}
                        </Text>
                        <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
                            {course.description}
                        </Text>
                    </View>
                )}

                {/* Course Information */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        {t('courseDetail.courseInfo')}
                    </Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                        <Text style={[styles.infoText, { color: colors.text }]}>
                            {course.instructor}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="school-outline" size={20} color={colors.textSecondary} />
                        <Text style={[styles.infoText, { color: colors.text }]}>
                            {course.department} • {course.level}
                        </Text>
                    </View>
                    {course.schedule && course.schedule.length > 0 && (
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
                            <View style={styles.scheduleInfo}>
                                {course.schedule.map((sched, idx) => (
                                    <Text key={idx} style={[styles.infoText, { color: colors.text }]}>
                                        {sched.day} {sched.time} - {sched.room}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* PDFs and Resources */}
                {course.pdfs && course.pdfs.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            {t('courseDetail.resources')}
                        </Text>
                        {Object.entries(groupedPDFs).map(([type, pdfs]) => (
                            <View key={type} style={styles.pdfGroup}>
                                <Text style={[styles.pdfGroupTitle, { color: colors.textSecondary }]}>
                                    {getPDFTypeLabel(type)}
                                </Text>
                                {pdfs.map((pdf) => (
                                    <TouchableOpacity
                                        key={pdf.id}
                                        style={[styles.pdfItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
                                        onPress={() => handleOpenPDF(pdf.url, pdf.name)}
                                    >
                                        <View style={[styles.pdfIcon, { backgroundColor: colors.primary + '15' }]}>
                                            <Ionicons name={getPDFIcon(pdf.type) as any} size={24} color={colors.primary} />
                                        </View>
                                        <View style={styles.pdfInfo}>
                                            <Text style={[styles.pdfName, { color: colors.text }]}>
                                                {pdf.name}
                                            </Text>
                                            <Text style={[styles.pdfDate, { color: colors.textSecondary }]}>
                                                {new Date(pdf.date).toLocaleDateString()}
                                            </Text>
                                        </View>
                                        <Ionicons name="download-outline" size={20} color={colors.textSecondary} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={[styles.section, { backgroundColor: colors.surface }]}>
                        <View style={styles.emptyState}>
                            <Ionicons name="document-outline" size={48} color={colors.textSecondary} />
                            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                                {t('courseDetail.noResources')}
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            {/* QR Scanner Modal */}
            <Modal
                visible={showQRScanner}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowQRScanner(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>
                                {t('courseDetail.scanQRCode')}
                            </Text>
                            <TouchableOpacity onPress={() => setShowQRScanner(false)}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.qrScannerArea, { backgroundColor: colors.background }]}>
                            {scannedData ? (
                                <View style={styles.scanSuccess}>
                                    <Ionicons name="checkmark-circle" size={64} color={colors.success} />
                                    <Text style={[styles.scanSuccessText, { color: colors.text }]}>
                                        {t('courseDetail.scanning')}...
                                    </Text>
                                </View>
                            ) : (
                                <View style={styles.scanPlaceholder}>
                                    <Ionicons name="qr-code-outline" size={80} color={colors.textSecondary} />
                                    <Text style={[styles.scanPlaceholderText, { color: colors.textSecondary }]}>
                                        {t('courseDetail.pointCamera')}
                                    </Text>
                                    <View style={[styles.scanFrame, { borderColor: colors.primary }]} />
                                </View>
                            )}
                        </View>
                        <Text style={[styles.modalHint, { color: colors.textSecondary }]}>
                            {t('courseDetail.scanHint')}
                        </Text>
                    </View>
                </View>
            </Modal>
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
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerContent: {
        alignItems: 'center',
    },
    codeBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 12,
    },
    codeText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
    courseName: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center',
    },
    courseInfo: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
    },
    content: {
        padding: 20,
    },
    quickActions: {
        marginBottom: 20,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    actionText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 22,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 12,
    },
    infoText: {
        fontSize: 15,
        flex: 1,
    },
    scheduleInfo: {
        flex: 1,
        gap: 4,
    },
    pdfGroup: {
        marginBottom: 20,
    },
    pdfGroupTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    pdfItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
        gap: 12,
    },
    pdfIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdfInfo: {
        flex: 1,
    },
    pdfName: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    pdfDate: {
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
    },
    qrScannerArea: {
        height: 300,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    scanPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanPlaceholderText: {
        marginTop: 16,
        fontSize: 14,
    },
    scanFrame: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderWidth: 2,
        borderRadius: 16,
    },
    scanSuccess: {
        alignItems: 'center',
    },
    scanSuccessText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '600',
    },
    modalHint: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
    },
    emptyStateText: {
        fontSize: 14,
        marginTop: 12,
        textAlign: 'center',
    },
});

