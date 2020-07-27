//
//  
//  Chat App
//  Copyright © 2020 Water Flower(waterflower12591@gmail.com). All rights reserved. 
//

import * as React from 'react';
import {Component} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  I18nManager
} from 'react-native';


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createStackNavigator();

I18nManager.allowRTL(false);

export default class App extends Component {

    constructor(props) {
        super(props);
        
    }

    UNSAFE_componentWillMount() {

    }

    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName = "SignInScreen"
                    screenOptions={({ route }) => ({
                        headerShown: false
                    })}
                    headerMode="none"
                >
                    <Stack.Screen name="SignInScreen" component={SignInScreen} />
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>

        )
    }
}
