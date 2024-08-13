import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TimeSlotTag from "./TimeSlotTag";

type Props = {
  selectedTime: string | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  openingHours: string;
  closingHours: string;
  timeBrackets: number;
};

const TimePicker = ({
  selectedTime,
  setSelectedTime,
  openingHours,
  closingHours,
  timeBrackets,
}: Props) => {
  const openingHour = parseInt(openingHours.slice(0, 2));
  const openingMinuttes = parseInt(openingHours.slice(3, 5));
  const closingHour = parseInt(closingHours.slice(0, 2));
  const closingMinuttes = parseInt(closingHours.slice(3, 5));

  const [brackets, setBrackets] = useState<string[]>([]);

  useEffect(() => {
    const times = [];
    for (let i = openingHour; i < closingHour; i++) {
      for (let j = 0; j < 60; j += 15) {
        times.push(`${i < 10 ? `0${i}` : i}:${j < 10 ? `0${j}` : j}`);
      }
    }
    setBrackets(times);
  }, []);

  return (
    <View style={styles.container}>
      {brackets.length > 0 ? (
        <ScrollView style={{width: "90%", height: "100%"}}>
          {brackets.map((bracket) => (
            <TimeSlotTag time={bracket} action={() => setSelectedTime(bracket)} />
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
