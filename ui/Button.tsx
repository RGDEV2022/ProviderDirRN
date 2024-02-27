import { Pressable, PressableProps } from "react-native";
import { IOS_BLUE, IOS_GRAY } from "../constants";

interface IButtonProps extends PressableProps {
  variant?: "primary" | "secondary";
  uniform?: boolean;
  sx?: PressableProps["style"];
  color?: string;
  active?: boolean;
  width?: number;
  height?: number;
  size?: "small" | "medium" | "large";
}

const Button = (props: IButtonProps) => {
  const { variant, uniform, sx, color, active, width, height, size } = props;

  const buttonSize = props.size
    ? props.size === "small"
      ? 25
      : props.size === "medium"
      ? 40
      : 50
    : 50;

  const buttonColor = color
    ? color
    : variant === "primary"
    ? IOS_BLUE
    : IOS_GRAY;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: size ? buttonSize : width ? width : uniform ? 65 : undefined,
          height: size
            ? buttonSize
            : height
            ? height
            : uniform
            ? 50
            : undefined,
          backgroundColor: pressed ? "#222222" : buttonColor,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: uniform ? 0 : 10,
          paddingRight: uniform ? 0 : 10,
          borderRadius: 10,
          opacity: active ? 0.5 : 1,
          sx,
        },
      ]}
      {...props}
    >
      {props.children}
    </Pressable>
  );
};

export default Button;
