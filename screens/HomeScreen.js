import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc) => {
    console.log("Location", loc);
  };

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
                      London, united kingdom
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
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
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
            23&#176;
          </Text>

          <Text className="text-center  text-white text-xl tracking-widest">
            Partly cloudy
          </Text>
        </View>

        <View className="flex-row justify-between mx-4">
          <View className="flex-row space-x-2 items-center justify-center">
            <Image
              source={require("../assets/windmills.png")}
              className="h-6 w-6"
            ></Image>
            <Text className="text-white font-semibold text-base">22km</Text>
          </View>

          <View className="flex-row space-x-2 items-center justify-center">
            <Image
              source={require("../assets/windmills.png")}
              className="h-6 w-6"
            ></Image>
            <Text className="text-white font-semibold text-base">22km</Text>
          </View>

          <View className="flex-row space-x-2 items-center justify-center">
            <Image
              source={require("../assets/windmills.png")}
              className="h-6 w-6"
            ></Image>
            <Text className="text-white font-semibold text-base">22km</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
