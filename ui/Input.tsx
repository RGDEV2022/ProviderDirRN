import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  DARK_INPUT_BG_COLOR_VALUE,
  IOS_GREEN,
  IOS_TEXT_GRAY,
} from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeOut, FadeIn, FadeInLeft } from "react-native-reanimated";

export interface InputProps extends TextInputProps {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  suggestionText?: string;
  onPressSelectSuggestion?: () => void;
}

const Input = (props: InputProps) => {
  const {
    startAdornment,
    endAdornment,
    suggestionText,
    onPressSelectSuggestion,
  } = props;
  return (
    <View style={styles.inputContainer}>
      {startAdornment && startAdornment}
      <View style={{ position: "relative", flex: 1 }}>
        <TextInput
          style={{ flex: 1, color: "#fff", fontSize: 14, zIndex: 1 }}
          {...props}
        />
        {suggestionText && (
          <Animated.View
            exiting={FadeOut}
            entering={FadeIn}
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              position: "absolute",
              top: 7,
              left: 0,
              zIndex: -1,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: IOS_TEXT_GRAY,
                opacity: 0.5,
                flex: 1,
              }}
            >
              {suggestionText}
            </Text>
          </Animated.View>
        )}
      </View>
      {suggestionText && (
        <Animated.View exiting={FadeOut} entering={FadeInLeft}>
          <TouchableOpacity onPress={onPressSelectSuggestion}>
            <MaterialCommunityIcons
              name="location-enter"
              size={16}
              color={IOS_GREEN}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      {endAdornment && endAdornment}
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
