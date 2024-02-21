import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import { DARK_INPUT_BG_COLOR_VALUE } from "../constants";

export interface InputProps extends TextInputProps {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = (props: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      {props?.startAdornment && props.startAdornment}
      <TextInput style={{ flex: 1, color: "#fff" }} {...props} />
      {props?.endAdornment && props.endAdornment}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: `rgb(${DARK_INPUT_BG_COLOR_VALUE})`,
    flex: 1,
    height: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
});
export default Input;
