import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Keyboard,
  TextInput,
  TextInputProps,
} from "react-native";
import { IOS_TEXT_GRAY } from "../constants";

interface IKeyboardAwareInputProps extends TextInputProps {
  endAdornment?: React.ReactNode;
  setKeyboardVisible?: (visible: boolean) => void;
}

const BOTTOM_PADDING = 20;

export const KeyboardAwareInput = (props: IKeyboardAwareInputProps) => {
  const { endAdornment, setKeyboardVisible } = props;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const bottomPadding = useRef(new Animated.Value(BOTTOM_PADDING)).current;

  // 200 duration is somewhat a magic number that seemed to work nicely with
  // the default keyboard opening speed
  const startAnimation = (toValue) =>
    Animated.timing(keyboardOffset, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

  const startPaddingAnimation = (toValue) =>
    Animated.timing(bottomPadding, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

  useEffect(() => {
    // start the animation when the keyboard appears
    Keyboard.addListener("keyboardWillShow", (e) => {
      // use the height of the keyboard (negative because the translateY moves upward)
      startAnimation(-e.endCoordinates?.height);
      startPaddingAnimation(0);
      setKeyboardVisible && setKeyboardVisible(true);
    });
    // perform the reverse animation back to keyboardOffset initial value: 0
    Keyboard.addListener("keyboardWillHide", () => {
      startAnimation(0);
      startPaddingAnimation(BOTTOM_PADDING);
      setKeyboardVisible && setKeyboardVisible(false);
    });
    return () => {
      // remove listeners to avoid memory leak
      Keyboard.removeAllListeners("keyboardWillShow");
      Keyboard.removeAllListeners("keyboardWillHide");
    };
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: keyboardOffset }],
        paddingBottom: bottomPadding,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 6,
          paddingLeft: 15,
          paddingRight: endAdornment ? 10 : 15,
          borderRadius: 50,
          borderColor: "white",
          borderWidth: 1,
        }}
      >
        <TextInput
          style={{
            color: "white",
            flex: 1,
          }}
          placeholderTextColor={IOS_TEXT_GRAY}
          placeholder={"Start typing..."}
          {...props}
        />
        {endAdornment && endAdornment}
      </View>
    </Animated.View>
  );
};

export default KeyboardAwareInput;
