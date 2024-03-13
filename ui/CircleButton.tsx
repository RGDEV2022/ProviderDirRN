import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IOS_GRAY, IOS_TEXT_GRAY } from "../constants";
import Spacer from "./Spacer";

interface IButtonProps extends TouchableOpacityProps {
  color?: string;
  width?: number;
  height?: number;
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
}

const CircleButton = (props: IButtonProps) => {
  const { color, width, height, size, children, title, subTitle } = props;

  const buttonSize = props.size
    ? props.size === "small"
      ? 25
      : props.size === "medium"
      ? 35
      : 45
    : 50;

  const buttonColor = color ? color : IOS_GRAY;

  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: buttonColor ? buttonColor : IOS_GRAY,
            height: size ? buttonSize : height ? height : 22,
            width: size ? buttonSize : width ? width : 22,
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
          {children ? (
            children
          ) : (
            <MaterialCommunityIcons name="close" size={15} color="white" />
          )}
        </View>
        {title && <Spacer space={6} />}
        {title && (
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "400",
              width: 75,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
        {subTitle && <Spacer space={4} />}
        {subTitle && (
          <Text
            style={{ color: IOS_TEXT_GRAY, fontSize: 11, fontWeight: "600" }}
          >
            {subTitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CircleButton;
