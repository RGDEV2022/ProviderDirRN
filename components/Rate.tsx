import { View } from "react-native";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IOS_GRAY, IOS_GREEN, IOS_ORANGE, IOS_RED } from "../constants";
import { useState } from "react";
import LottieView from "lottie-react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type TIconNames = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const Rate = () => {
  const [activeEmotion, setActiveEmotion] = useState<TIconNames | null>(null);

  const handleEmotionPress = (emotion: TIconNames) => {
    setActiveEmotion((prev) => (prev === emotion ? null : emotion));
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 15,
      }}
    >
      <EmotionButton
        color={IOS_GREEN}
        iconName="emoticon-happy"
        onPress={() => handleEmotionPress("emoticon-happy")}
        activeEmotion={activeEmotion}
      />
      <EmotionButton
        color={IOS_ORANGE}
        iconName="emoticon-neutral"
        onPress={() => handleEmotionPress("emoticon-neutral")}
        activeEmotion={activeEmotion}
      />
      <EmotionButton
        color={IOS_RED}
        iconName="emoticon-angry"
        onPress={() => handleEmotionPress("emoticon-angry")}
        activeEmotion={activeEmotion}
      />
    </View>
  );
};

const EmotionButton = ({
  iconName,
  color,
  onPress,
  isPressed,
  activeEmotion,
}: {
  iconName: TIconNames;
  color: string;
  onPress: () => void;
  isPressed?: boolean;
  activeEmotion?: TIconNames;
}) => {
  const emotionAnimation = {
    "emoticon-happy": require("../animations/happyAnim.json"),
    "emoticon-neutral": require("../animations/neutralAnim.json"),
    "emoticon-angry": require("../animations/angryAnim.json"),
  };

  const isActive = activeEmotion === iconName;

  return (
    <Button color={isActive ? IOS_GRAY : color} size="large" onPress={onPress}>
      {!isActive ? (
        <MaterialCommunityIcons name={iconName} size={30} color="white" />
      ) : (
        <Animated.View
          entering={FadeIn}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <LottieView
            autoPlay
            style={{
              width: 40,
              height: 40,
              backgroundColor: "transparent",
            }}
            source={emotionAnimation[iconName]}
          />
        </Animated.View>
      )}
    </Button>
  );
};

export default Rate;
