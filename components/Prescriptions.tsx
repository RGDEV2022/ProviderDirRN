import { Image, ScrollView, View, Text } from "react-native";
import Card from "../ui/Card";
import Group from "../ui/Group";
import {
  IOS_BLUE,
  IOS_GRAY,
  IOS_GREEN,
  IOS_LIGHT_BLUE,
  IOS_LIGHT_GRAY,
  IOS_ORANGE,
  IOS_RED,
  IOS_TEXT_GRAY,
  IOS_YELLOW,
  STANDARD_PADDING,
} from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../ui/Spacer";
import Chip from "../ui/Chip";

type TPrescriptions = {
  onPressMore?: () => void;
};

const Prescriptions = ({ onPressMore }: TPrescriptions) => {
  return (
    <Group title="Prescriptions" onPressMore={onPressMore}>
      <Spacer space={8} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: STANDARD_PADDING,
          paddingRight: STANDARD_PADDING + 10,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <PharmacyItem
            title={"CVS Pharmacy"}
            date={"03/12/2024"}
            ready={true}
            logo={"cvs"}
            color={IOS_RED}
          />
          <PharmacyItem
            title={"Walgreens"}
            date={"02/20/2024"}
            ready={true}
            logo={"walgreens"}
            color={IOS_BLUE}
          />
        </View>
      </ScrollView>
    </Group>
  );
};

const pharmacyLogos = {
  cvs: require("../assets/prescriptions/cvsLogo.png"),
  walgreens: require("../assets/prescriptions/walgreensPharmacyLogo.png"),
};

type TPharmacyItem = keyof typeof pharmacyLogos;

const PharmacyItem = ({
  title,
  date,
  ready,
  logo,
  color,
}: {
  title: string;
  date: string;
  ready: boolean;
  logo: TPharmacyItem;
  color: string;
}) => {
  const pharmacyLogos = {
    cvs: require("../assets/prescriptions/cvsLogo.png"),
    walgreens: require("../assets/prescriptions/walgreensPharmacyLogo.png"),
  };

  return (
    <Card color={color}>
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Image
          source={pharmacyLogos[logo]}
          resizeMode="contain"
          style={{ width: 60, height: 60, borderRadius: 10 }}
        />
        <View>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            {title}
          </Text>
          <View
            style={{
              borderRadius: 10,
              padding: 2,
              paddingLeft: 5,
              paddingRight: 5,
              backgroundColor: "#000",
              alignSelf: "flex-start",
              marginTop: 2,
            }}
          >
            <Text style={{ fontSize: 10, color: "#fff", fontWeight: "600" }}>
              Updated: {date}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              marginTop: 5,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={IOS_GREEN}
            />
            <Text style={{ fontSize: 12, color: "#fff", fontWeight: "600" }}>
              Ready for pickup
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default Prescriptions;
