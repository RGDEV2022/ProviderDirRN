import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { DARK_BG_COLOR_VALUE, IOS_BUTTON_GRAY, IOS_GRAY } from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";
import Avatar from "../ui/Avatar";
import FilterBar from "./FilterBar";
import Divider from "../ui/Divider";
import { STANDARD_PADDING } from "../constants";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import ProviderList from "./ProviderList";
import Backdrop from "../ui/Backdrop";
import Favorites from "./Favorites";
import Recents from "./Recents";
import Home from "./Home";
import ReBottomSheet from "../ui/ReBottomSheet";
import { SharedValue } from "react-native-reanimated";
import Link from "../ui/Link";
import { useMutation } from "@tanstack/react-query";
import {
  TGetSearchSuggestionsIn,
  TGetSearchSuggestionsOut,
  TProviderSearchOut,
} from "../test/apiCalls";

const TransitionViews = ({
  isDragging,
  animatedIndex,
}: {
  isDragging: boolean;
  animatedIndex?: SharedValue<number>;
}) => {
  const [isSheetExtended, setIsSheetExtended] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["10%", "45%", "100%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current.snapToIndex(index);
    if (index === 2) {
      setIsSheetExtended(true);
    } else {
      setIsSheetExtended(false);
    }
  }, []);

  const extendSheet = (type: "full" | "small") => {
    bottomSheetRef.current.snapToIndex(type === "full" ? 2 : 1);
  };

  useEffect(() => {
    if (isDragging) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [isDragging]);

  return (
    <ReBottomSheet
      backgroundComponent={({ style }) => (
        <View
          style={[
            style,
            {
              backgroundColor: `rgba(${DARK_BG_COLOR_VALUE},0.7)`,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: "hidden",
            },
          ]}
        >
          <BlurView
            intensity={30}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}
      innerRef={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={(props) => (
        <Backdrop appearAfterIndex={1} {...props} />
      )}
      animatedIndex={animatedIndex}
      enablePanDownToClose={false}
    >
      <Header
        extendSheet={extendSheet}
        showFilter={false}
        isSheetExtended={isSheetExtended}
        setIsSheetExtended={setIsSheetExtended}
      />
      {isSheetExtended ? <ProviderList /> : <Home />}
    </ReBottomSheet>
  );
};

const Header = ({
  extendSheet,
  showFilter = true,
  isSheetExtended,
  setIsSheetExtended,
}: {
  extendSheet: (type: "full" | "small") => void;
  showFilter?: boolean;
  isSheetExtended?: boolean;
  setIsSheetExtended?: (value: boolean) => void;
}) => {
  const [suggestions, setSuggestions] = useState<TGetSearchSuggestionsOut>([]);
  const { isPending, data, error, mutateAsync } = useMutation({
    mutationFn: async (params: TGetSearchSuggestionsIn) => {
      const response = await fetch(
        "https://api.evryhealth.com/api/v1/ProviderDirectory/GetSearchSuggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      const responseJson = (await response.json()) as TGetSearchSuggestionsOut;
      return responseJson;
    },
    onSettled: (data) => {
      if (data && data?.length > 0) {
        setSuggestions(data);
      }
    },
    mutationKey: ["getSearchSuggestions"],
  });

  const getSearchSuggestionsFetch = async (params: TGetSearchSuggestionsIn) => {
    mutateAsync(params);
  };

  const handleInputPress = () => {
    extendSheet("full");
    setIsSheetExtended(true);
  };

  const handleCancel = () => {
    extendSheet("small");
    setIsSheetExtended(false);
  };

  return (
    <>
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
          <SearchBar onPressIn={handleInputPress} />
          {isSheetExtended ? (
            <Link text="Cancel" onPress={handleCancel} />
          ) : (
            <Avatar type="user" size="medium" />
          )}
        </View>
      </View>
      {showFilter && (
        <>
          <FilterBar />
          <Divider />
        </>
      )}
    </>
  );
};

export default TransitionViews;
