import { View, StyleSheet, Text } from "react-native";
import Spacer from "./Spacer";
import Avatar from "./Avatar";
import {
  IOS_GREEN,
  IOS_RED,
  IOS_TEXT_GRAY,
  VERTICAL_PADDING,
} from "../constants";
import Chip from "./Chip";
import { AntDesign } from "@expo/vector-icons";
import Divider from "./Divider";
import FlexContainer from "./FlexContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

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
  isFetching?: boolean;
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
    isFetching,
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
      {isFetching ? (
        <View style={{ opacity: 0.4 }}>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Skeleton colorMode={"dark"} height={50} width={100} />
            <Skeleton colorMode={"dark"} height={50} width={100} />
            <Skeleton colorMode={"dark"} height={50} width={100} />
          </View>
          <Spacer space={10} />
          <Skeleton colorMode={"dark"} width={"100%"} />
          <Spacer space={10} />
          <Skeleton colorMode={"dark"} width={"100%"} />
        </View>
      ) : (
        <>
          {fullCard && (
            <>
              <Divider noSpacing />
              <Spacer />
              <FlexContainer gap={20} flexDirection="row">
                <View>
                  <Text style={styles.subTitle}>Availability</Text>
                  <AcceptingPatients acceptNewPatients={acceptNewPatients} />
                </View>
                <Divider orientation="vertical" noSpacing />
                <View>
                  <Text style={styles.subTitle}>Cost</Text>
                  <Text style={[styles.subText, { fontWeight: "600" }]}>
                    $$$
                  </Text>
                </View>
                <Divider orientation="vertical" noSpacing />
                <View>
                  <Text style={styles.subTitle}>Distance</Text>
                  <View style={styles.textIconFlexContainer}>
                    <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={14}
                      color={IOS_TEXT_GRAY}
                    />
                    <Text style={[styles.subText, { fontWeight: "600" }]}>
                      1.9 mi
                    </Text>
                  </View>
                </View>
              </FlexContainer>
              <Spacer />
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
                {specialties?.map((specialty, i) => (
                  <Chip key={i} border>
                    <Text style={styles.subText}>{specialty}</Text>
                  </Chip>
                ))}
              </View>
              <Spacer />
              <Text style={styles.subTitle}>Type</Text>
              <Text style={styles.subText}>{group}</Text>
            </>
          )}
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
          <AntDesign name="checkcircle" size={14} color={IOS_GREEN} />
          <Text
            style={[styles.subText, { fontWeight: "600", color: IOS_GREEN }]}
          >
            Accepting
          </Text>
        </View>
      ) : (
        <View style={[styles.flexContainer, { alignItems: "center" }]}>
          <AntDesign name="checkcircle" size={14} color={IOS_RED} />
          <Text style={[styles.subText, { fontWeight: "600", color: IOS_RED }]}>
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
    color: IOS_TEXT_GRAY,
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: IOS_TEXT_GRAY,
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
    gap: 4,
  },
});

export default Provider;
