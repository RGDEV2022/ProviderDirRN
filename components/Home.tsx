import Favorites from "./Favorites";
import Recents from "./Recents";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import useSheetState from "../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DARK_BG_COLOR_VALUE,
  IOS_ORANGE,
  STANDARD_PADDING,
} from "../constants";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CircleButton from "../ui/CircleButton";
import Spacer from "../ui/Spacer";
import Backdrop from "../ui/Backdrop";
import Group from "../ui/Group";
import Card from "../ui/Card";
import MenuItem from "../ui/MenuItem";
import Divider from "../ui/Divider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Prescriptions from "./Prescriptions";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import ReBottomSheet from "../ui/ReBottomSheet";
import HealthTips from "./HealthTips";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModalTitle, setCurrentModalTitle] = useState("");
  const insets = useSafeAreaInsets();
  const { handleModal } = useSheetState();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const animatedIndex = useSharedValue(0);

  const snapPoints = useMemo(() => ["100%"], []);

  const handleCloseRateSheet = () => {
    bottomSheetRef.current.close();
  };

  const handleOpenRecentsSheet = () => {
    setCurrentModalTitle("Recents");
    setModalVisible(true);
  };

  const handleOpenFavoritesSheet = () => {
    setCurrentModalTitle("Favorites");
    setModalVisible(true);
  };

  const handleOnChange = useCallback((index: number) => {
    if (index === -1) {
      handleModal(false);
      setModalVisible(false);
    }
  }, []);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0], //range of the inputs
      [0, 0.5], //range of the outputs
      Extrapolation.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      {
        backgroundColor: "#000",
      },
      containerAnimatedStyle,
    ],
    [containerAnimatedStyle]
  );

  return (
    <>
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Favorites onPressMore={handleOpenFavoritesSheet} />
          <Recents onPressMore={handleOpenRecentsSheet} />
          <Prescriptions onPressMore={handleOpenRecentsSheet} />
          <HealthTips onPressMore={handleOpenRecentsSheet} />
        </Animated.View>
      </BottomSheetScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        statusBarTranslucent={true}
      >
        <View
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Animated.View style={[containerStyle, { flex: 1 }]} />
        </View>
        <ReBottomSheet
          innerRef={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleOnChange}
          animatedIndex={animatedIndex}
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
                {currentModalTitle}
              </Text>
              <CircleButton onPress={handleCloseRateSheet} />
            </View>
            <Spacer space={15} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                paddingLeft: STANDARD_PADDING,
                paddingRight: STANDARD_PADDING,
              }}
            >
              <Group noHeader>
                <Card
                  sx={{ display: "flex", flexDirection: "column" }}
                  noPadding
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <View key={i}>
                        <MenuItem
                          title={`Hospital Name - ${i}`}
                          subTitle="1.2 mi"
                          startAdornment={{
                            component: (
                              <MaterialCommunityIcons
                                name="pin"
                                size={16}
                                color="white"
                              />
                            ),
                            color: IOS_ORANGE,
                          }}
                        />
                        {i < 5 - 1 && <Divider noSpacing />}
                      </View>
                    ))}
                </Card>
              </Group>
            </View>
          </View>
        </ReBottomSheet>
      </Modal>
    </>
  );
};

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

export default Home;
