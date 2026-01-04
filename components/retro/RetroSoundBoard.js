import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RetroLetterButton from './RetroLetterButton';
import { ALPHABET_DATA } from '../../data/alphabet';

export default function RetroSoundBoard({ onLetterPress, enabledLetters }) {
  const [layout, setLayout] = React.useState({ width: 0, height: 0 });

  // Filter visible letters
  const visibleLetters = React.useMemo(() => {
    if (!enabledLetters) return ALPHABET_DATA;
    return ALPHABET_DATA.filter(item => enabledLetters[item.char]);
  }, [enabledLetters]);

  const buttonSize = React.useMemo(() => {
    if (layout.width === 0 || layout.height === 0 || visibleLetters.length === 0) return 80;

    const { width } = layout;
    const margin = 12;
    const padding = 16;
    const minSize = 75;
    const maxSize = 110;

    const cols = Math.max(1, Math.floor((width - padding) / (minSize + margin)));
    const optimalSize = Math.floor((width - padding) / cols - margin);

    return Math.min(Math.max(optimalSize, minSize), maxSize);
  }, [layout, visibleLetters]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setLayout({ width, height });
        }}
      >
        <View style={styles.grid}>
          {visibleLetters.map((item, index) => (
            <RetroLetterButton
              key={item.char}
              letter={item.char}
              onPress={() => onLetterPress(item)}
              size={buttonSize}
              colorIndex={index}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8D4B8',
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
