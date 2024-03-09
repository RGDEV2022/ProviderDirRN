import { View, Text, Pressable, StyleSheet, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChipProps extends ViewProps {
  text?: string;
  onPress?: () => void;
  multiSelect?: boolean;
  closeable?: boolean;
  children?: React.ReactNode;
  border?: boolean;
  sx?: ViewProps["style"];
}

const Chip = (props: ChipProps) => {
  const { text, onPress, multiSelect, closeable, border, sx } = props;

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.container,
          border && { borderColor: "#fff", borderWidth: 0.5 },
          sx,
        ]}
      >
        {props.children}
        <Text style={styles.text}>{text}</Text>
        {(multiSelect || closeable) && (
          <Ionicons
            name={multiSelect ? "chevron-down" : closeable ? "close" : "add"}
            size={14}
            color="#fff"
          />
        )}
      </View>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 100,
  },
  text: {
    color: "#fff",
  },
});
