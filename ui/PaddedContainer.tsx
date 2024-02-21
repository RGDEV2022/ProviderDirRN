import { View, ViewProps } from "react-native";
import { STANDARD_PADDING } from "../constants";

const PaddedContainer = (props: ViewProps) => {
  return (
    <View
      style={{ paddingLeft: STANDARD_PADDING, paddingRight: STANDARD_PADDING }}
      {...props}
    />
  );
};

export default PaddedContainer;
