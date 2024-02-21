import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { DARK_BG_COLOR_VALUE } from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import FlexContainer from "../ui/FlexContainer";
import PaddedContainer from "../ui/PaddedContainer";
import Provider from "../ui/Provider";
import SearchBar from "./SearchBar";
import Avatar from "../ui/Avatar";
import FilterBar from "./FilterBar";
import Divider from "../ui/Divider";
import { STANDARD_PADDING } from "../constants";

import ProviderList from "./ProviderList";

const TransitionViews = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

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
    >
      <StickyHeader extendSheet={extendSheet} />
      <ProviderList />
    </BottomSheet>
  );
};

const StickyHeader = ({
  extendSheet,
}: {
  extendSheet: (type: "full" | "small") => void;
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
      <FilterBar />
      <Divider />
    </View>
  );
};

export default TransitionViews;
