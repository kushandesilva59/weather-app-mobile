import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      <Text>Hiii</Text>
      <Image
        blurRadius={50}
        source={require("../assets/bg.png")}
        className="absolute h-full w-full"
      />

      
    </View>
  );
};

export default HomeScreen;
