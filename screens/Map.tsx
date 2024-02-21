import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import TransitionViews from "../components/TransitionViews";

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} userInterfaceStyle="dark" />
      <TransitionViews />
    </View>
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
