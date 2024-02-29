import { FlatList, Pressable, View, Text } from "react-native";
import Card from "../ui/Card";
import Group from "../ui/Group";
import {
  IOS_GRAY,
  IOS_RED,
  IOS_TEXT_GRAY,
  STANDARD_PADDING,
} from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../ui/Spacer";
import Divider from "../ui/Divider";

type TFavorites = {
  onPressMore?: () => void;
};

const Recents = ({ onPressMore }: TFavorites) => {
  return (
    <Group title="Recents" onPressMore={onPressMore}>
      <View
        style={{
          display: "flex",
          paddingLeft: STANDARD_PADDING,
          paddingRight: STANDARD_PADDING,
        }}
      >
        <Spacer space={8} />

        <Card sx={{ display: "flex", flexDirection: "column" }} noPadding>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <View>
                <RecentItem title={`Hospital Name - ${i}`} subTitle="1.2 mi" />
                {i < 5 - 1 && <Divider noSpacing />}
              </View>
            ))}
        </Card>
      </View>
    </Group>
  );
};

const RecentItem = ({
  title,
  subTitle,
  onPress,
}: {
  title: string;
  subTitle: string;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          display: "flex",
          flexDirection: "row",
          gap: 10,
          backgroundColor: pressed ? IOS_GRAY : "transparent",
          padding: 12,
        },
      ]}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          width: 25,
          height: 25,
          backgroundColor: IOS_RED,
        }}
      >
        <MaterialCommunityIcons name="pin" size={16} color="white" />
      </View>
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

export default Recents;
