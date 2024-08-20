import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type Props = {
  bracket: {time: string, booked: boolean};
  action: () => void;
  selectedTime: string | null
};

const TimeSlotTag = ({ bracket, action, selectedTime }: Props) => {
  return (
    <TouchableOpacity onPress={action} style={[styles.button, styles.shadow, {backgroundColor: bracket.booked ? "#a3a3a3" : (selectedTime == bracket.time) ? "#0ea5e9" : "#7dd3fc"}, ]} disabled={bracket.booked}>
      <Text style={styles.text}>
        <Text style={styles.bold}>{bracket.time}</Text>
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
    marginVertical: 8,
    width: "100%",
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
    alignItems: "center",
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

export default TimeSlotTag;
