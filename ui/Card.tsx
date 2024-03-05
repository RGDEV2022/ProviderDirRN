import React from "react";
import {
  StyleSheet,
  ViewProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { DARK_CARD_BG_COLOR_VALUE } from "../constants";

interface ICardProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  noPadding?: boolean;
  sx?: ViewProps["style"];
  color?: string;
  onPress?: () => void;
}

const Card = (props: ICardProps) => {
  const { children, noPadding, sx, color, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          padding: noPadding ? 0 : 15,
          backgroundColor: color ? color : `rgb(${DARK_CARD_BG_COLOR_VALUE})`,
        },
        sx,
      ]}
      disabled={!onPress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
