import { type TextInputProps, StyleSheet } from "react-native";
import {
  TextInput,
} from "react-native-paper";

export type ThemedInputProps = TextInputProps & {
  mode?: "outlined" | "flat";
  label?: string;
  value?: any;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void; // Optional custom onChangeText prop
};

export function ThemedInput({
  mode = "outlined",
  label,
  value,
  secureTextEntry, // Accept secureTextEntry as a prop
  onChangeText,
  ...rest
}: ThemedInputProps) {
  return (
    <TextInput
      outlineColor="#e435"
      activeOutlineColor="#FF5733"
      mode={mode}
      label={label}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={(text) => {
        if (onChangeText) {
          onChangeText(text); // Call the passed in onChangeText prop
        }
      }}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    width: "100%",
  },
});
