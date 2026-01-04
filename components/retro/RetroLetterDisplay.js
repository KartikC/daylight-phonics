import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RetroLetterDisplay({
  letter,
  showStandard = true,
  showCursive = true,
  showUppercase = true,
  showLowercase = true
}) {
  if (!letter) {
    return (
      <View style={styles.container}>
        <View style={styles.innerFrame}>
          <Text style={styles.placeholder}>TAP A LETTER!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerFrame}>
        <View style={styles.row}>
          {showStandard && (
            <View style={styles.letterBox}>
              <Text style={styles.standardText}>
                {showUppercase ? letter.toUpperCase() : ''} {showLowercase ? letter.toLowerCase() : ''}
              </Text>
            </View>
          )}
          {showCursive && (
            <View style={styles.letterBox}>
              <Text style={styles.cursiveText}>
                {showUppercase ? letter.toUpperCase() : ''} {showLowercase ? letter.toLowerCase() : ''}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8D4B8',
    padding: 15,
  },
  innerFrame: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6C8',
    borderWidth: 6,
    borderColor: '#8B4513',
    borderRadius: 8,
    // Pixel-style double border effect
    shadowColor: '#5D2E0C',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  letterBox: {
    alignItems: 'center',
    padding: 10,
  },
  standardText: {
    fontSize: 72,
    fontFamily: 'Inter_700Bold',
    color: '#2D1B0E',
    userSelect: 'none',
    textShadowColor: '#8B4513',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
  },
  cursiveText: {
    fontSize: 72,
    fontFamily: 'StyleScript_400Regular',
    color: '#8E24AA',
    userSelect: 'none',
    textShadowColor: '#4A148C',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  placeholder: {
    fontSize: 28,
    color: '#8B4513',
    fontFamily: 'Inter_700Bold',
    userSelect: 'none',
    letterSpacing: 2,
    textShadowColor: '#5D2E0C',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
});
