import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LetterDisplay({ letter, showStandard = true, showCursive = true, showUppercase = true, showLowercase = true }) {
    if (!letter) {
        return (
            <View style={styles.container}>
                <Text style={styles.placeholder}>Select a letter</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    letterBox: {
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
    },
    standardText: {
        fontSize: 80,
        fontFamily: 'Inter_700Bold',
        color: '#000',
        userSelect: 'none',
    },
    cursiveText: {
        fontSize: 80,
        fontFamily: 'StyleScript_400Regular',
        color: '#000',
        userSelect: 'none',
    },
    placeholder: {
        fontSize: 24,
        color: '#ccc',
        fontFamily: 'Inter_400Regular',
        userSelect: 'none',
    },
});
