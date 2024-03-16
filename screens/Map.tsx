import React, { useEffect, useMemo, useRef, useState } from "react";
import MapView, {
  Marker,
  UserLocationChangeEvent,
  MapMarkerProps,
} from "react-native-maps";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import MainSheet from "../components/MainSheet";
import TransitionWrapper from "../components/TransitionWrapper";
import { IOS_BUTTON_GRAY, IOS_ICON_GRAY } from "../constants";
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  FontAwesome6,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Divider from "../ui/Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import Spacer from "../ui/Spacer";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";
import {
  TLocationCoords,
  TProviderDetailsOut,
  TProviderSearchOut,
  TProviderSuggestionOut,
} from "../test/apiCalls";
import ProviderSheet from "../components/ProviderSheet";
import useSheetState, { useSearchState } from "../store/store";
import ResultsSheet from "../components/ResultsSheet";
import useObserveQuery from "../hooks/useObservableQuery";
import Chat from "../components/Chat";
import { useQuery } from "@tanstack/react-query";

export default function Map() {
  const map = useRef<MapView>(null);
  const animatedIndex = useSharedValue(0);
  const providerDetailAnimatedIndex = useSharedValue(0);
  const providerResultsAnimatedIndex = useSharedValue(0);
  const [providerLocations, setProviderLocations] = useState<
    TLocationCoords[] | null
  >(null);
  const { data, isFetching, isError } = useObserveQuery<TProviderSearchOut>([
    "providerSearch",
  ]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const {
    isMainSheetOpen,
    isProviderSheetOpen,
    isResultsSheetOpen,
    selectedProvider,
  } = useSheetState();

  useGetProviderDetails({
    providerId: selectedProvider?.id,
    setData: setProviderLocations,
  });

  useEffect(() => {
    if (data && data?.data?.length > 0) {
      setProviderLocations(
        data?.data?.map((provider) => ({
          latitude: provider.latitude,
          longitude: provider.longitude,
        }))
      );
    }
  }, [data, isResultsSheetOpen]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setUserLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (map.current && providerLocations && providerLocations.length > 0) {
      map.current.fitToCoordinates(providerLocations, {
        edgePadding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      });
    }
  }, [providerLocations]);

  let text = "Waiting..";

  if (errorMsg) {
    text = errorMsg;
  } else if (userLocation) {
    text = JSON.stringify(userLocation);
  }

  const onUserLocationChange = (location: UserLocationChangeEvent) => {
    setUserLocation(location);
  };

  const resetMap = () => {
    map.current?.animateToRegion({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TransitionWrapper>
          <MapView
            ref={map}
            style={styles.map}
            userInterfaceStyle="dark"
            showsUserLocation={true}
            followsUserLocation={true}
            onUserLocationChange={onUserLocationChange}
            onMoveShouldSetResponder={() => {
              setIsDragging(true);
              return true;
            }}
            onResponderRelease={() => setIsDragging(false)}
          >
            {data &&
              data?.data.length > 0 &&
              data.data.map((provider) => (
                <ReMarker
                  key={provider.provider_directory_location_id}
                  coordinate={{
                    latitude: provider.latitude,
                    longitude: provider.longitude,
                  }}
                  title={provider.full_name}
                  description={provider.specialties[0].value}
                  type={
                    provider.entity_type_code === "2"
                      ? "hospital"
                      : "individual"
                  }
                  providerId={provider.provider_directory_location_id}
                  setData={setProviderLocations}
                  providerData={provider}
                />
              ))}
          </MapView>
          {isChatOpen && <Chat setIsChatOpen={setIsChatOpen} />}
          <FloatingButtonGroup
            onPressGroup={{
              userLocation: { onPress: resetMap },
              home: { onPress: resetMap },
              searchBounds: { onPress: resetMap },
              ai: { onPress: () => setIsChatOpen(true) },
            }}
            animatedIndex={
              isProviderSheetOpen
                ? providerDetailAnimatedIndex
                : isResultsSheetOpen
                ? providerResultsAnimatedIndex
                : isMainSheetOpen
                ? animatedIndex
                : animatedIndex
            }
          />
          <MainSheet isDragging={isDragging} animatedIndex={animatedIndex} />
          <ProviderSheet
            isDragging={isDragging}
            animatedIndex={providerDetailAnimatedIndex}
          />
          <ResultsSheet
            isDragging={isDragging}
            animatedIndex={providerResultsAnimatedIndex}
          />
        </TransitionWrapper>
      </View>
    </>
  );
}

const useGetProviderDetails = ({
  providerId,
  setData,
  skip,
}: {
  providerId: string;
  setData: (state: TLocationCoords[]) => void;
  skip?: boolean;
}) => {
  const params = {
    id: providerId,
    procedure_code: null,
    my_location: { latitude: 32.9822054, longitude: -96.7074236 },
    plan_id: 1,
  };

  const { data, isFetching, refetch } = useQuery<TProviderDetailsOut>({
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
  });

  const handleSetData = () => {
    setData([
      {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    ]);
  };

  useEffect(() => {
    if (!skip && data && providerId) {
      handleSetData();
    }
  }, [data]);

  return { handleSetData };
};

interface ReMarkerProps extends MapMarkerProps {
  type: "hospital" | "individual";
  providerId: number;
  providerData?: TProviderSearchOut["data"][0];
  setData: (state: TLocationCoords[]) => void;
}

const ReMarker = (props: ReMarkerProps) => {
  const { type, providerId, setData, providerData } = props;

  const {
    setIsMainSheetOpen,
    setSelectedProvider,
    setIsResultsSheetOpen,
    setIsProviderSheetOpen,
  } = useSheetState();

  const handleOpenProvider = () => {
    const providerDetails: TProviderSuggestionOut = {
      address1: providerData.address1,
      address2: providerData.address2,
      city: providerData.city,
      state: providerData.state,
      zip: providerData.zip,
      entity_type_code: providerData.entity_type_code,
      id: providerData.provider_directory_location_id.toString(),
      description: providerData.full_name,
      specialties: providerData.specialties.map((s) => s.value),
      hospital_based_provider: false,
      provider_search_suggestion_type: 1,
    };
    setSelectedProvider(providerDetails);
    setIsProviderSheetOpen(true);
    setIsMainSheetOpen(false);
    setIsResultsSheetOpen(false);
  };

  const handleMarkerPress = () => {
    handleOpenProvider();
    handleSetData();
  };

  const { handleSetData } = useGetProviderDetails({
    providerId: providerId.toString(),
    setData: setData,
    skip: true,
  });

  return (
    <Marker onPress={handleMarkerPress} {...props}>
      <View>
        {type === "hospital" ? (
          <Image
            source={require("../assets/map/markerIconBusiness.png")}
            style={{ width: 40, height: 50 }}
          />
        ) : (
          <Image
            source={require("../assets/map/markerIconPerson.png")}
            style={{ width: 40, height: 50 }}
          />
        )}
      </View>
    </Marker>
  );
};

type TFloatingButtonGroup = {
  animatedIndex: SharedValue<number>;
  onPressGroup: {
    userLocation: { onPress: () => void };
    home: { onPress: () => void };
    searchBounds: { onPress: () => void };
    ai: { onPress: () => void };
  };
};

const FloatingButtonGroup = (props: TFloatingButtonGroup) => {
  const { animatedIndex, onPressGroup } = props;
  const { userLocation, home, searchBounds, ai } = onPressGroup || {};

  const inset = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 1.1],
      [1, 0],
      Extrapolation.CLAMP
    ),
    display: animatedIndex.value <= 1.1 ? "flex" : "none",
  }));

  const containerStyle = useMemo(
    () => [
      {
        top: inset.top + 10,
        right: 5,
        zIndex: 10,
      },
      animatedStyle,
    ],
    [animatedStyle]
  );

  return (
    <Animated.View style={[containerStyle, { position: "absolute" }]}>
      <RoundedFlexContainer>
        <TouchableOpacity onPress={userLocation.onPress} activeOpacity={0.8}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: IOS_BUTTON_GRAY,
              padding: 9,
            }}
          >
            <FontAwesome6
              name="location-arrow"
              size={16}
              color={IOS_ICON_GRAY}
            />
          </View>
        </TouchableOpacity>
        <Divider noSpacing />
        <TouchableOpacity onPress={home.onPress} activeOpacity={0.8}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: IOS_BUTTON_GRAY,
              padding: 9,
            }}
          >
            <FontAwesome5 name="home" size={16} color={IOS_ICON_GRAY} />
          </View>
        </TouchableOpacity>
      </RoundedFlexContainer>

      <Spacer space={10} />

      <RoundedFlexContainer>
        <TouchableOpacity onPress={searchBounds.onPress} activeOpacity={0.8}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: IOS_BUTTON_GRAY,
              padding: 9,
            }}
          >
            <MaterialCommunityIcons
              name="map-search"
              size={18}
              color={IOS_ICON_GRAY}
            />
          </View>
        </TouchableOpacity>
      </RoundedFlexContainer>

      <Spacer space={10} />

      <RoundedFlexContainer>
        <TouchableOpacity onPress={ai.onPress} activeOpacity={0.8}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: IOS_BUTTON_GRAY,
              padding: 9,
            }}
          >
            <LottieView
              autoPlay
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                top: -16,
                right: 16,
                backgroundColor: "transparent",
              }}
              source={require("../animations/aiAnalyse.json")}
            />
          </View>
        </TouchableOpacity>
      </RoundedFlexContainer>
    </Animated.View>
  );
};

const RoundedFlexContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#000",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
