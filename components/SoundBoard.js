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
        const margin = 20; // 10 on each side

        let bestSize = 80;
        let low = 60;
        let high = 300; // Max reasonable size

        // Binary search for largest square size that allows fitting all items
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const sizeWithMargin = mid + margin;

            // Available columns
            const cols = Math.floor((width - 20) / sizeWithMargin); // -20 for container padding
            if (cols <= 0) {
                high = mid - 1;
                continue;
            }

            const rows = Math.ceil(count / cols);
            const totalHeight = rows * sizeWithMargin + 40; // +40 for vertical padding

            // We prefer to fit within height, but if it's impossible (too many items), 
            // we default to scrolling with a minimum reasonable size.
            // However, constraint says "somewhat scale to fill".

            // Logic: If it fits, try bigger.
            // If it doesn't fit, try smaller.

            if (totalHeight <= height) {
                bestSize = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // If bestSize is still small (e.g. 60) because we have many items, 
        // we might just want to stick to a readable standard size (80) and scroll.
        // But if we have few items, we definitely want to scale up.
        // If we have 26 items and they don't fit in view, bestSize might settle on < 60.
        // We should clamp min size.
        return Math.max(bestSize, 80);
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
