import React from "react";
import { View, StyleSheet } from "react-native";
import { DARK_CARD_BG_COLOR_VALUE } from "../constants";

const Card = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: `rgb(${DARK_CARD_BG_COLOR_VALUE})`,
    borderRadius: 8,
    padding: 15,
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
