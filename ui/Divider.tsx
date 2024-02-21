import { View, StyleSheet } from "react-native";
import { VERTICAL_PADDING } from "../constants";

const Divider = ({ noSpacing }: { noSpacing?: boolean }) => {
  return (
    <View
      style={[styles.divider, { marginTop: noSpacing ? 0 : VERTICAL_PADDING }]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 0.3,
    backgroundColor: "#fff",
    opacity: 0.8,
  },
});
