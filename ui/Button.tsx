import { Pressable, PressableProps } from "react-native";

interface IButtonProps extends PressableProps {
  variant?: "primary" | "secondary";
  uniform?: boolean;
  //extra style props
  sx?: PressableProps["style"];
}

const Button = (props: IButtonProps) => {
  const { variant, uniform, sx } = props;

  const buttonColor = variant === "primary" ? "#007AFF" : "#474747";

  return (
    <Pressable
      style={({ pressed }) => [
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: uniform ? 60 : "auto",
          height: uniform ? 40 : 40,
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
        },
        { sx },
      ]}
      {...props}
    >
      {props.children}
    </Pressable>
  );
};

export default Button;
