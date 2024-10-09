import React from 'react';
import { View, Text, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, runOnJS } from 'react-native-reanimated';

const ShakeAnimation = () => {
  // Shared value to control the horizontal position
  const translateX = useSharedValue(0);

  // Animated style for shaking effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value }, // Moving left and right
      ],
    };
  });

  // Function to start the shaking animation
  const startShaking = () => {
    translateX.value = withRepeat(
      withTiming(10, { duration: 80 }),  // Moves 10 units to the right over 50ms
      6,  // Repeat 10 times (1 second of shaking, each shake lasts 100ms)
      true, // Reverses the direction (left-right)
      (finished) => {
        // Once shaking finishes, reset to original position
        if (finished) {
          runOnJS(resetPosition)();
        }
      }
    );
  };

  // Function to reset the position to the original state
  const resetPosition = () => {
    translateX.value = withTiming(0, { duration: 200 });  // Reset to the original position smoothly
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[animatedStyle]}>
        <Text style={{ fontSize: 24 }}>Shake Me!</Text>
      </Animated.View>
      <Button title="Shake for 1 Second" onPress={startShaking} />
    </View>
  );
};

export default ShakeAnimation;
