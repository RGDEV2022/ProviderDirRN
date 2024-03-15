import { ScrollView, View } from "react-native";
import Card from "../ui/Card";
import Group from "../ui/Group";
import { IOS_BLUE, IOS_RED, RECENTS, STANDARD_PADDING } from "../constants";
import CircleButton from "../ui/CircleButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../ui/Spacer";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

type TFavorites = {
  onPressMore?: () => void;
};

const Favorites = ({ onPressMore }: TFavorites) => {
  return (
    <Group title="Favorites" onPressMore={onPressMore}>
      <Spacer space={8} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginLeft: STANDARD_PADDING }}
      >
        <Card>
          <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
            {RECENTS.map((item, i) => {
              const icon = item.icon(24);
              return (
                <CircleButton
                  key={`${item.title}-${i}`}
                  size="large"
                  color={item.color}
                  title={item.title}
                  subTitle={item.distance}
                >
                  {icon}
                </CircleButton>
              );
            })}
          </View>
        </Card>
      </ScrollView>
    </Group>
  );
};

export default Favorites;
