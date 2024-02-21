import { View } from "react-native";

interface IFlexContainerProps {
  children?: React.ReactNode;
  flexDirection?: "row" | "column";
}

const FlexContainer = (props: IFlexContainerProps) => {
  const { flexDirection, children } = props;
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: flexDirection || "column",
        gap: 8,
      }}
    >
      {children}
    </View>
  );
};

export default FlexContainer;
