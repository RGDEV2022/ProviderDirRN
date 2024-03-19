import LottieView, { LottieViewProps } from "lottie-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";

interface IProps extends LottieViewProps {
  source: any;
  style?: any;
  loop?: boolean;
  autoPlay?: boolean;
  component?: JSX.Element;
  onFinished?: () => void;
  progress?: number;
  endFrame?: number;
  startFrame?: number;
  maxFrame?: number;
}
const Lottie = ({
  source,
  style,
  loop = true,
  autoPlay = true,
  component,
  onFinished,
  progress,
  endFrame,
  startFrame,
  maxFrame,

  ...props
}: IProps) => {
  const lottieRef = React.useRef<LottieView | null>(null);
  const progressRef = React.useRef<number>(0);

  useEffect(() => {
    if (autoPlay) {
      setTimeout(() => {
        lottieRef.current?.play();
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (
      progress &&
      endFrame &&
      startFrame &&
      progressRef.current !== progress
    ) {
      const offset = (endFrame - startFrame) / 100;
      const frame = progress * offset + startFrame;
      lottieRef.current?.play(startFrame, frame);
      progressRef.current = progress;

      if (progress === 100) {
        maxFrame
          ? lottieRef.current?.play(frame, maxFrame)
          : lottieRef.current?.play();
      }
    }
  }, [progress]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        ref={lottieRef}
        source={source}
        style={style}
        loop={loop}
        autoPlay={autoPlay}
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) onFinished && onFinished();
        }}
        {...props}
      />
      {component && component}
    </View>
  );
};

export default Lottie;
