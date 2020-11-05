import React,{useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingScreen(props) {

  async function tk(props){
    const token = await AsyncStorage.getItem('token')
    if(token){
      props.navigation.replace("home")
    }else{
      props.navigation.replace("login")
    }
  }
  useEffect(()=>{ tk(props) })


  return (
    <View style={styles.loading}>
    <ActivityIndicator size="large" color="blue"/>
    </View>
  );
}
    
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
