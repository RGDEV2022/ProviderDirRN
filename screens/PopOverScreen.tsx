import { ScrollView, View, Text } from "react-native";
import Card from "../ui/Card";
import Group from "../ui/Group";
import {
  IOS_PURPLE,
  IOS_RED,
  IOS_YELLOW,
  STANDARD_PADDING,
} from "../constants";
import Spacer from "../ui/Spacer";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const healthTipAnims = {
  exerciseAnim: require("../animations/exerciseAnim.json"),
  meditateAnim: require("../animations/meditateAnim.json"),
  dogAnim: require("../animations/dogAnim.json"),
};

const PopOverScreen = ({
  headerComponent,
  bodyComponent,
}: {
  headerComponent: React.ReactNode;
  bodyComponent: React.ReactNode;
}) => {
  return (
    // <View>
    //   {headerComponent}
    //   {bodyComponent}
    // </View>

    <View style={{ display: "flex", flex: 1 }}>
      <Animated.View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: IOS_PURPLE,
        }}
        sharedTransitionTag="healthTipAnim"
      >
        <LottieView
          autoPlay
          resizeMode="cover"
          style={{
            width: 110,
            height: 140,
            backgroundColor: "transparent",
            top: -15,
          }}
          source={healthTipAnims["exerciseAnim"]}
        />
      </Animated.View>
      <View
        style={{
          padding: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <BlurView
          intensity={10}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
          Daily Exercise
        </Text>
        <Text
          style={{
            color: "rgb(225,225,225)",
            fontSize: 12,
            fontWeight: "700",
          }}
        >
          Personalized workouts to help you achieve your fitness goals.
        </Text>
      </View>
    </View>
  );
};

export default PopOverScreen;
