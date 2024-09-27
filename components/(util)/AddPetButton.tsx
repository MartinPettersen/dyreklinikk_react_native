import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  label: keyof typeof Feather.glyphMap;
  action: () => void;
  disabled: boolean
};

const IconButton = ({ label, action, disabled }: Props) => {
  return <TouchableOpacity onPress={action} style={[styles.button, styles.shadow]} disabled={disabled} >
    <Feather name={label} size={40} color={"#52525b"} />
    <Feather name={"plus"} size={36} color={"#52525b"} />

  </TouchableOpacity>;
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#bae6fd",
        padding: 2,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#52525b",
        flexDirection: "row"
    },
    label: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#52525b"
    },
    shadow: {
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 3, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
})


export default IconButton;
