import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function LetterButton({ letter, onPress, size }) {
    const [isPressed, setIsPressed] = useState(false);

    // Button dimensions
    const buttonSize = size || 80;
    const edgeOffset = 6; // How much the front layer floats above the back
    const pressedOffset = 2; // Keep small gap when pressed for 3D effect

    const dynamicFontSize = buttonSize * 0.4;

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={styles.wrapper}
        >
            {/* Background layer (stationary "edge" of button) */}
            <View style={[
                styles.edge,
                {
                    width: buttonSize,
                    height: buttonSize,
                    borderRadius: buttonSize * 0.15,
                }
            ]} />

            {/* Foreground layer (slides up/down) */}
            <View style={[
                styles.front,
                {
                    width: buttonSize,
                    height: buttonSize,
                    borderRadius: buttonSize * 0.15,
                    transform: [{ translateY: isPressed ? -pressedOffset : -edgeOffset }],
                }
            ]}>
                <Text style={[styles.text, { fontSize: dynamicFontSize }]}>{letter}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 8,
        position: 'relative',
    },
    edge: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#000000', // Black edge
        borderWidth: 0,
    },
    front: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // White face
        borderWidth: 2,
        borderColor: '#000000',
        transitionProperty: 'transform',
        transitionDuration: '100ms',
    },
    text: {
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Inter_700Bold',
        userSelect: 'none',
    },
});
