import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LetterButton from './LetterButton';
import { ALPHABET_DATA } from '../data/alphabet';

export default function SoundBoard({ onLetterPress, enabledLetters }) {
    const [layout, setLayout] = React.useState({ width: 0, height: 0 });

    // Filter visible letters
    const visibleLetters = React.useMemo(() => {
        if (!enabledLetters) return ALPHABET_DATA;
        return ALPHABET_DATA.filter(item => enabledLetters[item.char]);
    }, [enabledLetters]);

    const buttonSize = React.useMemo(() => {
        if (layout.width === 0 || layout.height === 0 || visibleLetters.length === 0) return 80;

        const { width, height } = layout;
        const count = visibleLetters.length;
        const margin = 16; // Total margin per button (8 on each side)
        const padding = 20; // Container padding
        const minSize = 80;
        const maxSize = 120;

        // Calculate how many columns we can fit
        const cols = Math.max(1, Math.floor((width - padding) / (minSize + margin)));

        // Calculate optimal size to fill width
        const optimalSize = Math.floor((width - padding) / cols - margin);

        // Clamp between min and max
        return Math.min(Math.max(optimalSize, minSize), maxSize);
    }, [layout, visibleLetters]);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setLayout({ width, height });
            }}
        >
            <View style={styles.grid}>
                {visibleLetters.map((item) => (
                    <LetterButton
                        key={item.char}
                        letter={item.char}
                        onPress={() => onLetterPress(item)}
                        size={buttonSize}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
