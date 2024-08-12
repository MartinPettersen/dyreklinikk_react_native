import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

type DayObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

type Props = {
  vet: any;
};

const ClinicBookingPage = ({ vet }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const onDayPress = (day: DayObject) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bestill Time Hos {vet.name}</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: false,
            selectedColor: "#bae6fd",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    backgroundColor: "#52525b",
    alignItems: "center",
    borderRadius: 5,
    margin: 20,
  },
  text: {
    color: "white",
  },
});

export default ClinicBookingPage;
