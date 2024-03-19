import { CircularProgressBase as Progress } from "react-native-circular-progress-indicator";
import React from "react";
import { View } from "react-native";

interface CircularProgressProps {
  progress: number;
  color: string;
  style?: View["props"]["style"];
}

const strokeWidth = 35;

const CircularProgress: React.FC<CircularProgressProps> = ({ ...props }) => {
  return (
    <View style={props.style}>
      <Progress
        radius={45}
        duration={600}
        maxValue={100}
        value={props.progress}
        strokeLinecap="round"
        activeStrokeWidth={strokeWidth}
        inActiveStrokeWidth={strokeWidth + 25}
        activeStrokeColor={props.color}
        inActiveStrokeColor={"#F5F5F5"}
        inActiveStrokeOpacity={0.7}
        circleBackgroundColor={"rgb(245, 245, 245)"}
      />
    </View>
  );
};

export default CircularProgress;
