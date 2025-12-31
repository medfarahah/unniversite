import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useGradeManagement } from '../../context/GradeManagementContext';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export default function GradesScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const { colors } = useTheme();
    const { students, grades, addStudent, addGrade } = useGradeManagement();
    const [selectedSemester, setSelectedSemester] = useState(grades[0] || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAddGradeModal, setShowAddGradeModal] = useState(false);

    const getGradeColor = (grade: string) => {
        const gradeValue = parseFloat(grade.split('/')[0]);
        if (gradeValue >= 16) return colors.success; // Excellent (Très Bien)
        if (gradeValue >= 14) return colors.primary; // Good (Bien)
        if (gradeValue >= 12) return colors.accent; // Satisfactory (Assez Bien)
        if (gradeValue >= 10) return colors.accent; // Pass (Passable)
        return colors.error; // Fail
    };
    
    // Add Student Form State
    const [newStudent, setNewStudent] = useState({
        name: '',
        id: '',
        department: '',
        level: '',
    });

    // Add Grade Form State
    const [newGrade, setNewGrade] = useState({
        studentId: '',
        courseName: '',
        grade: '',
        credits: '',
    });

    const isTeacher = user?.role === 'teacher';

    const handleAddStudent = () => {
        if (!newStudent.name || !newStudent.id || !newStudent.department || !newStudent.level) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (students.find(s => s.id === newStudent.id)) {
            Alert.alert('Error', 'Student ID already exists');
            return;
        }

        addStudent(newStudent);
        setNewStudent({ name: '', id: '', department: '', level: '' });
        setShowAddStudentModal(false);
        Alert.alert('Success', t('grades.studentAdded'));
    };

    const handleAddGrade = () => {
        if (!newGrade.studentId || !newGrade.courseName || !newGrade.grade || !newGrade.credits) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const creditsNum = parseInt(newGrade.credits);
        if (isNaN(creditsNum) || creditsNum <= 0) {
            Alert.alert('Error', 'Credits must be a positive number');
            return;
        }

        // Format grade to French 20-point system
        let formattedGrade = newGrade.grade;
        if (!formattedGrade.includes('/')) {
            const gradeNum = parseFloat(formattedGrade);
            if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 20) {
                Alert.alert('Error', 'Grade must be between 0 and 20');
                return;
            }
            formattedGrade = `${gradeNum}/20`;
        } else {
            const gradeValue = parseFloat(formattedGrade.split('/')[0]);
            if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 20) {
                Alert.alert('Error', 'Grade must be between 0 and 20');
                return;
            }
        }

        addGrade(newGrade.studentId, {
            name: newGrade.courseName,
            grade: formattedGrade,
            credits: creditsNum,
        });

        setNewGrade({ studentId: '', courseName: '', grade: '', credits: '' });
        setShowAddGradeModal(false);
        Alert.alert('Success', t('grades.gradeAdded'));
    };

    if (isTeacher) {
        const filteredStudents = students.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.id.includes(searchQuery)
        );

        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView style={styles.scrollView}>
                    <View style={[styles.summaryCard, { backgroundColor: colors.success }]}>
                        <View>
                            <Text style={styles.semesterTitle}>{user?.department}</Text>
                            <Text style={styles.gpaLabel}>{t('grades.gradingPortal')}</Text>
                            <Text style={styles.gpaValue}>{students.length} {t('grades.students')}</Text>
                        </View>
                        <Ionicons name="people-outline" color="rgba(255,255,255,0.3)" size={80} style={styles.bgIcon} />
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: colors.primary }]}
                            onPress={() => setShowAddStudentModal(true)}
                        >
                            <Ionicons name="person-add-outline" size={20} color="#FFF" />
                            <Text style={styles.addButtonText}>{t('grades.addStudent')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: colors.primary }]}
                            onPress={() => setShowAddGradeModal(true)}
                        >
                            <Ionicons name="school-outline" size={20} color="#FFF" />
                            <Text style={styles.addButtonText}>{t('grades.addGrade')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
                        <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                        <TextInput
                            style={[styles.searchInput, { color: colors.text }]}
                            placeholder="Search students..."
                            placeholderTextColor={colors.textSecondary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <View style={styles.coursesSection}>
                        <View style={styles.courseHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('grades.studentRoster')}</Text>
                        </View>

                        {filteredStudents.length === 0 ? (
                            <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
                                <Ionicons name="people-outline" size={48} color={colors.textSecondary} />
                                <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                                    No students found
                                </Text>
                            </View>
                        ) : (
                            filteredStudents.map((student) => (
                                <TouchableOpacity key={student.id} style={[styles.courseCard, { backgroundColor: colors.surface }]}>
                                    <View style={styles.courseInfo}>
                                        <Text style={[styles.courseName, { color: colors.text }]}>{student.name}</Text>
                                        <Text style={[styles.courseCredits, { color: colors.textSecondary }]}>ID: {student.id}</Text>
                                        <Text style={[styles.courseCredits, { color: colors.textSecondary }]}>
                                            {student.department} • {student.level}
                                        </Text>
                                    </View>
                                    <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(student.grade) + '15' }]}>
                                        <Text style={[styles.gradeText, { color: getGradeColor(student.grade) }]}>{student.grade}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </ScrollView>

                {/* Add Student Modal */}
                <Modal
                    visible={showAddStudentModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowAddStudentModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: colors.text }]}>{t('grades.addStudent')}</Text>
                                <TouchableOpacity onPress={() => setShowAddStudentModal(false)}>
                                    <Ionicons name="close-outline" size={24} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                placeholder={t('grades.studentName')}
                                placeholderTextColor={colors.textSecondary}
                                value={newStudent.name}
                                onChangeText={(text) => setNewStudent({ ...newStudent, name: text })}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                placeholder={t('grades.studentId')}
                                placeholderTextColor={colors.textSecondary}
                                value={newStudent.id}
                                onChangeText={(text) => setNewStudent({ ...newStudent, id: text })}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                placeholder={t('grades.department')}
                                placeholderTextColor={colors.textSecondary}
                                value={newStudent.department}
                                onChangeText={(text) => setNewStudent({ ...newStudent, department: text })}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                placeholder={t('grades.level')}
                                placeholderTextColor={colors.textSecondary}
                                value={newStudent.level}
                                onChangeText={(text) => setNewStudent({ ...newStudent, level: text })}
                            />

                            <TouchableOpacity
                                style={[styles.submitButton, { backgroundColor: colors.primary }]}
                                onPress={handleAddStudent}
                            >
                                <Text style={styles.submitButtonText}>{t('common.save')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Add Grade Modal */}
                <Modal
                    visible={showAddGradeModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowAddGradeModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: colors.text }]}>{t('grades.addGrade')}</Text>
                                <TouchableOpacity onPress={() => setShowAddGradeModal(false)}>
                                    <Ionicons name="close-outline" size={24} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.label, { color: colors.text }]}>{t('grades.selectStudent')}</Text>
                            <ScrollView style={styles.studentPicker}>
                                {students.map((student) => (
                                    <TouchableOpacity
                                        key={student.id}
                                        style={[
                                            styles.studentOption,
                                            {
                                                backgroundColor: newGrade.studentId === student.id ? colors.primary + '20' : colors.background,
                                                borderColor: newGrade.studentId === student.id ? colors.primary : colors.border,
                                            }
                                        ]}
                                        onPress={() => setNewGrade({ ...newGrade, studentId: student.id })}
                                    >
                                        <Text style={[styles.studentOptionText, { color: colors.text }]}>
                                            {student.name} ({student.id})
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                placeholder={t('grades.courseName')}
                                placeholderTextColor={colors.textSecondary}
                                value={newGrade.courseName}
                                onChangeText={(text) => setNewGrade({ ...newGrade, courseName: text })}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                placeholder="Enter grade (e.g., 17/20 or 17)"
                                placeholderTextColor={colors.textSecondary}
                                value={newGrade.grade}
                                onChangeText={(text) => setNewGrade({ ...newGrade, grade: text })}
                                keyboardType="decimal-pad"
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                placeholder={t('grades.enterCredits')}
                                placeholderTextColor={colors.textSecondary}
                                value={newGrade.credits}
                                onChangeText={(text) => setNewGrade({ ...newGrade, credits: text })}
                                keyboardType="numeric"
                            />

                            <TouchableOpacity
                                style={[styles.submitButton, { backgroundColor: colors.primary }]}
                                onPress={handleAddGrade}
                            >
                                <Text style={styles.submitButtonText}>{t('common.save')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {selectedSemester && (
                <>
                    <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
                        <View>
                            <Text style={styles.semesterTitle}>{selectedSemester.semester}</Text>
                            <Text style={styles.gpaLabel}>{t('grades.gpa')}</Text>
                            <Text style={styles.gpaValue}>{selectedSemester.gpa}</Text>
                        </View>
                        <Ionicons name="medal-outline" color="rgba(255,255,255,0.3)" size={80} style={styles.bgIcon} />
                    </View>

                    <View style={styles.selectorSection}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('grades.semester')}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selector}>
                            {grades.map((sem) => (
                                <TouchableOpacity
                                    key={sem.id}
                                    style={[
                                        styles.semBtn,
                                        {
                                            backgroundColor: selectedSemester.id === sem.id ? colors.primary + '20' : colors.surface,
                                            borderColor: selectedSemester.id === sem.id ? colors.primary : colors.border
                                        }
                                    ]}
                                    onPress={() => setSelectedSemester(sem)}
                                >
                                    <Text style={[
                                        styles.semBtnText,
                                        { color: selectedSemester.id === sem.id ? colors.primary : colors.text }
                                    ]}>
                                        {sem.semester}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.coursesSection}>
                        <View style={styles.courseHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('grades.title')}</Text>
                            <Text style={{ color: colors.textSecondary }}>{selectedSemester.courses.length} Courses</Text>
                        </View>

                        {selectedSemester.courses.map((course, idx) => (
                            <View key={idx} style={[styles.courseCard, { backgroundColor: colors.surface }]}>
                                <View style={styles.courseInfo}>
                                    <Text style={[styles.courseName, { color: colors.text }]}>{course.name}</Text>
                                    <Text style={[styles.courseCredits, { color: colors.textSecondary }]}>{course.credits} {t('grades.credits')}</Text>
                                </View>
                                <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(course.grade) + '15' }]}>
                                    <Text style={[styles.gradeText, { color: getGradeColor(course.grade) }]}>{course.grade}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={[styles.lmsGuide, { backgroundColor: colors.surface }]}>
                        <View style={styles.lmsHeader}>
                            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
                            <Text style={[styles.lmsTitle, { color: colors.text }]}>{t('grades.lmsGuideTitle')}</Text>
                        </View>
                        <View style={styles.lmsSteps}>
                            <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep1')}</Text>
                            <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep2')}</Text>
                            <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep3')}</Text>
                            <Text style={[styles.lmsStep, { color: colors.textSecondary }]}>{t('grades.lmsStep4')}</Text>
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    summaryCard: {
        margin: 20,
        padding: 24,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    semesterTitle: {
        color: '#FFF',
        fontSize: 16,
        opacity: 0.8,
        marginBottom: 12,
    },
    gpaLabel: {
        color: '#FFF',
        fontSize: 14,
        opacity: 0.7,
    },
    gpaValue: {
        color: '#FFF',
        fontSize: 48,
        fontWeight: '800',
    },
    bgIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    selectorSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    selector: {
        flexDirection: 'row',
    },
    semBtn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 10,
    },
    semBtnText: {
        fontWeight: '600',
    },
    coursesSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    courseCard: {
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
    courseInfo: {
        flex: 1,
    },
    courseName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    courseCredits: {
        fontSize: 12,
    },
    gradeBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradeText: {
        fontSize: 18,
        fontWeight: '800',
    },
    lmsGuide: {
        margin: 20,
        marginTop: 0,
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 40,
    },
    lmsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    lmsTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    lmsSteps: {
        gap: 12,
    },
    lmsStep: {
        fontSize: 14,
        lineHeight: 20,
    },
    actionButtons: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 16,
    },
    addButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 12,
        gap: 8,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    emptyState: {
        padding: 40,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    emptyStateText: {
        marginTop: 12,
        fontSize: 16,
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
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    studentPicker: {
        maxHeight: 150,
        marginBottom: 16,
    },
    studentOption: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 8,
    },
    studentOptionText: {
        fontSize: 14,
    },
    submitButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
