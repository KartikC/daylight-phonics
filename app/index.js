import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, PanResponder, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

import LetterDisplay from '../components/LetterDisplay';
import SoundBoard from '../components/SoundBoard';
import SettingsModal from '../components/SettingsModal';

import { Audio } from 'expo-av';
import soundAssets from '../data/soundAssets';

const DEFAULT_ENABLED_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((acc, char) => ({ ...acc, [char]: true }), {});

export default function HomeScreen() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [settings, setSettings] = useState({
    showStandard: true,
    showCursive: true,
    showUppercase: true,
    showLowercase: true,
    playPhonics: true,
    playLetterName: false,
    playWord: false,
    enabledLetters: DEFAULT_ENABLED_LETTERS,
  });

  const SETTINGS_KEY = 'phonics_settings_v1';

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings);
          setSettings(prev => ({
            ...prev,
            ...parsedSettings,
          }));
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };

  const activeSounds = useRef([]);

  // PanResponder for 3 or 4-finger hold gesture (2 seconds)
  const timerRef = useRef(null);

  const handleTouchChange = (evt) => {
    const touches = evt.nativeEvent.touches.length;
    if (touches === 3 || touches === 4) {
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          setSettingsVisible(true);
          timerRef.current = null;
        }, 2000);
      }
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: handleTouchChange,
      onPanResponderMove: handleTouchChange,
      onPanResponderRelease: handleTouchChange,
      onPanResponderTerminate: handleTouchChange,
    })
  ).current;

  // Keyboard listener for Shift+S (web only)
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyPress = (event) => {
        if (event.shiftKey && event.key === 'S') {
          setSettingsVisible(true);
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  useEffect(() => {
    // Cleanup all active sounds on unmount
    return () => {
      activeSounds.current.forEach(sound => {
        sound.unloadAsync().catch(() => {});
      });
      activeSounds.current = [];
    };
  }, []);

  const playPhonicsSound = async (char) => {
    const soundFile = soundAssets[char];
    if (soundFile) {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
        activeSounds.current.push(newSound);

        // Auto-cleanup when sound finishes playing
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            newSound.unloadAsync().catch(() => {});
            activeSounds.current = activeSounds.current.filter(s => s !== newSound);
          }
        });

        await newSound.playAsync();
      } catch (error) {
        console.error("Error playing sound", error);
      }
    }
  };

  const speakText = (text) => {
    return new Promise((resolve) => {
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.8,
        onDone: resolve,
        onStopped: resolve,
        onError: resolve,
      });
    });
  };

  const handleLetterPress = async (item) => {
    setSelectedLetter(item.char);

    if (settings.playLetterName) {
      await speakText(item.char.toLowerCase());
    }

    if (settings.playPhonics) {
      await playPhonicsSound(item.char);
    }

    if (settings.playWord) {
      await speakText(item.phonics);
    }
  };

  const handleUpdateSettings = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      saveSettings(newSettings);
      return newSettings;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topSection} {...panResponder.panHandlers}>
        <LetterDisplay
          letter={selectedLetter}
          showStandard={settings.showStandard}
          showCursive={settings.showCursive}
          showUppercase={settings.showUppercase}
          showLowercase={settings.showLowercase}
        />
      </View>
      <View style={styles.bottomSection}>
        <SoundBoard
          onLetterPress={handleLetterPress}
          enabledLetters={settings.enabledLetters}
        />
      </View>
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    userSelect: 'none',
  },
  topSection: {
    flex: 1,
    minHeight: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    userSelect: 'none',
  },
  bottomSection: {
    flex: 3,
    userSelect: 'none',
  },
});
