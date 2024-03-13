import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { DARK_BG_COLOR_VALUE } from "../constants";
import Backdrop from "../ui/Backdrop";
import ReBottomSheet from "../ui/ReBottomSheet";
import { SharedValue } from "react-native-reanimated";
import Link from "../ui/Link";
import { useQuery } from "@tanstack/react-query";
import { TProviderSearchOut } from "../test/apiCalls";
import Provider from "../ui/Provider";
import useSheetState, { useSearchState } from "../store/store";
import { formattedAddress } from "../helpers/formattedAddress";
import Spacer from "../ui/Spacer";
import PaddedContainer from "../ui/PaddedContainer";

const ProviderSheet = ({
  isDragging,
  animatedIndex,
}: {
  isDragging: boolean;
  animatedIndex?: SharedValue<number>;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "45%", "100%"], []);

  useEffect(() => {
    if (isDragging) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [isDragging]);

  const {
    selectedProviderID,
    setSelectedProviderID,
    setIsMainSheetOpen,
    isProviderSheetOpen,
    setIsProviderSheetOpen,
    setIsResultsSheetOpen,
  } = useSheetState();

  const { query } = useSearchState();

  const params = {
    id: selectedProviderID,
    procedure_code: null,
    my_location: { latitude: 32.9822054, longitude: -96.7074236 },
    plan_id: 1,
  };

  const { data, isFetching, refetch } = useQuery<TProviderSearchOut["data"][0]>(
    {
      queryKey: ["getProviderDetail"],
      queryFn: async () => {
        const response = await fetch(
          "https://api.evryhealth.com/api/v1/ProviderDirectory/GetProviderDetail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }
        );
        const responseJson = await response.json();
        return responseJson;
      },
    }
  );

  const address = formattedAddress(data);

  const handleGoBack = () => {
    bottomSheetRef.current.close();
    setSelectedProviderID(undefined);
    setIsProviderSheetOpen(false);
    if (query) {
      setIsResultsSheetOpen(true);
    } else {
      setIsMainSheetOpen(true);
    }
  };

  useEffect(() => {
    if (selectedProviderID && isProviderSheetOpen) {
      bottomSheetRef.current.snapToIndex(1);
      refetch();
    }
  }, [isProviderSheetOpen, selectedProviderID]);

  return (
    <ReBottomSheet
      backgroundComponent={({ style }) => (
        <View
          style={[
            style,
            {
              backgroundColor: `rgba(${DARK_BG_COLOR_VALUE},0.7)`,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: "hidden",
            },
          ]}
        >
          <BlurView
            intensity={30}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}
      innerRef={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <Backdrop appearAfterIndex={1} {...props} />
      )}
      animatedIndex={animatedIndex}
      enablePanDownToClose={false}
    >
      <PaddedContainer>
        <View>
          <Link text="Back" onPress={() => handleGoBack()} />
        </View>

        <Spacer />

        {data && (
          <Provider
            acceptNewPatients={data?.accepting_new_patients}
            address={address}
            distance="1.2 miles"
            group={data?.group_name}
            title={data?.full_name}
            specialties={data?.specialties?.map((specialty) => specialty.value)}
            phone={data?.phone_number}
            type={data?.entity_type_code === "2" ? "hospital" : "individual"}
            isFetching={isFetching}
            fullCard
          />
        )}
      </PaddedContainer>
    </ReBottomSheet>
  );
};

export default ProviderSheet;
