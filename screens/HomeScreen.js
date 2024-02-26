import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { theme } from "../theme";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants/index";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});

  const handleLocation = (loc) => {
    console.log("Location", loc);
    setLocations([]);
    setShowSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      console.log("Forecast data :", data);
    });
  };

  const handleSearch = (value) => {
    console.log(value);

    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      <Image
        blurRadius={50}
        source={require("../assets/bg.png")}
        className="absolute h-full w-full"
      />

      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search city"
                placeholderTextColor={"lightgray"}
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>

          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1 " +
                      borderClass
                    }
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text className="text-black text-lg ml-2">
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/* Forecast section */}
        <View className="mx-4 flex justify-around flex-1 mb-4">
          {/* Location */}
          <Text className="text-white text-center text-2xl font-bold">
            {location?.name},
            <Text className="text-lg font-semibold text-gray-300">
              {" "+location?.country}
            </Text>
          </Text>

          {/* Weather image */}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/Image.webp")}
              className="w-52 h-52"
            ></Image>
          </View>
        </View>

        {/* Degree celcius */}
        <View className="space-y-1 mb-10">
          <Text className="text-center font-bold text-white text-6xl ml-5">
            {current?.temp_c}&#176;
          </Text>

          <Text className="text-center  text-white text-xl tracking-widest">
            {current?.condition?.text}
          </Text>
        </View>

        <View className="flex-row justify-between mx-4">
          <View className="flex-row space-x-2 items-center justify-center">
            <Image
              //  source={weatherImages[current?.condition?.text]}
              source={{uri: "https:"+current?.condition?.icon}}
              className="h-6 w-6"
            ></Image>
            <Text className="text-white font-semibold text-base">22kmh</Text>
          </View>

          <View className="flex-row space-x-2 items-center justify-center">
            <Image
              source={require("../assets/water-drop.png")}
              className="h-6 w-6"
            ></Image>
            <Text className="text-white font-semibold text-base">23%</Text>
          </View>

          <View className="flex-row space-x-2 items-center justify-center">
            <Image
              source={require("../assets/sun.png")}
              className="h-6 w-6"
            ></Image>
            <Text className="text-white font-semibold text-base">6:05 AM</Text>
          </View>
        </View>

        {/* forecast for next days */}
        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size="22" color="white" />
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontallScrollIndicator={false}
        >
          <View
            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 "
            style={{ backgroundColor: theme.bgWhite(0.15) }}
          >
            <Image
              source={require("../assets/moon.png")}
              className="h-11 w-11"
            />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">13&#176;</Text>
          </View>

          {/* <View
            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 "
            style={{ backgroundColor: theme.bgWhite(0.15) }}
          >
            <Image source={require("../assets/")} className="h-11 w-11" />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">13&#176;</Text>
          </View>

          <View
            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 "
            style={{ backgroundColor: theme.bgWhite(0.15) }}
          >
            <Image source={require("../assets/")} className="h-11 w-11" />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">13&#176;</Text>
          </View>

          <View
            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 "
            style={{ backgroundColor: theme.bgWhite(0.15) }}
          >
            <Image source={require("../assets/")} className="h-11 w-11" />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">13&#176;</Text>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
