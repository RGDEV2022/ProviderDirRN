import { FlatList, Pressable, View, Text } from "react-native";
import Card from "../ui/Card";
import Group from "../ui/Group";
import {
  IOS_GRAY,
  IOS_RED,
  IOS_TEXT_GRAY,
  RECENTS,
  STANDARD_PADDING,
} from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../ui/Spacer";
import Divider from "../ui/Divider";
import MenuItem from "../ui/MenuItem";

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
          {RECENTS.map((item, i) => (
            <View>
              <MenuItem
                title={item.title}
                subTitle={item.distance}
                startAdornment={{
                  component: item.icon(16),
                  color: item.color,
                }}
              />
              {i < 5 - 1 && <Divider noSpacing />}
            </View>
          ))}
        </Card>
      </View>
    </Group>
  );
};

export default Recents;
