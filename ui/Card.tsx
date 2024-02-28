import React from "react";
import { View, StyleSheet } from "react-native";
import { DARK_CARD_BG_COLOR_VALUE } from "../constants";

const Card = ({
  children,
  noPadding,
}: {
  children?: React.ReactNode;
  noPadding?: boolean;
}) => {
  return (
    <View style={[styles.card, { padding: noPadding ? 0 : 15 }]}>
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
  },
});

export default Card;
