import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Text, PanResponder, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { StyleScript_400Regular } from '@expo-google-fonts/style-script';

import LetterDisplay from './components/LetterDisplay';
import SoundBoard from './components/SoundBoard';
import SettingsModal from './components/SettingsModal';

import { Audio } from 'expo-av';
import soundAssets from './data/soundAssets';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
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
    enabledLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((acc, char) => ({ ...acc, [char]: true }), {}),
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
            // Merge enabledLetters carefully if needed, but simple spread should work if structure is same
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

  const touchStartTime = useRef(null);
  const touchCount = useRef(0);
  const [sound, setSound] = useState();

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    StyleScript_400Regular,
  });

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
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const playPhonicsSound = async (char) => {
    const soundFile = soundAssets[char];
    if (soundFile) {
      // Stop and unload any currently playing sound immediately
      if (sound) {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (e) {
          // Ignore errors if already unloaded
        }
      }

      try {
        const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
        setSound(newSound);
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

    // Sequence: Letter Name -> Phonics Sound -> Word

    if (settings.playLetterName) {
      // Speak just the letter. Some TTS engines say "Capital A" for "A".
      // We can try speaking the lowercase version or appending a period.
      // Let's try speaking the character itself, but if it's uppercase, 
      // some engines force "Capital".
      // A workaround is to speak "The letter " + char, but user wants just the name.
      // Let's try speaking it as a lowercase letter for the name, often sounds like the name.
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
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
  },
  topSection: {
    flex: 1, // Takes up roughly 25-30% of screen depending on content
    minHeight: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bottomSection: {
    flex: 3,
  },
});
