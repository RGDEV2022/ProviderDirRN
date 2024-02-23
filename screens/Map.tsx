import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import TransitionViews from "../components/TransitionViews";
import TransitionWrapper from "../components/TransitionWrapper";

export default function Map() {
  return (
    <>
      <View style={styles.container}>
        <TransitionWrapper>
          <MapView style={styles.map} userInterfaceStyle="dark" />
          <TransitionViews />
        </TransitionWrapper>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
