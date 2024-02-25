import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import PaddedContainer from "../ui/PaddedContainer";
import Provider from "../ui/Provider";
import Divider from "../ui/Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Card from "../ui/Card";
import Spacer from "../ui/Spacer";
import useModalState from "../store/store";
import AnimatedPressable from "../ui/AnimatedPressable";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FlexContainer from "../ui/FlexContainer";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

type ProviderCardProps = {
  title: string;
  group: string;
  address: string;
  type: "hospital" | "individual";
  distance: string;
  phone: string;
  acceptNewPatients: boolean;
  specialties: string[];
};

const ProviderList = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const { handleModal } = useModalState();

  const handleCloseModal = () => {
    setModalVisible(false);
    handleModal(false);
  };

  const handleOpenProvider = () => {
    setModalVisible(true);
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
                acceptNewPatients={item.acceptNewPatients}
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
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <AnimatedBlurView
          entering={FadeIn}
          exiting={FadeOut}
          intensity={50}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Pressable
          style={{
            position: "absolute",
            top: insets.top,
            right: 15,
            zIndex: 2,
          }}
          onPress={handleCloseModal}
        >
          <Text style={{ color: "#fff" }}>X</Text>
        </Pressable>
        <Spacer space={insets.top + 50} />
        <View
          style={{ display: "flex", alignItems: "center", flex: 1, gap: 8 }}
        >
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
                acceptNewPatients={PROVIDER_DATA[0].acceptNewPatients}
                specialties={PROVIDER_DATA[0].specialties}
                fullCard
              />
            </Card>
          </View>
          <FlexContainer flexDirection="row">
            <Button variant="primary" uniform>
              <View style={styles.buttonStyle}>
                <MaterialCommunityIcons name="car" size={22} color="white" />
                <Text style={styles.buttonText}>1.2 miles</Text>
              </View>
            </Button>

            <Button uniform>
              <View style={styles.buttonStyle}>
                <MaterialCommunityIcons name="phone" size={19} color="white" />
                <Text style={styles.buttonText}>Call</Text>
              </View>
            </Button>

            <Button uniform>
              <View style={styles.buttonStyle}>
                <MaterialCommunityIcons name="share" size={22} color="white" />
                <Text style={styles.buttonText}>Share</Text>
              </View>
            </Button>
          </FlexContainer>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
  },
  buttonStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

const PROVIDER_DATA: ProviderCardProps[] = [
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    acceptNewPatients: true,
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
];

export default ProviderList;
