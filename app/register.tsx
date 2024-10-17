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
  TextInput,
  Title,
  Snackbar,
  Surface,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // Use this if using Expo
import { ThemedText } from "@/components/ThemedText";
import { ThemedInput } from "@/components/ThemedInput";
const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegister = () => {
    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
      setVisible(true);
    } else {
      // Handle login logic
      console.log("Register successful");
    }
  };

  return (
    <PaperProvider>
      <LinearGradient
        colors={["#FFFFFF", "#F0F0F0"]} // Light gradient from white to a very light gray
        style={styles.gradient} // Apply gradient style
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.container}>
            <Surface style={styles.surface} elevation={2}>
              <Image
                source={require("../assets/images/logo.png")} // Adjust the path to your logo
                style={styles.logo}
                resizeMode="contain"
              />
              <Title>Register</Title>
              <TextInput
                outlineColor="#e435"
                activeOutlineColor="#FF5733"
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                outlineColor="#e435"
                activeOutlineColor="#FF5733"
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                outlineColor="#e435"
                activeOutlineColor="#FF5733"
                label="Confrim Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
                style={styles.input}
                mode="outlined"
              />
              <TouchableOpacity onPress={onRegister} style={styles.button}>
                <LinearGradient
                  colors={["#FF5733", "#FFBD33"]} // Your gradient colors
                  style={styles.button}
                  start={{ x: 0.8, y: 0 }} // Start from the right
                  end={{ x: 0, y: 0 }} // End on the left
                >
                  <ThemedText style={styles.buttonText}>Register</ThemedText>
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
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default App;
