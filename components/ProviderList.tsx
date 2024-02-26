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

const ProviderList = () => {
  const flatListRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);
  const [componentHeight, setComponentHeight] = useState(null);
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const { handleModal } = useModalState();

  const handleOpenProvider = (e: GestureResponderEvent, locationID: string) => {
    const { pageY, locationY } = e.nativeEvent;
    const yPosition = pageY - locationY;
    setTargetPosition({ y: yPosition });
    setModalVisible(true);
    handleModal(true);
  };

  const handleSetHeight = (e: LayoutChangeEvent, locationID: string) => {
    const height = e?.nativeEvent?.layout?.height;
    setComponentHeight((prev) => ({
      ...prev,
      [locationID]: height,
    }));
  };

  const ProviderItem = ({ item }) => {
    return (
      <AnimatedPressable
        key={item.locationID}
        onLayout={(e) => handleSetHeight(e, item.locationID)}
        onLongPress={(e) => handleOpenProvider(e, item.locationID)}
        delayLongPress={TRANSITION_DURATION}
      >
        <PaddedContainer>
          <Provider
            title={item.title}
            group={item.group}
            acceptNewPatients={item.acceptNewPatients}
            address={item.address}
            type={item.type}
            distance={item.distance}
            phone={item.phone}
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
        data={PROVIDER_DATA}
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
