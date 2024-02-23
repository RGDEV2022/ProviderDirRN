import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useModalState from "../store/store";

const TransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { modalState } = useModalState();
  const isModalOpen = modalState;

  console.log({ isModalOpen });

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  scale.value = withTiming(isModalOpen ? 0.97 : 1);
  opacity.value = withTiming(isModalOpen ? 0.7 : 1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      {children}
    </Animated.View>
  );
};

export default TransitionWrapper;
