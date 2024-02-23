import React from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AnimatedPressableProps extends PressableProps {
  children?: React.ReactNode;
}

const AnimatedPressable = (props: AnimatedPressableProps) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(1.02, { duration: 500 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable onPressOut={handlePressOut} onPressIn={handlePressIn} {...props}>
      <Animated.View style={[animatedStyle]}>{props.children}</Animated.View>
    </Pressable>
  );
};

export default AnimatedPressable;
