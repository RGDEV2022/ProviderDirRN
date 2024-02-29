import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IOS_BLUE, IOS_GRAY } from "../constants";

interface IButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
  text?: string;
}

const Link = (props: IButtonProps) => {
  const { text, disabled } = props;

  const linkColor = disabled ? IOS_GRAY : IOS_BLUE;

  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <Text
        style={{
          color: linkColor,
          fontSize: 14,
          fontWeight: "600",
          opacity: disabled ? 0.9 : 1,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
