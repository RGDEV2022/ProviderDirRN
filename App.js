import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./screens/Map";
import PopOverScreen from "./screens/PopOverScreen";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Map}
                options={{ header: () => null }}
              />
              <Stack.Screen name="Details" component={PopOverScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
