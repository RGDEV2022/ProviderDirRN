import React from "react";
import { DARK_INPUT_ICON_COLOR_VALUE } from "../constants";
import Input, { InputProps } from "../ui/Input";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = (props: InputProps) => {
  return (
    <Input
      startAdornment={
        <Ionicons
          name="search"
          size={16}
          color={`rgb(${DARK_INPUT_ICON_COLOR_VALUE})`}
        />
      }
      placeholder="Search for a provider"
      placeholderTextColor="#fff"
      {...props}
    />
  );
};

export default SearchBar;
