import Favorites from "./Favorites";
import Recents from "./Recents";
import { View, Text, StyleSheet } from "react-native";
import useModalState from "../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DARK_BG_COLOR_VALUE } from "../constants";
import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import CircleButton from "../ui/CircleButton";
import Spacer from "../ui/Spacer";
import Backdrop from "../ui/Backdrop";

const Home = () => {
  const [currentModalTitle, setCurrentModalTitle] = useState("");
  const { handleModal } = useModalState();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["100%"], []);

  const handleCloseRateSheet = () => {
    bottomSheetRef.current.close();
  };

  const handleOpenRecentsSheet = () => {
    setCurrentModalTitle("Recents");
    bottomSheetRef.current?.present();
    handleModal(true);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleOpenFavoritesSheet = () => {
    setCurrentModalTitle("Favorites");
    bottomSheetRef.current?.present();
    handleModal(true);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleSheetChanges = useCallback((index: number) => {
    index === -1 && handleModal(false);
  }, []);

  return (
    <>
      <View>
        <Favorites onPressMore={handleOpenFavoritesSheet} />
        <Recents onPressMore={handleOpenRecentsSheet} />
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        index={0}
        snapPoints={snapPoints}
        topInset={insets.top}
        enablePanDownToClose
        backgroundStyle={styles.bottomSheetContainer}
        backdropComponent={(props) => <Backdrop {...props} />}
        onChange={handleSheetChanges}
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: 15,
            }}
          ></View>
        </View>
      </BottomSheetModal>
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
