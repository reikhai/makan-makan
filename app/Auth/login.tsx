// App.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Provider as PaperProvider,
  Title,
  Snackbar,
  Surface,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedInput } from "@/components/ThemedInput";
import { CommonActions } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = () => {
    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
      setVisible(true);
    } else {
      // Handle login logic
      console.log("Login successful");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Drawer" }], // Set HomeTabs as the new root
        })
      );
    }
  };

  const handleEmailInputChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordInputChange = (text: string) => {
    setPassword(text);
  };

  return (
    <PaperProvider>
      <LinearGradient colors={["#FFFFFF", "#F0F0F0"]} style={styles.gradient}>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.container}>
            <Link href="/Auth/register" style={styles.registerButton}>
              <ThemedText style={styles.registerButtonText}>
                Register
              </ThemedText>
            </Link>
            <Surface style={styles.surface} elevation={2}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Title>Login</Title>
              <ThemedInput
                mode="outlined"
                label="Email"
                value={email}
                secureTextEntry={false}
                onChangeText={handleEmailInputChange}
              />
              <ThemedInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={handlePasswordInputChange}
                secureTextEntry={true}
              />
              <TouchableOpacity onPress={onLogin} style={styles.button}>
                <LinearGradient
                  colors={["#FF5733", "#FFBD33"]}
                  style={styles.button}
                  start={{ x: 0.8, y: 0 }} // Start from the right
                  end={{ x: 0, y: 0 }} // End on the left
                >
                  <ThemedText style={styles.buttonText}>Login</ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            </Surface>
            <Snackbar
              visible={visible}
              onDismiss={() => setVisible(false)}
              duration={3000}
            >
              {errorMessage}
            </Snackbar>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1, // Make sure the gradient covers the whole screen
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 5,
    paddingVertical: 16, // Padding for the button
    alignItems: "center", // Center text horizontally
  },
  buttonText: {
    color: "white", // Set your desired text color
    fontSize: 18,
    fontWeight: "bold",
  },
  surface: {
    padding: 20,
    borderRadius: 15,
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  registerButton: {
    position: "absolute", // Position it absolutely
    top: 10, // Adjust the top position
    right: 16, // Adjust the right position
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5733",
  },
});

export default LoginScreen;
