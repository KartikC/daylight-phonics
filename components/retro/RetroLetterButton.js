import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

// N64-inspired color palette for buttons
const RETRO_COLORS = [
  '#E53935', // Red
  '#1E88E5', // Blue
  '#43A047', // Green
  '#FDD835', // Yellow
  '#8E24AA', // Purple
  '#FB8C00', // Orange
  '#00ACC1', // Cyan
  '#D81B60', // Pink
];

export default function RetroLetterButton({ letter, onPress, size, colorIndex = 0 }) {
  const [isPressed, setIsPressed] = useState(false);

  const buttonSize = size || 80;
  const edgeOffset = 8;
  const pressedOffset = 2;
  const dynamicFontSize = buttonSize * 0.45;

  // Cycle through colors based on letter index
  const buttonColor = RETRO_COLORS[colorIndex % RETRO_COLORS.length];

  // Darker shade for the edge/shadow
  const darkenColor = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max((num >> 16) - amt, 0);
    const G = Math.max((num >> 8 & 0x00FF) - amt, 0);
    const B = Math.max((num & 0x0000FF) - amt, 0);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
  };

  const edgeColor = darkenColor(buttonColor, 30);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={styles.wrapper}
    >
      {/* Background layer - chunky retro edge */}
      <View style={[
        styles.edge,
        {
          width: buttonSize,
          height: buttonSize,
          backgroundColor: edgeColor,
          borderRadius: 4,
        }
      ]} />

      {/* Foreground layer - main button face */}
      <View style={[
        styles.front,
        {
          width: buttonSize,
          height: buttonSize,
          backgroundColor: buttonColor,
          borderRadius: 4,
          transform: [{ translateY: isPressed ? -pressedOffset : -edgeOffset }],
        }
      ]}>
        {/* Inner highlight for 3D effect */}
        <View style={[styles.highlight, { borderRadius: 2 }]} />
        <Text style={[
          styles.text,
          {
            fontSize: dynamicFontSize,
            textShadowColor: edgeColor,
          }
        ]}>
          {letter}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 6,
    position: 'relative',
  },
  edge: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 3,
    borderColor: '#2D1B0E',
  },
  front: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2D1B0E',
    transitionProperty: 'transform',
    transitionDuration: '80ms',
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    userSelect: 'none',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    letterSpacing: 1,
  },
});
