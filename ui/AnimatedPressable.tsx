import React from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { TRANSITION_DURATION } from "../constants";

interface AnimatedPressableProps extends PressableProps {
  children?: React.ReactNode;
}

const AnimatedPressable = (props: AnimatedPressableProps) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(1.03, { duration: TRANSITION_DURATION + 200 });
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
    <Pressable
      onPressOut={handlePressOut}
      onPressIn={handlePressIn}
      delayLongPress={TRANSITION_DURATION}
      {...props}
    >
      <Animated.View style={[animatedStyle]}>{props.children}</Animated.View>
    </Pressable>
  );
};

export default AnimatedPressable;
