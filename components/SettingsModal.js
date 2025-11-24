import React from 'react';
import { Modal, View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsModal({ visible, onClose, settings, onUpdateSettings }) {
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
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 300,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
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
    },
});
