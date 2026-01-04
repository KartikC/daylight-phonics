import React from 'react';
import { Modal, View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView, Pressable, Linking } from 'react-native';
import { ALPHABET_DATA } from '../data/alphabet';

export default function SettingsModal({ visible, onClose, settings, onUpdateSettings }) {

    const toggleLetter = (char) => {
        const newEnabled = { ...settings.enabledLetters, [char]: !settings.enabledLetters?.[char] };
        onUpdateSettings('enabledLetters', newEnabled);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Settings</Text>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Show Standard</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.showStandard ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('showStandard', !settings.showStandard)}
                                value={settings.showStandard}
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Show Cursive</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.showCursive ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('showCursive', !settings.showCursive)}
                                value={settings.showCursive}
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Show Uppercase</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.showUppercase ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('showUppercase', !settings.showUppercase)}
                                value={settings.showUppercase}
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Show Lowercase</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.showLowercase ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('showLowercase', !settings.showLowercase)}
                                value={settings.showLowercase}
                            />
                        </View>

                        <View style={styles.divider} />
                        <Text style={styles.sectionHeader}>Audio Settings</Text>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Play Phonics Sound</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.playPhonics ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('playPhonics', !settings.playPhonics)}
                                value={settings.playPhonics}
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Play Letter Name</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.playLetterName ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('playLetterName', !settings.playLetterName)}
                                value={settings.playLetterName}
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Play Word</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.playWord ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('playWord', !settings.playWord)}
                                value={settings.playWord}
                            />
                        </View>

                        <View style={styles.divider} />
                        <Text style={styles.sectionHeader}>Appearance</Text>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Minimal Style</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={settings.useMinimalStyle ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => onUpdateSettings('useMinimalStyle', !settings.useMinimalStyle)}
                                value={settings.useMinimalStyle}
                            />
                        </View>

                        <View style={styles.divider} />
                        <Text style={styles.sectionHeader}>Visible Letters</Text>
                        <View style={styles.grid}>
                            {ALPHABET_DATA.map(item => (
                                <Pressable
                                    key={item.char}
                                    style={[
                                        styles.letterButton,
                                        settings.enabledLetters && settings.enabledLetters[item.char] ? styles.letterButtonActive : null
                                    ]}
                                    onPress={() => toggleLetter(item.char)}
                                >
                                    <Text style={[
                                        styles.letterButtonText,
                                        settings.enabledLetters && settings.enabledLetters[item.char] ? styles.letterButtonTextActive : null
                                    ]}>{item.char}</Text>
                                </Pressable>
                            ))}
                        </View>

                        <View style={styles.attributionContainer}>
                            <Text style={styles.attributionText}>
                                sounds by{' '}
                                <Text
                                    style={styles.linkText}
                                    onPress={() => Linking.openURL('https://github.com/bblodget/Letter_Sounds?tab=readme-ov-file')}
                                >
                                    bblodget
                                </Text>
                            </Text>
                        </View>
                    </ScrollView>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxHeight: '80%',
    },
    scrollView: {
        width: '100%',
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        userSelect: 'none',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    settingLabel: {
        fontSize: 18,
        userSelect: 'none',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        minWidth: 100,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        userSelect: 'none',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        width: '100%',
        marginVertical: 15,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'flex-start',
        userSelect: 'none',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    letterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#f9f9f9',
    },
    letterButtonActive: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    letterButtonText: {
        fontSize: 16,
        color: '#000',
        userSelect: 'none',
    },
    letterButtonTextActive: {
        color: '#fff',
    },
    attributionContainer: {
        marginTop: 30,
        marginBottom: 10,
        alignItems: 'center',
    },
    attributionText: {
        fontSize: 14,
        color: '#666',
        userSelect: 'none',
    },
    linkText: {
        color: '#2196F3',
        textDecorationLine: 'underline',
    },
});
