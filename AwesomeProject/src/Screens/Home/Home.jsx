import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  return (
    <Tabs.Navigator screenOptions={styles.tabNav}>
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerTitle: () => <Text style={styles.mainTitle}>Публікації</Text>,

          headerRight: () => (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="log-out-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-grid-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.mainTitle}>Створити публікацію</Text>
          ),

          headerLeft: () => (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#212121" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="log-out-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    marginBottom: 11,
    marginTop: 11,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
  },

  iconBtn: {
    marginRight: 16,
    marginBottom: 10,
    marginTop: 11,
    marginLeft: 16,
  },

  tabNav: {
    headerTitleAlign: "center",
    tabBarShowLabel: false,
    tabBarActiveBackgroundColor: "#FF6C00",
    tabBarActiveTintColor: "#ffffff",
    tabBarInactiveTintColor: "#212121",
    tabBarStyle: {
      paddingTop: 9,
      paddingBottom: 22,
      paddingHorizontal: 82,
      borderTopWidth: 1,
      borderColor: "#E5E5E5",
      height: 70,
    },
    tabBarItemStyle: {
      borderRadius: 20,
    },
  },
});

export default Home;
