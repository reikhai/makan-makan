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
import { DrawerActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

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

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{
          fontSize: 16,
          fontWeight: "bold",
          marginLeft: -25,
          color: "#202020",
        }}
        onPress={() => props.navigation.navigate("Login")}
        icon={({ focused, color, size }) => (
          <Ionicons
            color="#202020"
            size={25}
            name={focused ? "log-out" : "log-out-outline"}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

const getScreenOptions = (navigation, iconName) => ({
  headerShown: true,
  drawerIcon: ({ color, focused }) => (
    <TabBarIcon
      name={focused ? iconName : `${iconName}-outline`}
      color={focused ? "#FF5733" : color}
      size={25}
    />
  ),
  headerLeft: () => (
    <IconButton
      mode="contained"
      icon="menu"
      iconColor={"#2a2a2a"}
      containerColor={"transparent"}
      size={20}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  ),
  headerRight: () => (
    <Avatar.Image
      size={36}
      source={require("../assets/images/avatar_2.png")}
      style={styles.avatarBG}
    />
  ),
});


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#FFFFFF",
          width: 220,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          marginLeft: -25,
          marginTop: 3,
        },
        drawerActiveBackgroundColor: "#FFFFFF",
        drawerActiveTintColor: "#FF5733",
        drawerInactiveTintColor: "#2a2a2a",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home Tabs"
        component={HomeTabs}
        options={({ navigation }) => getScreenOptions(navigation, "cart")}
      />

      <Drawer.Screen
        name="Profile"
        component={HomeTabs}
        options={({ navigation }) => getScreenOptions(navigation, "person")}
      />

      <Drawer.Screen
        name="Settings"
        component={HomeTabs}
        options={({ navigation }) => getScreenOptions(navigation, "settings")}
      />

      <Drawer.Screen
        name="Needs Help?"
        component={HomeTabs}
        options={({ navigation }) => getScreenOptions(navigation, "help-circle")}
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
            headerShown: false,
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
    marginRight: 20,
  },
});

export default App;



