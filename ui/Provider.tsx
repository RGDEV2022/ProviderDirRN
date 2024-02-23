import { View, StyleSheet, Text } from "react-native";
import Spacer from "./Spacer";
import Avatar from "./Avatar";
import { VERTICAL_PADDING } from "../constants";

interface IProviderProps {
  title: string;
  group: string;
  address: string;
  phone: string;
  specialties: string[];
  distance: string;
  type: "hospital" | "individual";
}

const Provider = (props: IProviderProps) => {
  const { title, group, address, phone, specialties, distance, type } = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Avatar type={"provider"} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>
      <Spacer />
      <Text style={styles.subText}>(est. {distance} miles away)</Text>
      <Text style={styles.subText}>Phone: {phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: VERTICAL_PADDING,
    marginTop: VERTICAL_PADDING,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
  address: {
    fontSize: 12,
    color: "#fff",
  },
  subText: {
    fontSize: 12,
    color: "#8e8e93",
  },
});

export default Provider;
