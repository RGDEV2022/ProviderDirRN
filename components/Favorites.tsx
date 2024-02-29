import { ScrollView, View } from "react-native";
import Card from "../ui/Card";
import Group from "../ui/Group";
import { IOS_RED, STANDARD_PADDING } from "../constants";
import CircleButton from "../ui/CircleButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../ui/Spacer";

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
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <CircleButton
                  size="large"
                  color={IOS_RED}
                  title={`Hospital Name - ${i}`}
                  subTitle="1.2 mi"
                >
                  <MaterialCommunityIcons name="pin" size={25} color="white" />
                </CircleButton>
              ))}
          </View>
        </Card>
      </ScrollView>
    </Group>
  );
};

export default Favorites;
