import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/LoginScreen';
import Chat from './screens/ChatScreen';

const AppStack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator initialRouteName = "Login" screenOptions = {{headerShown: false}}>
                <AppStack.Screen name = "Login" component = {Login}/>
                <AppStack.Screen name = "Chat" component = {Chat}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )

}