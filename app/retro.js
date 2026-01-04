import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, PanResponder, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

import RetroLetterDisplay from '../components/retro/RetroLetterDisplay';
import RetroSoundBoard from '../components/retro/RetroSoundBoard';
import RetroSettingsModal from '../components/retro/RetroSettingsModal';

import { Audio } from 'expo-av';
import soundAssets from '../data/soundAssets';

const DEFAULT_ENABLED_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((acc, char) => ({ ...acc, [char]: true }), {});

export default function RetroScreen() {
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

  // Use a different key for retro settings so they're independent
  const SETTINGS_KEY = 'phonics_settings_retro_v1';

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
      <StatusBar barStyle="dark-content" backgroundColor="#E8D4B8" />
      <View style={styles.topSection} {...panResponder.panHandlers}>
        <RetroLetterDisplay
          letter={selectedLetter}
          showStandard={settings.showStandard}
          showCursive={settings.showCursive}
          showUppercase={settings.showUppercase}
          showLowercase={settings.showLowercase}
        />
      </View>
      <View style={styles.bottomSection}>
        <RetroSoundBoard
          onLetterPress={handleLetterPress}
          enabledLetters={settings.enabledLetters}
        />
      </View>
      <RetroSettingsModal
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
    backgroundColor: '#E8D4B8',
    userSelect: 'none',
  },
  topSection: {
    flex: 1,
    minHeight: 180,
    userSelect: 'none',
  },
  bottomSection: {
    flex: 3,
    userSelect: 'none',
  },
});
