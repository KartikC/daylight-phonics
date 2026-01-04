import React from 'react';
import { Modal, View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { ALPHABET_DATA } from '../../data/alphabet';

// N64-inspired colors
const RETRO_COLORS = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#8E24AA', '#FB8C00', '#00ACC1', '#D81B60'];

export default function RetroSettingsModal({ visible, onClose, settings, onUpdateSettings }) {
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
          <View style={styles.titleBar}>
            <Text style={styles.modalTitle}>SETTINGS</Text>
          </View>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Show Standard</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.showStandard ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('showStandard', !settings.showStandard)}
                value={settings.showStandard}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Show Cursive</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.showCursive ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('showCursive', !settings.showCursive)}
                value={settings.showCursive}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Show Uppercase</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.showUppercase ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('showUppercase', !settings.showUppercase)}
                value={settings.showUppercase}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Show Lowercase</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.showLowercase ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('showLowercase', !settings.showLowercase)}
                value={settings.showLowercase}
              />
            </View>

            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>AUDIO</Text>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Play Phonics Sound</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.playPhonics ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('playPhonics', !settings.playPhonics)}
                value={settings.playPhonics}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Play Letter Name</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.playLetterName ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('playLetterName', !settings.playLetterName)}
                value={settings.playLetterName}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Play Word</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.playWord ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('playWord', !settings.playWord)}
                value={settings.playWord}
              />
            </View>

            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>APPEARANCE</Text>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Minimal Style</Text>
              <Switch
                trackColor={{ false: "#5D2E0C", true: "#43A047" }}
                thumbColor={settings.useMinimalStyle ? "#FDD835" : "#8B4513"}
                onValueChange={() => onUpdateSettings('useMinimalStyle', !settings.useMinimalStyle)}
                value={settings.useMinimalStyle}
              />
            </View>

            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>VISIBLE LETTERS</Text>
            <View style={styles.grid}>
              {ALPHABET_DATA.map((item, index) => (
                <Pressable
                  key={item.char}
                  style={[
                    styles.letterButton,
                    settings.enabledLetters && settings.enabledLetters[item.char]
                      ? { backgroundColor: RETRO_COLORS[index % RETRO_COLORS.length] }
                      : styles.letterButtonInactive
                  ]}
                  onPress={() => toggleLetter(item.char)}
                >
                  <Text style={[
                    styles.letterButtonText,
                    settings.enabledLetters && settings.enabledLetters[item.char]
                      ? styles.letterButtonTextActive
                      : null
                  ]}>
                    {item.char}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>CLOSE</Text>
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
    backgroundColor: 'rgba(45, 27, 14, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F5E6C8",
    borderRadius: 8,
    padding: 0,
    alignItems: "center",
    borderWidth: 6,
    borderColor: '#8B4513',
    shadowColor: "#2D1B0E",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
    width: '90%',
    maxHeight: '85%',
    overflow: 'hidden',
  },
  titleBar: {
    width: '100%',
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#5D2E0C',
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: 'Inter_700Bold',
    color: '#FDD835',
    userSelect: 'none',
    letterSpacing: 3,
    textShadowColor: '#2D1B0E',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    backgroundColor: '#EDD9BC',
    padding: 12,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#8B4513',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#2D1B0E',
    userSelect: 'none',
  },
  button: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    paddingHorizontal: 40,
    margin: 15,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#2D1B0E',
    shadowColor: '#991F1F',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: 'Inter_700Bold',
    textAlign: "center",
    fontSize: 18,
    userSelect: 'none',
    letterSpacing: 2,
    textShadowColor: '#991F1F',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  divider: {
    height: 4,
    backgroundColor: '#8B4513',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
    color: '#8B4513',
    userSelect: 'none',
    letterSpacing: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letterButton: {
    width: 42,
    height: 42,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#2D1B0E',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  letterButtonInactive: {
    backgroundColor: '#C4B39A',
  },
  letterButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#5D2E0C',
    userSelect: 'none',
  },
  letterButtonTextActive: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
});
