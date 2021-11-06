import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CalcButton from "../helpers/components/CalcButton";
import { ClearButton } from "../helpers/components/FuncButtons";
import { getClub } from "../helpers/calculator";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";

function ShootScreenFormat({ navigation }) {
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState(0);
  const [wind, setWind] = useState(0);
  const [rough, setRough] = useState(false);
  const [sand, setSand] = useState(false);

  let actualDistance =
    Number(distance) + elevation + wind + (sand ? 3 : 0) + (rough ? 5 : 0);
  let execute = getClub(actualDistance);

  console.log("actual distance:", actualDistance);

  const handleDistance = (stringDigit) => {
    setDistance(distance + stringDigit); // if this is broken put back to "dig"
  };
  const handleEleUP = () => {
    setElevation(elevation + 1);
  };
  const handleEleDWN = () => {
    setElevation(elevation - 1);
  };
  const handleWindUP = () => {
    setWind(wind + 1);
  };
  const handleWindDWN = () => {
    setWind(wind - 1);
  };
  const handleClear = () => {
    setDistance("");
    setElevation(0);
    setWind(0);
    setRough(false);
    setSand(false);
  };

  return (
    <View style={styles.shootScreenContainer}>
      <View style={styles.shotDisplayContainer}>
        <View style={styles.shotDisplayWindow}>
          {distance > 5 ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.shotDisplayClubFont}>{execute.club}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.shotDisplayPercentFont}>
                  {execute.power}
                </Text>
                <Text style={styles.shotDisplayPercentSymbol}>%</Text>
              </View>
            </View>
          ) : (
            <Text style={[styles.shotDisplayClubFont, { fontSize: hp("4%") }]}>
              enter distance
            </Text>
          )}
        </View>
      </View>
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardLabelBox}>
          <Text style={styles.labelElement}>Distance</Text>
          <Text style={styles.labelElement}>Elevation</Text>
          <Text style={styles.labelElement}>Wind</Text>
        </View>
        <View style={styles.dashboardDisplayBox}>
          <View>
            {distance ? (
              <Text style={styles.displayElement}>{distance}</Text>
            ) : (
              <Text style={styles.displayElement}>0</Text>
            )}
          </View>

          <Text style={styles.displayElement}>{elevation}</Text>

          <Text style={styles.displayElement}>{wind}</Text>
        </View>
        <View style={styles.elevationBox}>
          <View style={[styles.elevationElement, { marginTop: hp("1%") }]}>
            <Feather
              size={hp("5%")}
              name="arrow-up-circle"
              onPress={handleEleUP}
            />
          </View>
          <View style={styles.elevationElement}>
            {/* <Foundation name="mountains" size={55} color="black" /> */}
            <MaterialCommunityIcons
              name="elevation-rise"
              size={hp("5%")}
              color="black"
            />
          </View>
          <View style={styles.elevationElement}>
            <Feather
              size={hp("5%")}
              name="arrow-down-circle"
              onPress={handleEleDWN}
            />
          </View>
        </View>
        <View style={styles.windBox}>
          <View style={[styles.windElement, { marginTop: hp("1%") }]}>
            <Feather
              size={hp("5%")}
              name="arrow-down-circle"
              onPress={handleWindUP}
            />
          </View>
          <View style={styles.windElement}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={hp("5%")}
              color="black"
            />
          </View>
          <View style={styles.windElement}>
            <Feather
              size={hp("5%")}
              name="arrow-up-circle"
              onPress={handleWindDWN}
            />
          </View>
        </View>
      </View>
      <View style={styles.clearContainer}>
        <View style={styles.clearButton}>
          <ClearButton onPress={handleClear} text="Clear" />
        </View>
      </View>
      <View style={styles.calcButtonContainer}>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("7")} text="7" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("8")} text="8" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("9")} text="9" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton
              onPress={() => setSand(sand ? false : true)}
              special={sand}
              text="S"
            />
          </View>
        </View>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("4")} text="4" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("5")} text="5" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("6")} text="6" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton
              onPress={() => setRough(rough ? false : true)}
              special={rough}
              text="R"
            />
          </View>
        </View>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("0")} text="0" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("1")} text="1" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("2")} text="2" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("3")} text="3" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ShootScreenFormat;

const styles = StyleSheet.create({
  shootScreenContainer: {
    paddingTop: hp("5%"),
  },
  shotDisplayContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("86%"),
    height: hp("15%"),
    left: wp("8%"),
    marginBottom: hp("3.5%"),
  },
  shotDisplayWindow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: wp("86%"),
    height: hp("20%"),
    borderRadius: 10,
    marginTop: hp("1.5%"),
    marginLeft: wp("6%"),
    marginRight: wp("6%"),
  },
  shotDisplayClubFont: {
    textAlign: "center",

    marginRight: wp("6%"), //25
    fontSize: hp("10%"),
    fontWeight: "bold",
  },
  shotDisplayPercentFont: {
    textAlign: "center",
    paddingTop: hp("4.8%"),
    paddingLeft: wp("2.6"),
    paddingRight: wp("2.6"),
    fontSize: hp("6%"),
    fontWeight: "bold",
  },
  shotDisplayPercentSymbol: {
    textAlign: "center",
    paddingTop: hp("8.4%"),
    paddingRight: wp("1.6"),
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  dashboardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("86%"),
    height: hp("20%"),
    left: wp("8%"),
  },
  dashboardLabelBox: {
    flexDirection: "column",
    height: wp("15%"),
    width: wp("26.3%"),
    marginTop: hp("2%"),
  },
  labelElement: {
    height: wp("14.6%"),
    width: wp("25.6%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  dashboardDisplayBox: {
    flexDirection: "column",
    height: wp("15%"),
    width: wp("26%"),
    marginRight: wp("2%"),
  },
  displayElement: {
    height: wp("14.6%"),
    width: wp("25.6%"),
    fontSize: hp("4%"),
    textAlign: "center",
  },
  elevationBox: {
    flexDirection: "column",
    width: wp("19.3%"),
  },
  windBox: {
    flexDirection: "column",
    width: wp("19.3%"),
  },
  elevationElement: {
    height: wp("14.6%"),
    width: wp("19.3%"),
    // marginTop: hp("1%"),
  },
  windElement: {
    height: wp("14.6%"),
    width: wp("19.3%"),
  },
  clearContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp("6%"),
    marginTop: hp("2.5%"),
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: colors.red,
    width: wp("86%"),
    height: hp("5.5"),
    left: wp("8%"),
    borderRadius: 10,
  },
  calcButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: wp("86%"),
    left: wp("8%"),
  },
  calcButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  calcButton: {
    backgroundColor: colors.green,
    height: wp("17.6%"),
    width: wp("17.6%"),
    borderRadius: 10,
    marginTop: hp("2.4%"), //20
    marginLeft: wp("5.3%"), //20
    marginRight: wp("5.3%"), //20
  },
  font: {
    fontSize: hp("2.3%"), //19
    textAlign: "center",
    fontWeight: "bold",
  },
});
