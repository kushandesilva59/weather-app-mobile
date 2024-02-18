import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LogBox } from 'react-native'
import HomeScreen from "../screens/HomeScreen";

const stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Non-serilizable values were found in the navigation state']);

export default function AppNavigator(){
    return(
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
             </stack.Navigator>
        </NavigationContainer>
    )
}