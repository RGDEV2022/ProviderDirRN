import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { DARK_BG_COLOR_VALUE } from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";
import Avatar from "../ui/Avatar";
import FilterBar from "./FilterBar";
import Divider from "../ui/Divider";
import { STANDARD_PADDING } from "../constants";

import ProviderList from "./ProviderList";
import Backdrop from "../ui/Backdrop";
import Favorites from "./Favorites";

const TransitionViews = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["15%", "50%", "100%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current.snapToIndex(index);
  }, []);

  const extendSheet = (type: "full" | "small") =>
    bottomSheetRef.current.snapToIndex(type === "full" ? 2 : 1);

  return (
    <BottomSheet
      topInset={insets.top}
      handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      backgroundComponent={({ style }) => (
        <View
          style={[
            style,
            {
              backgroundColor: `rgba(${DARK_BG_COLOR_VALUE},0.9)`,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: "hidden",
            },
          ]}
        >
          <BlurView
            intensity={50}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={(props) => <Backdrop {...props} />}
    >
      <StickyHeader extendSheet={extendSheet} showFilter={false} />
      <Favorites />
      {/* <ProviderList /> */}
    </BottomSheet>
  );
};

const StickyHeader = ({
  extendSheet,
  showFilter = true,
}: {
  extendSheet: (type: "full" | "small") => void;
  showFilter?: boolean;
}) => {
  return (
    <View>
      <View
        style={{
          paddingLeft: STANDARD_PADDING,
          paddingRight: STANDARD_PADDING,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <SearchBar onPressIn={() => extendSheet("full")} />
          <Avatar type="user" size="medium" />
        </View>
      </View>
      {showFilter && (
        <>
          <FilterBar />
          <Divider />
        </>
      )}
    </View>
  );
};

export default TransitionViews;
