import Provider from "../ui/Provider";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Card from "../ui/Card";
import Spacer from "../ui/Spacer";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
  withSpring,
  ReduceMotion,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useModalState from "../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PROVIDER_DATA } from "../constants";
import { useEffect } from "react";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface IProviderPeekProps {
  setModalVisible: (visible: boolean) => void;
  targetPosition: { y: number };
}

const ProviderPeek = (props: IProviderPeekProps) => {
  const { setModalVisible, targetPosition } = props;
  const { handleModal } = useModalState();
  const insets = useSafeAreaInsets();

  const topPosition = insets.top + 30;

  const translateY = useSharedValue(targetPosition?.y);
  const opacity = useSharedValue(0);

  const animatedY = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedScale = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [insets.top, topPosition],
      [0.99, 1]
    );
    return {
      transform: [{ scale }],
    };
  });

  const animatedScaleButtons = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [insets.top, topPosition],
      [1, 0.9]
    );
    return {
      transform: [{ scale }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    translateY.value = withSpring(topPosition, SPRING_CONFIG);

    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.linear,
    });
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
    handleModal(false);
  };

  const pressed = useSharedValue(false);
  const panOffset = useSharedValue(0);
  const panOpacity = useSharedValue(1);
  const panScale = useSharedValue(1);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      panOffset.value = event.translationY;
      panOpacity.value = withTiming(1 - Math.abs(event.translationY / 3000), {
        duration: 100,
      });
      panScale.value = withTiming(1 - Math.abs(event.translationY / 3000), {
        duration: 100,
      });
    })
    .onFinalize(() => {
      panOffset.value = withSpring(0);
      pressed.value = false;
      panOpacity.value = withTiming(1, { duration: 100 });
      panScale.value = withTiming(1, { duration: 100 });
    });

  const animatedStylesPan = useAnimatedStyle(() => ({
    transform: [{ translateY: panOffset.value }],
    opacity: panOpacity.value,
  }));

  const animatedScalePan = useAnimatedStyle(() => ({
    transform: [{ scale: panScale.value }],
  }));

  useAnimatedReaction(
    () => pressed.value,
    (pressed) => {
      if (!pressed) {
        if (panOffset.value > 200) {
          runOnJS(handleCloseModal)();
        }
      }
    }
  );

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <AnimatedBlurView
        entering={FadeIn}
        exiting={FadeOut}
        intensity={50}
        tint="dark"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Pressable
        style={{
          position: "absolute",
          top: insets.top,
          right: 15,
          zIndex: 2,
        }}
        onPress={handleCloseModal}
      >
        <Text style={{ color: "#fff" }}>X</Text>
      </Pressable>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flex: 1,
                gap: 8,
              },
              animatedY,
            ]}
          >
            <Animated.View
              style={[
                {
                  width: "100%",
                },
                animatedScalePan,
              ]}
            >
              <Animated.View
                style={[
                  {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                  },
                  animatedStylesPan,
                ]}
              >
                <Animated.View
                  style={[
                    {
                      paddingLeft: 15,
                      paddingRight: 15,
                      width: "100%",
                    },
                    animatedScale,
                  ]}
                >
                  <Card>
                    <Provider
                      title={PROVIDER_DATA[0].title}
                      group={PROVIDER_DATA[0].group}
                      address={PROVIDER_DATA[0].address}
                      type={PROVIDER_DATA[0].type}
                      distance={PROVIDER_DATA[0].distance}
                      phone={PROVIDER_DATA[0].phone}
                      acceptNewPatients={PROVIDER_DATA[0].acceptNewPatients}
                      specialties={PROVIDER_DATA[0].specialties}
                      fullCard
                    />
                  </Card>
                </Animated.View>
                <Animated.View
                  style={[
                    { display: "flex", flexDirection: "row", gap: 10 },
                    animatedScaleButtons,
                  ]}
                >
                  <Button variant="primary" uniform>
                    <View style={styles.buttonStyle}>
                      <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                          name="car"
                          size={22}
                          color="white"
                        />
                      </View>
                      <Text style={styles.buttonText}>1.2 miles</Text>
                    </View>
                  </Button>
                  <Button uniform>
                    <View style={styles.buttonStyle}>
                      <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                          name="phone"
                          size={19}
                          color="white"
                        />
                      </View>
                      <Text style={styles.buttonText}>Call</Text>
                    </View>
                  </Button>
                  <Button uniform>
                    <View style={styles.buttonStyle}>
                      <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                          name="share"
                          size={22}
                          color="white"
                        />
                      </View>
                      <Text style={styles.buttonText}>Share</Text>
                    </View>
                  </Button>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ProviderPeek;

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
  },
  buttonStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 22,
    overflow: "hidden",
  },
});

const SPRING_CONFIG: SpringConfig = {
  mass: 1,
  damping: 16,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
  reduceMotion: ReduceMotion.System,
};
