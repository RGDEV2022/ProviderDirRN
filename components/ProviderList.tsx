import {
  BottomSheetFlatList,
  BottomSheetModal,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import PaddedContainer from "../ui/PaddedContainer";
import Provider from "../ui/Provider";
import Divider from "../ui/Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import Card from "../ui/Card";
import Spacer from "../ui/Spacer";
import useModalState from "../store/store";
import AnimatedPressable from "../ui/AnimatedPressable";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

type ProviderCardProps = {
  title: string;
  group: string;
  address: string;
  type: "hospital" | "individual";
  distance: string;
  phone: string;
  specialties: string[];
};

const ProviderList = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { handleModal } = useModalState();

  const handleCloseModal = () => {
    bottomSheetModalRef.current?.close();
    handleModal(false);
  };

  const handleOpenProvider = () => {
    bottomSheetModalRef.current?.present();
    handleModal(true);
  };

  return (
    <>
      <BottomSheetFlatList
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
        renderItem={({ item }) => (
          <AnimatedPressable onLongPress={() => handleOpenProvider()}>
            <PaddedContainer>
              <Provider
                title={item.title}
                group={item.group}
                address={item.address}
                type={item.type}
                distance={item.distance}
                phone={item.phone}
                specialties={item.specialties}
              />
            </PaddedContainer>
          </AnimatedPressable>
        )}
        keyExtractor={(item, i) => `${item.title}-${i}`}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        animateOnMount={false}
        index={0}
        snapPoints={["100%"]}
        backgroundComponent={({ style }) => (
          <AnimatedBlurView
            entering={FadeIn}
            exiting={FadeOut}
            intensity={50}
            tint="dark"
            style={[style]}
          />
        )}
      >
        <View style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Pressable
            style={{
              position: "absolute",
              top: insets.top,
              right: 15,
            }}
            onPress={handleCloseModal}
          >
            <Text style={{ color: "#fff" }}>X</Text>
          </Pressable>
          <Spacer space={insets.top + 50} />
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              width: "100%",
            }}
          >
            <Card>
              <Provider
                title={PROVIDER_DATA[0].title}
                group={PROVIDER_DATA[0].group}
                address={PROVIDER_DATA[0].address}
                type={PROVIDER_DATA[0].type}
                distance={PROVIDER_DATA[0].distance}
                phone={PROVIDER_DATA[0].phone}
                specialties={PROVIDER_DATA[0].specialties}
              />
            </Card>
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
};

const PROVIDER_DATA: ProviderCardProps[] = [
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
];

export default ProviderList;
