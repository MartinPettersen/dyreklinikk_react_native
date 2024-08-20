import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TimeSlotTag from "./TimeSlotTag";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  selectedTime: string | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  openingHours: string;
  closingHours: string;
  timeBrackets: number;
  bookedTimeSlots: any[]
};

const TimePicker = ({
  selectedTime,
  setSelectedTime,
  openingHours,
  closingHours,
  timeBrackets,
  bookedTimeSlots
}: Props) => {
  const openingHour = parseInt(openingHours.slice(0, 2));
  const openingMinuttes = parseInt(openingHours.slice(3, 5));
  const closingHour = parseInt(closingHours.slice(0, 2));
  const closingMinuttes = parseInt(closingHours.slice(3, 5));

  const [brackets, setBrackets] = useState<{time: string, booked: boolean}[]>([]);


  const checkIfTaken = (time: string) => {
    for (let i = 0; i < bookedTimeSlots.length; i++ ){
      console.log(time + " | " + bookedTimeSlots[i].time)
      if (time == bookedTimeSlots[i].time) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    const times = [];
    for (let i = openingHour; i < closingHour; i++) {
      for (let j = 0; j < 60; j += 15) {
        const isBooked  = checkIfTaken(`${i < 10 ? `0${i}` : i}:${j < 10 ? `0${j}` : j}`)
        console.log("booked", checkIfTaken(`${i < 10 ? `0${i}` : i}:${j < 10 ? `0${j}` : j}`))
        times.push({time: `${i < 10 ? `0${i}` : i}:${j < 10 ? `0${j}` : j}`, booked: isBooked});
        console.log("treatments that day", bookedTimeSlots)
      }
    }
    setBrackets(times);
  }, []);


  return (
    <View style={styles.container}>
      {brackets.length > 0 ? (
        <ScrollView style={{width: "90%", height: "100%"}}>
          {brackets.map((bracket) => (
            <TimeSlotTag key={bracket.time} bracket={bracket} selectedTime={selectedTime} action={() => setSelectedTime(bracket.time)} />
          ))}
        </ScrollView>
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
    height: 300,
    
  },
});

export default TimePicker;
