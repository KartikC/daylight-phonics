import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Text } from 'react-native';
import * as Speech from 'expo-speech';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { DancingScript_700Bold } from '@expo-google-fonts/dancing-script';

import LetterDisplay from './components/LetterDisplay';
import SoundBoard from './components/SoundBoard';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    DancingScript_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLetterPress = (item) => {
    setSelectedLetter(item.char);
    // Speak the phonics sound (or letter name + word as fallback)
    // Adjust rate and pitch for a more "phonics" like sound if possible, 
    // but TTS is limited. We'll say the letter and the word.
    // e.g. "A, Apple"
    Speech.speak(`${item.speech}, ${item.phonics}`, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topSection}>
        <LetterDisplay letter={selectedLetter} />
      </View>
      <View style={styles.bottomSection}>
        <SoundBoard onLetterPress={handleLetterPress} />
      </View>
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
