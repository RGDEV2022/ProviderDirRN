import React from "react";
import { DARK_INPUT_ICON_COLOR_VALUE } from "../constants";
import Input, { InputProps } from "../ui/Input";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = (props: InputProps) => {
  const [text, setText] = React.useState("");
  const [suggestedText, setSuggestedText] = React.useState("");

  const onChangeText = (text: string) => {
    setText(text);
    if (text.length > 3) {
      const matches = PROVIDERS.filter((provider) => {
        return provider.toLowerCase().includes(text.toLowerCase());
      });
      setSuggestedText(capitalizeEveryStartingLetter(matches[0]));
    }
    if (text.length < 3) {
      setSuggestedText("");
    }
  };

  const capitalizeEveryStartingLetter = (str: string) => {
    return str?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Input
      suggestionText={suggestedText}
      onPressSelectSuggestion={() => setText(suggestedText)}
      startAdornment={
        <Ionicons
          name="search"
          size={16}
          color={`rgb(${DARK_INPUT_ICON_COLOR_VALUE})`}
        />
      }
      placeholder="Search for a provider"
      placeholderTextColor="#fff"
      onChangeText={onChangeText}
      value={text}
      {...props}
    />
  );
};

const PROVIDERS = [
  "METHODIST HOSPITAL FOR CONTINUING CARE",
  "FAMILY CENTER",
  "INTERNAL MEDICINE",
  "NEUROLOGY",
  "ORTHOPEDICS",
  "PEDIATRICS",
  "PHYSICAL THERAPY",
  "RADIOLOGY",
  "SURGERY",
  "UROLOGY",
];

export default SearchBar;
