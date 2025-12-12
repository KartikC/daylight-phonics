import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';

export default function LetterButton({ letter, onPress }) {
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 0,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const animatedStyle = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 2],
                }),
            },
        ],
        shadowOffset: {
            width: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 0],
            }),
            height: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [3, 1],
            }),
        },
        shadowOpacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.25, 0.1],
        }),
        elevation: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [4, 1],
        }),
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.button, animatedStyle]}>
                <Text style={styles.text}>{letter}</Text>
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
