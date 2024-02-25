import { View, StyleSheet, Text } from "react-native";
import Spacer from "./Spacer";
import Avatar from "./Avatar";
import { VERTICAL_PADDING } from "../constants";
import Chip from "./Chip";
import { AntDesign } from "@expo/vector-icons";

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
      <Text style={styles.subText}>(est. {distance} miles away)</Text>
      <Text style={styles.subText}>Phone: {phone}</Text>

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

          <Spacer />
          <Text style={styles.subTitle}>Availability</Text>
          <Text style={styles.subText}>
            <AcceptingPatients acceptNewPatients={acceptNewPatients} />
          </Text>
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
          <AntDesign name="checkcircle" size={14} color="green" />
          <Text style={styles.subText}>Accepting new patients</Text>
        </View>
      ) : (
        <View style={styles.flexContainer}>
          <AntDesign name="checkcircle" size={14} color="red" />
          <Text style={styles.subText}>Not accepting new patients</Text>
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
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: "#fff",
  },
  subText: {
    fontSize: 12,
    color: "#8e8e93",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
});

export default Provider;
