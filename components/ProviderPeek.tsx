import Provider from "../ui/Provider";
import { View, Text, Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Card from "../ui/Card";
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
  Extrapolation,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import useSheetState from "../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DARK_BG_COLOR_VALUE,
  IOS_GREEN,
  IOS_ORANGE,
  IOS_RED,
  PROVIDER_DATA,
} from "../constants";
import { useEffect, useMemo, useRef } from "react";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";
import BottomSheet from "@gorhom/bottom-sheet";
import CircleButton from "../ui/CircleButton";
import Spacer from "../ui/Spacer";
import Backdrop from "../ui/Backdrop";
import Rate from "./Rate";
import ReBottomSheet from "../ui/ReBottomSheet";
import { useQuery } from "@tanstack/react-query";
import { TProviderSearchOut } from "../test/apiCalls";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface IProviderPeekProps {
  locationId: number;
  title: string;
  address: string;
  specialties: string[];
  setModalVisible: (visible: boolean) => void;
  targetPosition: { y: number };
}

const ProviderPeek = (props: IProviderPeekProps) => {
  const {
    setModalVisible,
    targetPosition,
    address,
    locationId,
    title,
    specialties,
  } = props;

  const params = {
    id: locationId,
    procedure_code: null,
    my_location: { latitude: 32.9822054, longitude: -96.7074236 },
    plan_id: 1,
  };

  const { data, isFetching } = useQuery<TProviderSearchOut["data"][0]>({
    queryKey: ["getProviderDetail"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.evryhealth.com/api/v1/ProviderDirectory/GetProviderDetail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      const responseJson = await response.json();
      return responseJson;
    },
  });

  const { handleModal } = useSheetState();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [180, "100%"], []);

  const handleOpenRateSheet = () => {
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleCloseRateSheet = () => {
    bottomSheetRef.current.close();
  };

  const topPosition = insets.top + 40;

  const translateY = useSharedValue(targetPosition?.y);
  const opacity = useSharedValue(0);

  const animatedY = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedScale = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [insets.top, topPosition],
      [0.99, 1],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  const animatedScaleButtons = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [insets.top, topPosition],
      [1, 0.9],
      Extrapolation.CLAMP
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
      <CircleButton
        style={{
          position: "absolute",
          top: insets.top,
          right: 15,
          zIndex: 1,
        }}
        onPress={handleCloseModal}
      />
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
                      title={title}
                      group={data?.group_name}
                      address={address}
                      specialties={specialties}
                      type={
                        data?.entity_type_code == "1"
                          ? "individual"
                          : "hospital"
                      }
                      distance={data?.distance?.toString()}
                      phone={data?.phone_number}
                      acceptNewPatients={data?.accepting_new_patients}
                      isFetching={isFetching}
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
                      <Text style={styles.buttonText}>
                        {data?.distance?.toString()} mi
                      </Text>
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
                        <Octicons name="share" size={19} color="white" />
                      </View>
                      <Text style={styles.buttonText}>Share</Text>
                    </View>
                  </Button>
                  <Button uniform onPress={handleOpenRateSheet}>
                    <View style={styles.buttonStyle}>
                      <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                          name="thumb-up"
                          size={17}
                          color="white"
                        />
                      </View>
                      <Text style={styles.buttonText}>Rate</Text>
                    </View>
                  </Button>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      <ReBottomSheet
        innerRef={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        containerStyle={{ zIndex: 2 }}
      >
        <View style={styles.bottomSheetContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 20,
                color: "#fff",
              }}
            >
              Rate Provider
            </Text>
            <CircleButton onPress={handleCloseRateSheet} />
          </View>
          <Spacer space={20} />
          <Rate />
        </View>
      </ReBottomSheet>
    </Modal>
  );
};

export default ProviderPeek;

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  buttonStyle: {
    display: "flex",
    gap: 4,
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
  bottomSheetContainerHandle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: `rgb(${DARK_BG_COLOR_VALUE})`,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: `rgb(${DARK_BG_COLOR_VALUE})`,
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
