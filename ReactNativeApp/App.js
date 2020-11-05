import React,{useEffect,useState} from 'react';
import { StyleSheet, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import SignupScreen from "./screens/SignupScreen"
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();


export default function App() {

  const [isLoggedin, setLogged] = useState(null)

  async function tk(){
    const token = await AsyncStorage.getItem('token')
    if(token){
      setLogged(true)
    }else{
      setLogged(false)
    }
  }
  useEffect(()=>{ tk() })

  return (
    <NavigationContainer>
    <StatusBar backgroundColor="blue" style="light"/>

      <Stack.Navigator>
        <Stack.Screen name="loading" component={LoadingScreen} />
        <Stack.Screen name="home" component={HomeScreen} />  
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

