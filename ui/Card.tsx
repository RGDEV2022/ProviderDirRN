import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { DARK_CARD_BG_COLOR_VALUE } from "../constants";

const Card = ({
  children,
  noPadding,
  sx,
}: {
  children?: React.ReactNode;
  noPadding?: boolean;
  sx?: ViewProps["style"];
}) => {
  return (
    <View style={[styles.card, { padding: noPadding ? 0 : 15 }, sx]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: `rgb(${DARK_CARD_BG_COLOR_VALUE})`,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
});

export default Card;
