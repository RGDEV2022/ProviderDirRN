import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PaddedContainer from "../ui/PaddedContainer";
import Divider from "../ui/Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import useSheetState from "../store/store";
import AnimatedPressable from "../ui/AnimatedPressable";
import { IOS_GRAY, PROVIDER_DATA, TRANSITION_DURATION } from "../constants";
import ProviderPeek from "./ProviderPeek";
import { GestureResponderEvent, Text, View } from "react-native";
import { useIsMutating, useMutationState } from "@tanstack/react-query";
import Suggestion from "../ui/Suggestion";
import { formattedAddress } from "../helpers/formattedAddress";
import { TGetSearchSuggestionsOut } from "../test/apiCalls";
import { BlurView } from "expo-blur";

type THeaderIndex = {
  type: "specialty" | "provider";
  index: number;
};

type TPeekProviderData = {
  locationId: number;
  title: string;
  address: string;
  specialties: string[];
};

const SuggestionList = () => {
  const flatListRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);
  const [headerIndexes, setHeaderIndexes] = useState<THeaderIndex[]>([]);
  const [injectedData, setInjectedData] =
    useState<TGetSearchSuggestionsOut | null>(null);
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const { handleModal } = useSheetState();
  const searchSuggestionData = useMutationState({
    filters: { mutationKey: ["getSearchSuggestions"] },
    select: (state) => state.state.data,
  });
  const [peekProviderData, setPeekProviderData] =
    useState<TPeekProviderData | null>(null);

  const isMutating = useIsMutating({ mutationKey: ["getSearchSuggestions"] });

  const endIndex = searchSuggestionData?.length - 1;
  const currentData = searchSuggestionData[
    endIndex
  ] as TGetSearchSuggestionsOut;

  const organizedData = currentData?.sort((a, b) => {
    if (a.provider_search_suggestion_type === 2) {
      return -1;
    } else {
      return 1;
    }
  });

  useEffect(() => {
    if (organizedData && organizedData.length > 0) {
      const headerIndexes: THeaderIndex[] = [];

      const hasType2 = organizedData.some(
        (item) => item.provider_search_suggestion_type === 2
      );
      const hasType1 = organizedData.some(
        (item) => item.provider_search_suggestion_type === 1
      );

      const firstType2Index = organizedData.findIndex(
        (item) => item.provider_search_suggestion_type === 1
      );

      hasType1 && headerIndexes.push({ type: "specialty", index: 0 });
      if (hasType2) {
        if (hasType1)
          headerIndexes.push({ type: "provider", index: firstType2Index + 1 });
        else headerIndexes.push({ type: "provider", index: 0 });
      }

      setHeaderIndexes(headerIndexes);

      const tempData = [...organizedData];

      headerIndexes.forEach((index) => {
        tempData.splice(index.index, 0, {
          id: "",
          provider_search_suggestion_type: 3,
          description: index.type === "specialty" ? "Specialty" : "Provider",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          specialties: [],
          entity_type_code: "",
          hospital_based_provider: false,
        });
      });
      setInjectedData(tempData);
    }
  }, [organizedData]);

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

  const { setIsMainSheetOpen, setSelectedProviderID, setIsProviderSheetOpen } =
    useSheetState();
  const handleOpenProvider = (id: number) => {
    setSelectedProviderID(id);
    setIsProviderSheetOpen(true);
    setIsMainSheetOpen(false);
  };

  const SuggestionItem = ({ item }) => {
    const address = formattedAddress(item);
    const isHeader = item.provider_search_suggestion_type === 3;
    const isIndividual = item.provider_search_suggestion_type === 2;

    const peekData: TPeekProviderData = {
      locationId: item.id,
      title: item.description,
      address: address,
      specialties: item.specialties,
    };

    return (
      <AnimatedPressable
        key={item.id}
        onLongPress={(e) => handlePeekProvider(e, peekData)}
        onPress={() => handleOpenProvider(item.id)}
        delayLongPress={200}
        disabled={isHeader || isIndividual}
      >
        {isHeader ? (
          <View
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
                backgroundColor: "rgba(0,0,0,0.1)",
                paddingTop: 6,
                paddingBottom: 6,
                textAlign: "center",
              }}
            >
              {item.description}
            </Text>
            <BlurView
              intensity={50}
              tint="dark"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              }}
            />
          </View>
        ) : (
          <PaddedContainer>
            <Suggestion
              description={item.description}
              address={address}
              type={item.provider_search_suggestion_type}
              specialties={item.specialties}
            />
          </PaddedContainer>
        )}
      </AnimatedPressable>
    );
  };

  return (
    <>
      <BottomSheetFlatList
        ref={flatListRef}
        data={injectedData || []}
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
        renderItem={SuggestionItem}
        keyExtractor={(item, i) => `${item.title}-${i}`}
        stickyHeaderIndices={headerIndexes.map((item) => item.index + 1)}
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
    </>
  );
};

export default SuggestionList;
