// App.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import LoginScreen from "./Auth/login";
import HomeScreen from "./(tabs)/index";
import CartScreen from "./(tabs)/cart";
import FavouriteScreen from "./(tabs)/favourite";
import NotificationScreen from "./(tabs)/notice";
import { Avatar, IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF5733",
        tabBarInactiveTintColor: "#2a2a2a",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          headerShown: false,
          title: "Favourite",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
          title: "Notification",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cart" : "cart-outline"}
              color={focused ? "#FF5733" : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: 240,
        },
        drawerActiveBackgroundColor: "#ffd7be",
        drawerActiveTintColor: "#2a2a2a",
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: "#2a2a2a",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={({ navigation }) => ({
            headerShown: true,
            gestureEnabled: false,
            headerRight: () => (
              <Avatar.Image
                size={36}
                source={require("../assets/images/avatar_2.png")}
                style={styles.avatarBG}
              />
            ),
            headerLeft: () => (
              <IconButton
                mode="contained"
                icon="menu"
                iconColor={"#2a2a2a"}
                containerColor={"transparent"}
                size={20}
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
          })}
        />
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  avatarBG: {
    backgroundColor: "#ffd7be",
  },
});
export default App;



