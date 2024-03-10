import { Modal, ModalProps } from "react-native";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CircleButton from "./CircleButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface ReModalProps extends ModalProps {
  children?: React.ReactNode;
  handleCloseModal?: () => void;
}

const ReModal = (props: ReModalProps) => {
  const { handleCloseModal } = props;

  const insets = useSafeAreaInsets();
  return (
    <Modal {...props}>
      <AnimatedBlurView
        entering={FadeIn}
        exiting={FadeOut}
        intensity={30}
        tint="dark"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <CircleButton
        style={{
          position: "absolute",
          top: insets.top,
          right: 15,
          zIndex: 1,
        }}
        onPress={handleCloseModal}
      />
      {props.children}
    </Modal>
  );
};

export default ReModal;
