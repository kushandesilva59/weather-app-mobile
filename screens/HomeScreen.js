import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";

import { image } from "../assets/images/moderate-rain.jpg";
import { theme, weatherImages } from "../constants/index";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLocation = (loc) => {
    console.log("Location", loc);
    setShowSearch(false);

    setLocations([]);
    setSearchText(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
  
      // console.log("Forecast data :", data);
    });
  };

  const handleSearch = (value) => {
    console.log(value);

    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        console.log("search : ", data);
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {

    fetchWeatherForecast({
      cityName:"Aluthgama",
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      <Image
        blurRadius={40}
        source={require("../assets/bg.png")}
        className="absolute h-full w-full"
      />

      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb4b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
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
          <View className="mx-4 flex justify-around flex-1 pt-2">
            {/* Location */}
            <Text className="text-white text-center text-2xl font-bold mt-5">
              {location?.name},
              <Text className="text-lg font-semibold text-gray-300">
                {` ${location?.country}`}
              </Text>
            </Text>

            {/* Weather image */}
            <View className="flex-row justify-center">
              <Image
                // ok this
                source={weatherImages[current?.condition?.text]}
                className="w-48 h-48"
              ></Image>
            </View>
          </View>

          {/* Degree celcius */}
          <View className="space-y-1 mb-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              {current?.temp_c}&#176;
            </Text>

            <Text className="text-center  text-white text-xl tracking-widest">
              {current?.condition?.text}
            </Text>
          </View>

          <View className="flex-row justify-between mx-5 my-2">
            <View className="flex-row space-x-2 items-center justify-center">
              <Image
                source={require("../assets/windmills.png")}
                className="h-6 w-6"
                space-y-3
              ></Image>
              <Text className="text-white font-semibold text-base">
                {current?.wind_kph}kmh
              </Text>
            </View>

            <View className="flex-row space-x-2 items-center justify-center">
              <Image
                source={require("../assets/water-drop.png")}
                className="h-6 w-6"
              ></Image>
              <Text className="text-white font-semibold text-base">
                {current?.humidity}%
              </Text>
            </View>

            <View className="flex-row space-x-2 items-center justify-center">
              <Image
                source={require("../assets/sun.png")}
                className="h-6 w-6"
              ></Image>
              <Text className="text-white font-semibold text-base">
                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
              </Text>
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
            {weather?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: "long" };
              let dayName = date.toLocaleDateString("en-US", options);
              dayName = dayName.split(",")[0];

              return (
                <View
                  key={index}
                  className="flex justify-center items-center w-24 h-30 rounded-3xl mx-2"
                  style={{ backgroundColor: theme.bgWhite(0.15) }
                }
                >
                  <Image
                    source={weatherImages[item?.day?.condition?.text]}
                    className="w-20 h-20"
                  />
                  <Text className="text-white">{dayName}</Text>
                  <Text className="text-white text-xl font-semibold">
                    {item?.day?.avgtemp_c}&#176;
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
