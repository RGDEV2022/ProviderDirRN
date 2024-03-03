import BottomSheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DARK_BG_COLOR_VALUE } from "../constants";

interface IBottomSheetProps extends BottomSheetProps {
  innerRef: React.RefObject<BottomSheet>;
}

const ReBottomSheet = (props: IBottomSheetProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet
      ref={props.innerRef}
      topInset={insets.top}
      enablePanDownToClose
      backgroundStyle={{
        flex: 1,
        backgroundColor: `rgb(${DARK_BG_COLOR_VALUE})`,
      }}
      handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      {...props}
    />
  );
};

export default ReBottomSheet;
