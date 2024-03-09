import { View, StyleSheet, Text } from "react-native";
import Spacer from "./Spacer";
import Avatar from "./Avatar";
import { IOS_TEXT_GRAY, VERTICAL_PADDING } from "../constants";
import Chip from "./Chip";

interface ISuggestionProps {
  description: string;
  address: string;
  specialties: string[];
  type: 1 | 2;
}

const Suggestion = (props: ISuggestionProps) => {
  const { description, address, specialties } = props;

  const isIndividual = props.type === 1 ? true : false;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isIndividual && <Avatar type={"provider"} />}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{description}</Text>
          {isIndividual && <Text style={styles.address}>{address}</Text>}
        </View>
      </View>
      {isIndividual && (
        <>
          <Spacer />
          <View style={styles.flexContainer}>
            {specialties.map((specialty, i) => (
              <View
                key={i}
                style={{
                  paddingBottom: 2,
                  paddingTop: 2,
                  paddingLeft: 5,
                  paddingRight: 5,
                  borderRadius: 100,
                  borderColor: "#fff",
                  borderWidth: 0.5,
                }}
              >
                <Text
                  style={{ fontSize: 10, fontWeight: "500", color: "#fff" }}
                >
                  {specialty}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
      <Spacer space={5} />
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

export default Suggestion;
