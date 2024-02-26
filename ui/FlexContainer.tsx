import { View } from "react-native";

interface IFlexContainerProps {
  children?: React.ReactNode;
  flexDirection?: "row" | "column";
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: number;
}

const FlexContainer = (props: IFlexContainerProps) => {
  const { flexDirection, alignItems, justifyContent, gap, children } = props;
  return (
    <View
      style={{
        display: "flex",
        alignItems: alignItems || "center",
        justifyContent: justifyContent || "flex-start",
        flexDirection: flexDirection || "column",
        gap: gap || 8,
      }}
    >
      {children}
    </View>
  );
};

export default FlexContainer;
