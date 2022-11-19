import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import Keyboard from "./src/components/Keyboard";
import { colors } from "./src/constants";

const NUMBER_OF_TRIES = 6;
const word = "hello";
const letters = word.split("");

export default function App() {
  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES)
      .fill("")
      .map(() => new Array(letters.length).fill(""))
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  const onKeyPressed = (key) => {
    let copyArray = [...rows];
    if (key == "clear") {
      const prevCol = curCol - 1;
      copyArray[curRow][prevCol] = "";
      setRows(copyArray);
      setCurCol(prevCol);
      return;
    } else if (key == "enter") {
    }

    copyArray[curRow][curCol] = key;
    setRows(copyArray);
    if (curCol == letters.length - 1 && curRow != NUMBER_OF_TRIES - 1) {
      setCurCol(0);
      setCurRow((row) => row + 1);
    } else if (curRow == NUMBER_OF_TRIES - 1 && curCol == letters.length - 1) {
      setCurRow(0);
      setCurCol(0);
    } else setCurCol(curCol + 1);
  };
  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>WORDLE</Text>
        <ScrollView style={styles.map}>
          {rows.map((row, i_row) => (
            <View style={styles.row} key={i_row}>
              {row.map((cell, i_col) => (
                <View
                  style={[
                    styles.cell,
                    {
                      borderColor: isCellActive(i_row, i_col)
                        ? colors.grey
                        : colors.darkgrey,
                    },
                  ]}
                  key={`${cell}-${i_col}`}
                >
                  <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <Keyboard onKeyPressed={onKeyPressed} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
  map: {
    alignSelf: "stretch",
    marginVertical: 20,
    height: 100,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1,
    aspectRatio: 1,
    margin: 3,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontSize: 28,
    fontWeight: "bold",
  },
});
