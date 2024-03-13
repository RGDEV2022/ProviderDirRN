import { ScrollView, View, Text, KeyboardAvoidingView } from "react-native";
import ReModal from "../ui/ReModal";
import { BlurView } from "expo-blur";
import KeyboardAwareInput from "../ui/KeyboardAwareInput";
import LottieView from "lottie-react-native";
import {
  IOS_BLUE,
  IOS_GRAY,
  IOS_TEXT_GRAY,
  STANDARD_PADDING,
} from "../constants";
import Card from "../ui/Card";
import CircleButton from "../ui/CircleButton";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Animated, { FadeIn, FadeOut, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSheetState from "../store/store";
import useWebsocket from "../hooks/useWebsocket";

type TMessage = {
  type: "system" | "user";
  message: string;
};

const Chat = ({
  setIsChatOpen,
}: {
  setIsChatOpen: (state: boolean) => void;
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<TMessage[] | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const shouldShowSuggestions = !isKeyboardVisible && !messages;
  const { handleModal } = useSheetState();

  const { data, sendWSMessage } = useWebsocket("ws://192.168.4.21:58211");

  useEffect(() => {
    handleModal(true);
  }, []);

  useEffect(() => {
    if (data) {
      const sanitizedData = data.replace(/"/g, "");
      setMessages((prev) => {
        if (!prev) {
          return [{ message: sanitizedData, type: "system" }];
        }
        return [...prev, { message: sanitizedData, type: "system" }];
      });
    }
  }, [data]);

  const handleSendMessage = (message: string, type: "system" | "user") => {
    sendWSMessage(JSON.stringify({ message: message, history: messages }));

    setMessages((prev) => {
      if (!prev) {
        return [{ message, type }];
      }
      return [...prev, { message, type }];
    });
    setText("");
  };

  const handleCloseModal = () => {
    handleModal(false);
    setIsChatOpen(false);
  };

  return (
    <ReModal
      visible={true}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      handleCloseModal={() => handleCloseModal()}
    >
      <View
        style={{
          display: "flex",
          height: "100%",
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 55,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            behavior={"padding"}
            style={{
              justifyContent: "flex-end",
              paddingLeft: STANDARD_PADDING,
              paddingRight: STANDARD_PADDING,
            }}
          >
            <View
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                //add items to the bottom
                justifyContent: "flex-end",

                gap: STANDARD_PADDING,
                paddingBottom: isKeyboardVisible ? 60 : 0,
              }}
            >
              {messages?.map((message, i) => (
                <MessageBubble type={message.type} message={message.message} />
              ))}
              {/* <MessageBubble type="user" message="Whats the weather like?" />
                  <MessageBubble type="system" message="Welcome to the chat!" /> */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
          >
            {shouldShowSuggestions && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 12,
                  marginLeft: STANDARD_PADDING,
                  marginRight: STANDARD_PADDING,
                  height: 70,
                }}
              >
                {SUGGESTIONS.map((suggestion, i) => (
                  <Card onPress={() => console.log("pressed")}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>
                      {suggestion.title}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 11 }}>
                      {suggestion.description}
                    </Text>
                  </Card>
                ))}
              </Animated.View>
            )}
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <BlurView
          intensity={70}
          tint="dark"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}
        />
        <KeyboardAwareInput
          value={text}
          onChangeText={(text) => setText(text)}
          setKeyboardVisible={setKeyboardVisible}
          endAdornment={
            <CircleButton
              onPress={() => handleSendMessage(text, "user")}
              color={IOS_BLUE}
              height={18}
              width={18}
            >
              <AntDesign name="arrowup" size={13} color="#fff" />
            </CircleButton>
          }
        />
      </View>
    </ReModal>
  );
};

const MessageBubble = ({
  type,
  message,
}: {
  type: "system" | "user";
  message: string;
}) => {
  return (
    <Animated.View
      entering={FadeInDown}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: type === "system" ? "flex-start" : "flex-end",
        alignSelf: type === "system" ? "flex-start" : "flex-end",
        maxWidth: "85%",
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        borderBottomLeftRadius: type === "system" ? 0 : undefined,
        borderBottomRightRadius: type === "system" ? 15 : 0,
        backgroundColor: type === "system" ? IOS_GRAY : IOS_BLUE,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const SUGGESTIONS = [
  {
    title: "Find me an",
    description: "internal medicine doctor",
  },
  {
    title: "I need a doctor",
    description: "near Galatyn Pkwy, 75082",
  },
  {
    title: "Find me an internal",
    description: "medicine doctor near me",
  },
  {
    title: "I need to go",
    description: "to the nearest emergency room",
  },
];

export default Chat;
