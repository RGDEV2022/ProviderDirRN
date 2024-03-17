import { StyleSheet } from "react-native";
import { View, ScrollView } from "react-native";
import Chip from "../ui/Chip";
import {
  FILTERS,
  STANDARD_PADDING,
  TFilterValue,
  VERTICAL_PADDING,
} from "../constants";

const FilterBar = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingLeft: STANDARD_PADDING,
        marginTop: VERTICAL_PADDING,
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <View style={styles.container}>
        {Object.keys(FILTERS).map((filter) => {
          return (
            <Chip
              key={filter}
              text={(FILTERS[filter][0] as TFilterValue).label}
              border
              multiSelect
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: "#fff",
  },
});
