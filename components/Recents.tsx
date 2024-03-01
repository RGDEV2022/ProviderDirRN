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
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <View>
                <MenuItem
                  title={`Hospital Name - ${i}`}
                  subTitle="1.2 mi"
                  startAdornment={{
                    component: (
                      <MaterialCommunityIcons
                        name="pin"
                        size={16}
                        color="white"
                      />
                    ),
                    color: IOS_RED,
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
