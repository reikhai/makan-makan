import "react-native-gesture-handler";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Auth/register"
        options={{
          headerShown: true,
          title: "Register",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
