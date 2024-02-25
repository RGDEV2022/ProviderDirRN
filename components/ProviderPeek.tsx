import Provider from "../ui/Provider";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Card from "../ui/Card";
import Spacer from "../ui/Spacer";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FlexContainer from "../ui/FlexContainer";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useModalState from "../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PROVIDER_DATA } from "../constants";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface IProviderPeekProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  targetPosition: { y: number };
}

const ProviderPeek = (props: IProviderPeekProps) => {
  const { modalVisible, setModalVisible, targetPosition } = props;
  const { handleModal } = useModalState();
  const insets = useSafeAreaInsets();

  const handleCloseModal = () => {
    setModalVisible(false);
    handleModal(false);
  };

  return (
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
        style={{
          position: "absolute",
          width: "100%",
          top: targetPosition?.y,
          display: "flex",
          alignItems: "center",
          flex: 1,
          gap: 8,
        }}
      >
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
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
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="car" size={22} color="white" />
              </View>
              <Text style={styles.buttonText}>1.2 miles</Text>
            </View>
          </Button>

          <Button uniform>
            <View style={styles.buttonStyle}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="phone" size={19} color="white" />
              </View>
              <Text style={styles.buttonText}>Call</Text>
            </View>
          </Button>

          <Button uniform>
            <View style={styles.buttonStyle}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="share" size={22} color="white" />
              </View>
              <Text style={styles.buttonText}>Share</Text>
            </View>
          </Button>
        </FlexContainer>
      </View>
    </Modal>
  );
};

export default ProviderPeek;

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
    justifyContent: "space-between",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 22,
    overflow: "hidden",
  },
});
