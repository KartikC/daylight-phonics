import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LetterButton from './LetterButton';
import { ALPHABET_DATA } from '../data/alphabet';

export default function SoundBoard({ onLetterPress }) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.grid}>
                {ALPHABET_DATA.map((item) => (
                    <LetterButton
                        key={item.char}
                        letter={item.char}
                        onPress={() => onLetterPress(item)}
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
