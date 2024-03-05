import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface IBackdropProps extends BottomSheetBackdropProps {
  offset?: number;
  appearAfterIndex?: number;
}

const Backdrop = ({
  animatedIndex,
  offset = 1.5,
  appearAfterIndex,
  style,
}: IBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value - offset,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
    display: animatedIndex.value <= appearAfterIndex ? "none" : "flex",
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} />;
};

export default Backdrop;
