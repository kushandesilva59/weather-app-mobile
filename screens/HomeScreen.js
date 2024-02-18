import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { theme } from "../theme";

const HomeScreen = () => {
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      <Image
        blurRadius={50}
        source={require("../assets/bg.png")}
        className="absolute h-full w-full"
      />

      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 my-6 relative z-50">
          <View
            className="flex-row justify-start items-center rounded-full"
            style={{ backgroundColor: theme.bgWhite(0.2) }}
          >
            <TextInput
              placeholder="Enter name"
              placeholderTextColor={"lightgray"}
              className="pl-2 h-10 text-base text-white"
            />

            <TouchableOpacity
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <Text>Icon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
