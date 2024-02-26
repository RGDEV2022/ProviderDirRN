import { View, StyleSheet } from "react-native";
import { VERTICAL_PADDING } from "../constants";

const Divider = ({
  noSpacing,
  orientation = "horizontal",
}: {
  noSpacing?: boolean;
  orientation?: "vertical" | "horizontal";
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          marginTop: noSpacing ? 0 : VERTICAL_PADDING,
          width: orientation === "vertical" ? 0.3 : "100%",
          height: orientation === "horizontal" ? 0.3 : "80%",
        },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    backgroundColor: "#fff",
    opacity: 0.3,
  },
});
