import { View, Text, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Avatar = ({
  type = "provider",
  size = "small",
  userName,
}: {
  type: "institution" | "provider" | "user";
  size?: "small" | "medium" | "large";
  userName?: string;
}) => {
  return type === "provider" ? (
    <Ionicons name="person-circle-outline" size={sizes[size]} color="white" />
  ) : type === "institution" ? (
    <FontAwesome5 name="hospital" size={sizes[size]} color="white" />
  ) : type === "user" ? (
    <UserAvatar userName={userName} />
  ) : null;
};

const UserAvatar = ({ userName }: { userName?: string }) => {
  const initials = userName
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <View style={styles.container}>
      {userName ? (
        <Text style={styles.text}>{initials}</Text>
      ) : (
        <Ionicons
          name="person-circle-outline"
          size={sizes["small"]}
          color="white"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A86FF",
    borderRadius: 100,
    height: 28,
    width: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

const sizes = {
  small: 24,
  medium: 32,
  large: 40,
};

export default Avatar;
