import { View, StyleSheet, Text } from "react-native";
import Spacer from "./Spacer";
import Avatar from "./Avatar";
import { VERTICAL_PADDING } from "../constants";
import Chip from "./Chip";
import { AntDesign } from "@expo/vector-icons";
import Divider from "./Divider";
import FlexContainer from "./FlexContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProviderProps {
  title: string;
  group: string;
  address: string;
  phone: string;
  specialties: string[];
  acceptNewPatients: boolean;
  distance: string;
  type: "hospital" | "individual";
  fullCard?: boolean;
}

const Provider = (props: IProviderProps) => {
  const {
    title,
    group,
    address,
    acceptNewPatients,
    phone,
    specialties,
    distance,
    type,
    fullCard,
  } = props;

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
      {fullCard && (
        <>
          <Divider noSpacing />
          <FlexContainer gap={20} flexDirection="row">
            <View>
              <Text style={styles.subTitle}>Availability</Text>
              <AcceptingPatients acceptNewPatients={acceptNewPatients} />
            </View>

            <Divider orientation="vertical" noSpacing />

            <View>
              <Text style={styles.subTitle}>Cost</Text>
              <Text style={[styles.subText, { fontWeight: "600" }]}>$$$</Text>
            </View>

            <Divider orientation="vertical" noSpacing />

            <View>
              <Text style={styles.subTitle}>Distance</Text>
              <View style={styles.textIconFlexContainer}>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={14}
                  color="#8e8e93"
                />
                <Text style={[styles.subText, { fontWeight: "600" }]}>
                  1.9 mi
                </Text>
              </View>
            </View>
          </FlexContainer>
          <Divider noSpacing />
        </>
      )}
      {!fullCard && (
        <>
          <Text style={styles.subText}>(est. {distance} miles away)</Text>
          <Text style={styles.subText}>Phone: {phone}</Text>
        </>
      )}

      {fullCard && (
        <>
          <Spacer />
          <Text style={styles.subTitle}>Specialties</Text>
          <View style={styles.flexContainer}>
            {specialties.map((specialty, i) => (
              <Chip border>
                <Text style={styles.subText}>{specialty}</Text>
              </Chip>
            ))}
          </View>

          <Spacer />
          <Text style={styles.subTitle}>Type</Text>
          <Text style={styles.subText}>{group}</Text>
        </>
      )}
    </View>
  );
};

const AcceptingPatients = ({
  acceptNewPatients,
}: {
  acceptNewPatients: boolean;
}) => {
  return (
    <>
      {acceptNewPatients ? (
        <View style={[styles.flexContainer, { alignItems: "center" }]}>
          <AntDesign name="checkcircle" size={14} color="#53d769" />
          <Text
            style={[styles.subText, { fontWeight: "600", color: "#53d769" }]}
          >
            Accepting
          </Text>
        </View>
      ) : (
        <View style={[styles.flexContainer, { alignItems: "center" }]}>
          <AntDesign name="checkcircle" size={14} color="red" />
          <Text style={[styles.subText, { fontWeight: "600" }]}>
            Unavailable
          </Text>
        </View>
      )}
    </>
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8e8e93",
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: "#8e8e93",
  },
  subText: {
    fontSize: 14,
    color: "#fff",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  textIconFlexContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
});

export default Provider;
