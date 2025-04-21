import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

// Screens
import Home from "./screens/Home";
import Account from "./screens/Account";
import Categories from "./screens/Categories";
import Cart from "./screens/Cart";
import ProductList from "./screens/ProductList";
import ProductDetails from "./screens/ProductDetails";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 💡 Home Stack
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={Home} />
    <Stack.Screen name="ProductList" component={ProductList} options={{ title: "Products" }}  />
    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: "Product Details" }}  />
  </Stack.Navigator>
);

// 💡 Categories Stack
const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen name="CategoriesMain" component={Categories} />
    <Stack.Screen name="ProductList" component={ProductList} options={{ title: "Products" }}  />
    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: "Product Details" }}/>
  </Stack.Navigator>
);

// 💡 Cart Stack
const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CartMain" component={Cart} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: "Product Details" }}  />
  </Stack.Navigator>
);

// 💡 Account Stack
const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountMain" component={Account} />
  </Stack.Navigator>
);

// ✅ Tab Navigator
export default function TabNavigator() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Categories") iconName = "grid-outline";
          else if (route.name === "Cart") iconName = "cart-outline";
          else if (route.name === "Account") iconName = "person-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1EB1C5",
        tabBarInactiveTintColor: "gray",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1EB1C5",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Outfit-Regular",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Smart Wave" }} />
      <Tab.Screen name="Categories" component={CategoriesStack} />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarBadge: items.length > 0 ? items.length : null,
          tabBarBadgeStyle: {
            backgroundColor: "#1EB1C5",
            color: "#fff",
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}
