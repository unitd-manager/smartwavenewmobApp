import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Categories from "./screens/Categories";
import Cart from "./screens/Cart";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the default header
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Account") {
            iconName = "person-outline";
          } else if (route.name === "Cart") {
            iconName = "cart-outline";
          } else if (route.name === "Categories") {
            iconName = "grid-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1EB1C5",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: "Smart wave",
          headerStyle: { backgroundColor: "#1EB1C5" , borderBottomLeftRadius:20 , borderBottomRightRadius:20 }, // Style the header
          headerTintColor: "#fff", // Style the text
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: true,
          headerTitle: "Categories",
          headerStyle: { backgroundColor: "#1EB1C5" , borderBottomLeftRadius:20 , borderBottomRightRadius:20 },
          headerTintColor: "#fff",
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerTitle: "Account",
          headerStyle: { backgroundColor: "#1EB1C5" , borderBottomLeftRadius:20 , borderBottomRightRadius:20 },
          headerTintColor: "#fff",
        }}
      />
    </Tab.Navigator>
  );
}
