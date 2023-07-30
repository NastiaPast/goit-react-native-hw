import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import Home from "./src/Screens/Home/Home";
import CommentsScreen from "./src/Screens/CommentsScreen/CommentsScreen";
import MapScreen from "./src/Screens/MapScreen/MapScreen";

export default function App() {
  const Stack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
            transitionSpec: {
              open: { animation: "timing", config: { duration: 0 } },
              close: { animation: "timing", config: { duration: 0 } },
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            transitionSpec: {
              open: { animation: "timing", config: { duration: 0 } },
              close: { animation: "timing", config: { duration: 0 } },
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            transitionSpec: {
              open: { animation: "timing", config: { duration: 0 } },
              close: { animation: "timing", config: { duration: 0 } },
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
