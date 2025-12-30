import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { changeLanguage } from '../../i18n';

export default function SettingsScreen() {
    const { t, i18n } = useTranslation();
    const { isDark, toggleTheme, colors } = useTheme();

    const currentLanguage = i18n.language;

    const SettingRow = ({ icon: IconName, label, value, onPress, right }: any) => (
        <TouchableOpacity
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <View style={styles.left}>
                <View style={[styles.iconBox, { backgroundColor: colors.primary + '10' }]}>
                    <Ionicons name={IconName} size={20} color={colors.primary} />
                </View>
                <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            </View>
            {right ? right : (
                <View style={styles.right}>
                    <Text style={[styles.value, { color: colors.textSecondary }]}>{value}</Text>
                    <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('settings.theme')}</Text>
                <View style={[styles.card, { backgroundColor: colors.surface }]}>
                    <SettingRow
                        icon={isDark ? "moon" : "sunny"}
                        label={t('settings.darkMode')}
                        right={
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: colors.border, true: colors.primary }}
                            />
                        }
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('settings.language')}</Text>
                <View style={[styles.card, { backgroundColor: colors.surface }]}>
                    <SettingRow
                        icon="globe"
                        label={t('settings.english')}
                        onPress={() => changeLanguage('en')}
                        right={currentLanguage.startsWith('en') && <Text style={{ color: colors.primary, fontWeight: '700' }}>✓</Text>}
                    />
                    <SettingRow
                        icon="globe"
                        label={t('settings.french')}
                        onPress={() => changeLanguage('fr')}
                        right={currentLanguage.startsWith('fr') && <Text style={{ color: colors.primary, fontWeight: '700' }}>✓</Text>}
                    />
                    <SettingRow
                        icon="globe"
                        label={t('settings.arabic')}
                        onPress={() => changeLanguage('ar')}
                        right={currentLanguage.startsWith('ar') && <Text style={{ color: colors.primary, fontWeight: '700' }}>✓</Text>}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 8,
        marginLeft: 4,
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    value: {
        fontSize: 14,
    },
});
