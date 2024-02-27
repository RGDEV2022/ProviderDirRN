import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IOS_GRAY, IOS_LIGHT_GRAY } from "../constants";

const CircleButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: IOS_GRAY,
          height: 22,
          width: 22,
          borderRadius: 100,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <MaterialCommunityIcons name="close" size={15} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default CircleButton;
