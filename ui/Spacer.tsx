import { View } from "react-native";

const Spacer = ({ space }: { space?: number }) => {
  return (
    <View
      style={{
        paddingTop: space ? space / 2 : 1,
        paddingBottom: space ? space / 2 : 1,
      }}
    />
  );
};

export default Spacer;
