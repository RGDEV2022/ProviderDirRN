import { Pressable, View, Text } from "react-native";
import { IOS_GRAY, IOS_RED, IOS_TEXT_GRAY } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MenuItem = ({
  title,
  subTitle,
  onPress,
  startAdornment,
}: {
  title: string;
  subTitle: string;
  onPress?: () => void;
  startAdornment?: { component: React.ReactNode; color: string };
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: pressed ? IOS_GRAY : "transparent",
          padding: 12,
        },
      ]}
    >
      {startAdornment?.component && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            width: 25,
            height: 25,
            backgroundColor: startAdornment?.color || IOS_RED,
          }}
        >
          {startAdornment?.component && (
            <MaterialCommunityIcons name="pin" size={16} color="white" />
          )}
        </View>
      )}
      <View>
        <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
          {title}
        </Text>
        <Text style={{ color: IOS_TEXT_GRAY, fontSize: 12, fontWeight: "600" }}>
          {subTitle}
        </Text>
      </View>
    </Pressable>
  );
};

export default MenuItem;
