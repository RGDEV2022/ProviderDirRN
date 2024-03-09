import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PaddedContainer from "../ui/PaddedContainer";
import Provider from "../ui/Provider";
import Divider from "../ui/Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import useModalState from "../store/store";
import AnimatedPressable from "../ui/AnimatedPressable";
import { PROVIDER_DATA, TRANSITION_DURATION } from "../constants";
import ProviderPeek from "./ProviderPeek";
import { GestureResponderEvent, LayoutChangeEvent } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useIsMutating, useMutationState } from "@tanstack/react-query";
import Suggestion from "../ui/Suggestion";
import { formattedAddress } from "../helpers/formattedAddress";

const ProviderList = () => {
  const flatListRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);

  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const { handleModal } = useModalState();
  const searchSuggestionData = useMutationState({
    filters: { mutationKey: ["getSearchSuggestions"] },
    select: (state) => state.state.data,
  });
  const isMutating = useIsMutating({ mutationKey: ["getSearchSuggestions"] });

  const endIndex = searchSuggestionData?.length - 1;

  const handleOpenProvider = (e: GestureResponderEvent, locationID: string) => {
    const { pageY, locationY } = e.nativeEvent;
    const yPosition = pageY - locationY;
    setTargetPosition({ y: yPosition });
    setModalVisible(true);
    handleModal(true);
  };

  const ProviderItem = ({ item }) => {
    const address = formattedAddress(item);
    return (
      <AnimatedPressable
        key={item.locationID}
        onLongPress={(e) => handleOpenProvider(e, item.locationID)}
        delayLongPress={TRANSITION_DURATION}
      >
        <PaddedContainer>
          <Suggestion
            description={item.description}
            address={address}
            type={item.provider_search_suggestion_type}
            specialties={item.specialties}
          />
        </PaddedContainer>
      </AnimatedPressable>
    );
  };

  return (
    <>
      <BottomSheetFlatList
        ref={flatListRef}
        data={(searchSuggestionData[endIndex] as []) || []}
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
        keyExtractor={(item, i) => `${item.title}-${i}`}
      />
      {modalVisible ? (
        <ProviderPeek
          setModalVisible={setModalVisible}
          targetPosition={targetPosition}
        />
      ) : null}
    </>
  );
};

export default ProviderList;
