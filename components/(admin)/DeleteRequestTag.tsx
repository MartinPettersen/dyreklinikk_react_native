import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type Props = {
  request: any;
  action: () => void;
};

const DeleteRequestTag = ({ request, action }: Props) => {
  return (
    <TouchableOpacity onPress={action} style={[styles.button, styles.shadow]}>
      <Text style={styles.label}>Forespørsel om sletting</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Grunn:  </Text>
        {request.reason}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Forespørsel sent fra: </Text>
        {request.requestedBy}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7dd3fc",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#52525b",
    marginTop: 20,
    width: "98%"
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#52525b",
  },
  shadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    color: "#52525b",
    margin: 3,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default DeleteRequestTag;
