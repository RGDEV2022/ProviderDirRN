import React, { useEffect, useMemo, useRef, useState } from "react";
import MapView, {
  Marker,
  UserLocationChangeEvent,
  MapMarkerProps,
  PanDragEvent,
  Region,
  Details,
} from "react-native-maps";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import TransitionViews from "../components/TransitionViews";
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
import { useMutation } from "@tanstack/react-query";
import {
  TLocationCoords,
  TProviderSearch,
  TProviderSearchOut,
  providerSearchIn,
} from "../test/apiCalls";
import useDebounce from "../hooks/useDebounce";

export default function Map() {
  const map = useRef<MapView>(null);
  const animatedIndex = useSharedValue(0);
  const [providerLocations, setProviderLocations] = useState<
    TLocationCoords[] | null
  >(null);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { isPending, data, error, mutateAsync } = useMutation({
    mutationFn: async (params: TProviderSearch) => {
      const response = await fetch(
        "https://api.evryhealth.com/api/v1/ProviderDirectory/ProviderSearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      const responseJson = (await response.json()) as TProviderSearchOut;
      return responseJson;
    },
    onSettled: (data) => {
      if (data && data?.data?.length > 0) {
        setProviderLocations(
          data?.data?.map((provider) => ({
            latitude: provider.latitude,
            longitude: provider.longitude,
          }))
        );
      }
    },
    mutationKey: ["providerSearch"],
  });

  const providerSearchFetch = async (params: TProviderSearch) => {
    mutateAsync(params);
  };

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

    providerSearchFetch(providerSearchIn);
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
                />
              ))}
          </MapView>
          <FloatingButtonGroup
            onPressGroup={{
              userLocation: { onPress: resetMap },
              home: { onPress: resetMap },
              searchBounds: { onPress: resetMap },
              ai: { onPress: resetMap },
            }}
            animatedIndex={animatedIndex}
          />
          <TransitionViews
            isDragging={isDragging}
            animatedIndex={animatedIndex}
          />
        </TransitionWrapper>
      </View>
    </>
  );
}

interface ReMarkerProps extends MapMarkerProps {
  type: "hospital" | "individual";
}

const ReMarker = (props: ReMarkerProps) => {
  const { type } = props;
  return (
    <Marker {...props}>
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
