import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  action: () => void;
  disabled: boolean
};

const DeleteButton = ({ label, action, disabled }: Props) => {
  return <TouchableOpacity onPress={action} style={[styles.button, styles.shadow]} disabled={disabled} >
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ef4444",
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#52525b", 
    },
    label: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white"
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


export default DeleteButton;
