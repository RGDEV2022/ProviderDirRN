import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CircularProgress from "./CircularProgress";
import Spacer from "./Spacer";
import Card from "./Card";
import { IOS_LIGHT_GRAY } from "../constants";

export const EVRY_BLUE = "rgb(0, 38, 58)";
export const EVRY_DARK_GRAY = "rgb(102, 102, 102)";

interface ProgressCardProps {
  title?: string;
  subTitle?: string;
  maxValue?: number;
  currentValue?: number;
  progress: number;
  color: string;
  typeText?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ ...props }) => {
  return (
    <Card sx={{ marginLeft: 5, top: 5, marginBottom: 5, marginRight: 5 }}>
      <View style={styles.progressCardWrapper}>
        <CircularProgress color={props.color} progress={props.progress} />
        <Spacer space={10} />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -35,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: IOS_LIGHT_GRAY,
                marginTop: 35,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {`$${props.currentValue?.toLocaleString("en-US")}`}
            </Text>

            <Text
              style={{
                color: IOS_LIGHT_GRAY,
                marginTop: 35,
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              {` / $${props.maxValue?.toLocaleString("en-US")}`}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 15,
              fontWeight: "500",
              color: "#fff",
            }}
          >
            {props.typeText}
          </Text>
          <Text style={{ marginTop: 2, fontSize: 14, color: IOS_LIGHT_GRAY }}>
            {props.subTitle}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const progressBarStyles = {
  position: "absolute",
  top: -45,
  backgroundColor: "transparent",
};

export const styles = StyleSheet.create({
  progressCardWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 30,
    paddingBottom: 25,
    marginBottom: 10,
    width: 190,
    height: 115,
  },
});

export default ProgressCard;
