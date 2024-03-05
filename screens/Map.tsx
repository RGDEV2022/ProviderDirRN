import React, { useMemo } from "react";
import MapView from "react-native-maps";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TransitionViews from "../components/TransitionViews";
import TransitionWrapper from "../components/TransitionWrapper";
import { IOS_BUTTON_GRAY, IOS_ICON_GRAY } from "../constants";
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import Divider from "../ui/Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import Spacer from "../ui/Spacer";
import LottieView from "lottie-react-native";

export default function Map() {
  const animatedIndex = useSharedValue(0);
  return (
    <>
      <View style={styles.container}>
        <TransitionWrapper>
          <MapView style={styles.map} userInterfaceStyle="dark" />
          <FloatingButtonGroup animatedIndex={animatedIndex} />
          <TransitionViews animatedIndex={animatedIndex} />
        </TransitionWrapper>
      </View>
    </>
  );
}

const FloatingButtonGroup = ({
  animatedIndex,
}: {
  animatedIndex?: SharedValue<number>;
}) => {
  const inset = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 1.1],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      {
        top: inset.top + 10,
        right: 5,
        zIndex: 10,
      },
      animatedStyle,
    ],
    [animatedStyle]
  );

  return (
    <Animated.View style={[containerStyle, { position: "absolute" }]}>
      <RoundedFlexContainer>
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: IOS_BUTTON_GRAY,
              padding: 9,
            }}
          >
            <FontAwesome6
              name="location-arrow"
              size={16}
              color={IOS_ICON_GRAY}
            />
          </View>
        </TouchableOpacity>
        <Divider noSpacing />
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: IOS_BUTTON_GRAY,
              padding: 9,
            }}
          >
            <FontAwesome5 name="home" size={16} color={IOS_ICON_GRAY} />
          </View>
        </TouchableOpacity>
      </RoundedFlexContainer>

      <Spacer space={10} />

      <RoundedFlexContainer>
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: IOS_BUTTON_GRAY,
              padding: 9,
            }}
          >
            <LottieView
              autoPlay
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                top: -16,
                right: 16,
                backgroundColor: "transparent",
              }}
              source={require("../animations/aiAnalyse.json")}
            />
          </View>
        </TouchableOpacity>
      </RoundedFlexContainer>
    </Animated.View>
  );
};

const RoundedFlexContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#000",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
