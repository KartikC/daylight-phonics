import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';

export default function LetterButton({ letter, onPress, size }) {
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        animatedValue.stopAnimation();
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 60,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        animatedValue.stopAnimation();
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 5], // Push down into the surface
                }),
            },
        ],
        shadowOffset: {
            width: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [3, 0], // Shadow disappears as button sinks
            }),
            height: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [6, 1], // Shadow flattens when pressed
            }),
        },
        shadowOpacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 0.15], // Shadow fades as button sinks
        }),
        elevation: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 2], // Elevation drops when pressed
        }),
    };

    // Dynamic scale for text based on button size (assuming ~40% of size)
    const dynamicFontSize = size ? size * 0.4 : 32;

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[
                styles.button,
                size ? { width: size, height: size } : {},
                animatedStyle
            ]}>
                <Text style={[styles.text, { fontSize: dynamicFontSize }]}>{letter}</Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowRadius: 1,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Inter_700Bold',
    },
});
