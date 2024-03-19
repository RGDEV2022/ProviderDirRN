import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import ReModal from "../ui/ReModal";
import { BlurView } from "expo-blur";
import KeyboardAwareInput from "../ui/KeyboardAwareInput";
import LottieView from "lottie-react-native";
import {
  IOS_BLUE,
  IOS_GRAY,
  IOS_LIGHT_GRAY,
  IOS_TEXT_GRAY,
  STANDARD_PADDING,
  WS_URL,
} from "../constants";
import Card from "../ui/Card";
import CircleButton from "../ui/CircleButton";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSheetState from "../store/store";
import useWebsocket from "../hooks/useWebsocket";
import WebView from "react-native-webview";

type TMessage = {
  type: "system" | "user";
  message: string;
};

const Chat = ({
  setIsChatOpen,
}: {
  setIsChatOpen: (state: boolean) => void;
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<TMessage[] | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const shouldShowSuggestions =
    !isKeyboardVisible && !messages && text.length === 0;
  const { handleModal } = useSheetState();

  const { data, sendWSMessage } = useWebsocket(WS_URL);

  useEffect(() => {
    handleModal(true);
  }, []);

  useEffect(() => {
    if (data) {
      if (data.includes("isWorking")) {
        const workingObj = JSON.parse(data);
        const status = workingObj.isWorking;
        if (status === true) {
          setTimeout(() => {
            setIsWorking(true);
          }, 500);
        } else {
          setIsWorking(false);
        }
      } else {
        const isObject = data.includes("{");
        console.log(data);
        const parsedData = isObject ? JSON.parse(data) : data;
        console.log(parsedData);
        setMessages((prev) => {
          if (!prev) {
            return [{ message: parsedData, type: "system" }];
          }
          return [...prev, { message: parsedData, type: "system" }];
        });
      }
    }
  }, [data]);

  const handleSendMessage = (message: string, type: "system" | "user") => {
    sendWSMessage(
      JSON.stringify({
        message: message,
        history: messages,
        type: "generalPrompt",
      })
    );

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
          ref={scrollViewRef}
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {/* <KeyboardAvoidingView
            behavior={"padding"}
            style={{
              flexGrow: 1,
              // justifyContent: "flex-end",
              paddingLeft: STANDARD_PADDING,
              paddingRight: STANDARD_PADDING,
            }}
          > */}
          <View
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: STANDARD_PADDING,
              paddingBottom: isKeyboardVisible ? 60 : 0,
              paddingLeft: STANDARD_PADDING,
              paddingRight: STANDARD_PADDING,
            }}
          >
            {messages?.map((message, i) => (
              <MessageBubble
                key={i}
                type={message.type}
                message={message.message}
              />
            ))}
            {isWorking && <MessageBubble type="working" />}
          </View>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>

        {shouldShowSuggestions && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
            >
              <View
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
                  <Card key={i} onPress={() => console.log("pressed")}>
                    <Text style={{ color: "#fff", fontWeight: "800" }}>
                      {suggestion.title}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 11 }}>
                      {suggestion.description}
                    </Text>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        )}
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
            text.length > 0 && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <CircleButton
                  onPress={() => handleSendMessage(text, "user")}
                  color={IOS_BLUE}
                  height={17}
                  width={17}
                >
                  <AntDesign name="arrowup" size={13} color="#fff" />
                </CircleButton>
              </Animated.View>
            )
          }
        />
      </View>
    </ReModal>
  );
};

type TComponentNames = "requestCardCompletion" | "downloadWelcomeLetter";
type TComponent = {
  name: TComponentNames;
  props: {
    title: string;
    description: string;
    action: any;
  };
};

const MessageBubble = ({
  type,
  message,
}: {
  type: "system" | "user" | "working";
  message?: string | TComponent;
}) => {
  const isWorking = type === "working";
  const isSystem = type === "system" || type === "working";
  const isComponent = typeof message !== "string";
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isSystem ? "flex-start" : "flex-end",
        alignSelf: isSystem ? "flex-start" : "flex-end",
        maxWidth: "85%",
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        borderBottomLeftRadius: isSystem ? 0 : undefined,
        borderBottomRightRadius: isSystem ? 15 : 0,
        backgroundColor: isSystem ? IOS_GRAY : IOS_BLUE,
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
        {isWorking ? (
          <View>
            <LottieView
              autoPlay
              resizeMode="cover"
              style={{
                width: 30,
                height: 15,
              }}
              source={require("../animations/typing.json")}
            />
          </View>
        ) : isComponent ? (
          <ComponentToRender component={message} />
        ) : (
          <Text
            style={{
              color: "white",
            }}
          >
            {message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

const ComponentToRender = ({ component }: { component: TComponent }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { name } = component;

  console.log(component.props.action, "action");
  if (name === "requestCardCompletion") {
    return (
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <LottieView
            autoPlay
            resizeMode="cover"
            style={{
              width: 45,
              height: 45,
            }}
            source={require("../animations/doneAnim.json")}
            loop={false}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "85%",
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              {component.props.title}
            </Text>
            <Text style={{ color: "white" }}>
              {component.props.description}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (name === "downloadWelcomeLetter") {
    return (
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "85%",
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              {component.props.title}
            </Text>
            <Text style={{ color: "white" }}>
              {component.props.description}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 100,
              width: 32,
              height: 32,
            }}
          >
            <LottieView
              autoPlay
              resizeMode="cover"
              style={{
                position: "absolute",
                width: 50,
                height: 50,
              }}
              source={require("../animations/downloadAnim.json")}
              loop={false}
            />
          </TouchableOpacity>
        </View>
        <ReModal
          visible={modalVisible}
          handleCloseModal={() => setModalVisible(false)}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}
        >
          <WebView
            source={{ uri: component.props.action }}
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
            startInLoadingState={true}
            renderLoading={() => (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LottieView
                  autoPlay
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 30,
                  }}
                  source={require("../animations/typing.json")}
                />
              </View>
            )}
          />
        </ReModal>
      </View>
    );
  }
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
