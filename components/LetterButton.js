import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated, View } from 'react-native';

export default function LetterButton({ letter, onPress, size }) {
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        animatedValue.stopAnimation();
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        animatedValue.stopAnimation();
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true,
        }).start();
    };

    // Button dimensions
    const buttonSize = size || 80;
    const edgeOffset = 6; // How much the front layer floats above the back
    const pressedOffset = 2; // Keep small gap when pressed for 3D effect

    // Animated translateY for the front layer
    const frontTranslateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-edgeOffset, -pressedOffset],
    });

    const dynamicFontSize = buttonSize * 0.4;

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
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
            <Animated.View style={[
                styles.front,
                {
                    width: buttonSize,
                    height: buttonSize,
                    borderRadius: buttonSize * 0.15,
                    transform: [{ translateY: frontTranslateY }],
                }
            ]}>
                <Text style={[styles.text, { fontSize: dynamicFontSize }]}>{letter}</Text>
            </Animated.View>
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
    },
    text: {
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Inter_700Bold',
        userSelect: 'none',
    },
});
