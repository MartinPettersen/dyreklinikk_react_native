import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import TimePicker from "./TimePicker";
import { Clinic } from "../../utils/types";
import BasicButton from "../(util)/BasicButton";
import { useUser } from "../../components/(user)/UserContext";

type DayObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

type Props = {
  vet: any;
  clinic: Clinic;
  navigation: any
};

const ClinicBookingPage = ({ vet, clinic, navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { user } = useUser();
  console.log("user ",user)
  const onDayPress = (day: DayObject) => {
    setSelectedDate(day.dateString);
    setShowTimePicker(true);
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
        style={{ borderRadius: 5 }}
      />
      {showTimePicker ? (
        <TimePicker
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          openingHours={clinic.openingHour}
          closingHours={clinic.closingHour}
          timeBrackets={15}
        />
      ) : null}
      <View style={{ margin: 10 }}>
        <BasicButton
          label="Bestill Time"
          action={() => user? console.log("Bestill time") : navigation.navigate("Login")}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: "#52525b",
    alignItems: "center",
    borderRadius: 5,
    margin: 20,
    width: "88%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ClinicBookingPage;
