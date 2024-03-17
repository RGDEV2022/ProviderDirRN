import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  DARK_BG_COLOR_VALUE,
  IOS_BUTTON_GRAY,
  IOS_GRAY,
  IOS_TEXT_GRAY,
  TRANSITION_DURATION,
} from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";
import Avatar from "../ui/Avatar";
import FilterBar from "./FilterBar";
import Divider from "../ui/Divider";
import { STANDARD_PADDING } from "../constants";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import Backdrop from "../ui/Backdrop";
import Favorites from "./Favorites";
import Recents from "./Recents";
import Home from "./Home";
import ReBottomSheet from "../ui/ReBottomSheet";
import { SharedValue } from "react-native-reanimated";
import Link from "../ui/Link";
import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  TGetSearchSuggestionsIn,
  TGetSearchSuggestionsOut,
  TProviderSuggestionOut,
  TProviderSearch,
  TProviderSearchOut,
  providerSearchIn,
} from "../test/apiCalls";
import useDebounce from "../hooks/useDebounce";
import SuggestionList from "./SuggestionList";
import Provider from "../ui/Provider";
import useSheetState, { useSearchState } from "../store/store";
import { formattedAddress } from "../helpers/formattedAddress";
import Spacer from "../ui/Spacer";
import PaddedContainer from "../ui/PaddedContainer";
import Suggestion from "../ui/Suggestion";
import AnimatedPressable from "../ui/AnimatedPressable";
import ProviderPeek from "./Peek";
import CircleButton from "../ui/CircleButton";

type TPeekProviderData = {
  locationId: number;
  title: string;
  address: string;
  specialties: string[];
};

const ResultsSheet = ({
  isDragging,
  animatedIndex,
}: {
  isDragging: boolean;
  animatedIndex?: SharedValue<number>;
}) => {
  const queryClient = useQueryClient();
  const flatListRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);
  const [peekProviderData, setPeekProviderData] =
    useState<TPeekProviderData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    setIsMainSheetOpen,
    setSelectedProvider,
    handleModal,
    isResultsSheetOpen,
    setIsResultsSheetOpen,
    setIsProviderSheetOpen,
  } = useSheetState();
  const { query, setQuery } = useSearchState();
  const insets = useSafeAreaInsets();

  const { data, isFetching, refetch } = useQuery<TProviderSearchOut>({
    queryKey: ["providerSearch"],
    retryOnMount: false,
    enabled: false,
    queryFn: async () => {
      const response = await fetch(
        "https://api.evryhealth.com/api/v1/ProviderDirectory/ProviderSearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...providerSearchIn, search_string: query }),
        }
      );
      const responseJson = await response.json();
      return responseJson;
    },
  });

  useEffect(() => {
    if (query) refetch();
  }, [query]);

  // const address = formattedAddress(data);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["10%", "45%", "100%"], []);

  useEffect(() => {
    if (isDragging && isResultsSheetOpen) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [isDragging, isResultsSheetOpen]);

  useEffect(() => {}, [data]);

  const handleGoBack = () => {
    queryClient.removeQueries({ queryKey: ["providerSearch"] });
    bottomSheetRef.current.close();
    setIsMainSheetOpen(true);
    setQuery(undefined);
    setIsResultsSheetOpen(false);
  };

  useEffect(() => {
    if (isResultsSheetOpen) {
      bottomSheetRef.current.snapToIndex(1);
    } else {
      bottomSheetRef.current.close();
    }
  }, [isResultsSheetOpen]);

  const handlePeekProvider = (
    e: GestureResponderEvent,
    providerData: TPeekProviderData
  ) => {
    const { pageY, locationY } = e.nativeEvent;
    const yPosition = pageY - locationY;
    setTargetPosition({ y: yPosition });
    setPeekProviderData(providerData);
    setModalVisible(true);
    handleModal(true);
  };

  const handleOpenProvider = (provider: TProviderSearchOut["data"][0]) => {
    const providerDetails: TProviderSuggestionOut = {
      address1: provider.address1,
      address2: provider.address2,
      city: provider.city,
      state: provider.state,
      zip: provider.zip,
      entity_type_code: provider.entity_type_code,
      id: provider.provider_directory_location_id.toString(),
      description: provider.full_name,
      specialties: provider.specialties.map((s) => s.value),
      hospital_based_provider: false,
      provider_search_suggestion_type: 1,
    };
    setSelectedProvider(providerDetails);
    setIsProviderSheetOpen(true);
    setIsMainSheetOpen(false);
    setIsResultsSheetOpen(false);
  };

  const ProviderItem = ({ item }: { item: TProviderSearchOut["data"][0] }) => {
    const address = formattedAddress(item);

    const peekData: TPeekProviderData = {
      locationId: item.provider_directory_location_id,
      title: item.full_name,
      address: address,
      specialties: item.specialties.map((s) => s.value),
    };

    return (
      <AnimatedPressable
        key={item.provider_directory_location_id}
        onLongPress={(e) => handlePeekProvider(e, peekData)}
        onPress={() => handleOpenProvider(item)}
        delayLongPress={TRANSITION_DURATION}
      >
        <PaddedContainer>
          <Suggestion
            description={item.full_name}
            address={address}
            type={item.entity_type_code === "2" ? 2 : 1}
            specialties={item.specialties.map((s) => s.value)}
          />
        </PaddedContainer>
      </AnimatedPressable>
    );
  };

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
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <Backdrop appearAfterIndex={1} {...props} />
      )}
      animatedIndex={animatedIndex}
      enablePanDownToClose={false}
    >
      {data && (
        <View>
          <PaddedContainer>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}
                >
                  {query}
                </Text>
                <Text style={{ fontSize: 12, color: IOS_TEXT_GRAY }}>
                  {data?.total_records} found
                </Text>
              </View>
              <CircleButton onPress={() => handleGoBack()} />
            </View>
          </PaddedContainer>
          <FilterBar />
        </View>
      )}

      <Divider />

      <BottomSheetFlatList
        ref={flatListRef}
        data={data?.data || []}
        ListHeaderComponent={() => <PaddedContainer />}
        bounces={false}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: insets.bottom + 10,
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <PaddedContainer>
            <Divider noSpacing />
          </PaddedContainer>
        )}
        renderItem={ProviderItem}
      />

      {modalVisible ? (
        <ProviderPeek
          title={peekProviderData?.title}
          locationId={peekProviderData?.locationId}
          address={peekProviderData?.address}
          specialties={peekProviderData?.specialties}
          setModalVisible={setModalVisible}
          targetPosition={targetPosition}
        />
      ) : null}
    </ReBottomSheet>
  );
};

export default ResultsSheet;
