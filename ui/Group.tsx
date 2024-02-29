import { View, Text } from "react-native";
import Link from "./Link";
import { IOS_TEXT_GRAY, STANDARD_PADDING } from "../constants";

const Group = ({
  children,
  title,
  onPressMore,
}: {
  children?: React.ReactNode;
  title: string;
  onPressMore: () => void;
}) => {
  return (
    <View style={{ width: "100%", height: "auto" }}>
      <View
        style={{
          paddingTop: STANDARD_PADDING + 5,
          paddingLeft: STANDARD_PADDING,
          paddingRight: STANDARD_PADDING,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "bold", color: IOS_TEXT_GRAY }}
          >
            {title}
          </Text>
          <Link text="More" onPress={onPressMore} />
        </View>
      </View>
      {children}
    </View>
  );
};

export default Group;
