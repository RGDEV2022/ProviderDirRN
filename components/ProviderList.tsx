import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PaddedContainer from "../ui/PaddedContainer";
import Provider from "../ui/Provider";
import Divider from "../ui/Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ProviderCardProps = {
  title: string;
  group: string;
  address: string;
  type: "hospital" | "individual";
  distance: string;
  phone: string;
  specialties: string[];
};

const ProviderList = () => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetFlatList
      data={PROVIDER_DATA}
      bounces={false}
      contentContainerStyle={{
        gap: 10,
        paddingBottom: insets.bottom + 10,
      }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <PaddedContainer>
          <Divider noSpacing />
        </PaddedContainer>
      )}
      renderItem={({ item }) => (
        <PaddedContainer>
          <Provider
            title={item.title}
            group={item.group}
            address={item.address}
            type={item.type}
            distance={item.distance}
            phone={item.phone}
            specialties={item.specialties}
          />
        </PaddedContainer>
      )}
      keyExtractor={(item, i) => `${item.title}-${i}`}
    />
  );
};

const PROVIDER_DATA: ProviderCardProps[] = [
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
  {
    title: "METHODIST HOSPITAL FOR CONTINUING CARE",
    group: "Acute inpatient hospital",
    address: "401 W CAMPBELL RD, RICHARDSON, TX, 75080",
    type: "hospital",
    distance: "1.22",
    phone: "4692041000",
    specialties: ["Acute inpatient hospital"],
  },
];

export default ProviderList;
