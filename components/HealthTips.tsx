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

type THealthTips = {
  onPressMore?: () => void;
};

const HealthTips = ({ onPressMore }: THealthTips) => {
  return (
    <Group title="Health Tips" onPressMore={onPressMore}>
      <Spacer space={8} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: STANDARD_PADDING,
          paddingRight: STANDARD_PADDING + 10,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <HealthTipItem
            title={"Daily Exercise"}
            description="Personalized workouts to help you achieve your fitness goals."
            anim={"exerciseAnim"}
            color={IOS_PURPLE}
          />
          <HealthTipItem
            title={"Mediation Tips"}
            description="Cultivate mindfulness & inner peace through meditation practice."
            anim={"meditateAnim"}
            color={IOS_YELLOW}
          />
          <HealthTipItem
            title={"Benefits of a Pet"}
            description="Discover the benefit of a pet to improve mental well-being."
            anim={"dogAnim"}
            color={IOS_RED}
          />
        </View>
      </ScrollView>
    </Group>
  );
};

const healthTipAnims = {
  exerciseAnim: require("../animations/exerciseAnim.json"),
  meditateAnim: require("../animations/meditateAnim.json"),
  dogAnim: require("../animations/dogAnim.json"),
};

type THealthTipItem = keyof typeof healthTipAnims;

const HealthTipItem = ({
  title,
  description,
  anim,
  color,
}: {
  title: string;
  description: string;
  anim: THealthTipItem;
  color: string;
}) => {
  const navigation = useNavigation();

  return (
    <Card color={color} noPadding sx={{ height: 170, width: 160 }}>
      <View style={{ display: "flex", flex: 1 }}>
        <Animated.View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            flex: 1,
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
            source={healthTipAnims[anim]}
          />
        </Animated.View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
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
            {title}
          </Text>
          <Text
            style={{
              color: "rgb(225,225,225)",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default HealthTips;
