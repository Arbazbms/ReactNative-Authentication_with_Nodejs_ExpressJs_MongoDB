import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, KeyboardAvoidingView,Alert } from 'react-native';
import { Button, TextInput, Dialog, Portal,Paragraph,Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err,setError] = useState(); 


  sendCred= (props)=>{
    console.log(email,password) 
    fetch("http://192.168.43.198:3000/signin",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
    }).then(res=>res.json())
    .then(async(data)=>{
      console.log(data)
      if(data.error){
        setError(data.error)
      }

      try {
        await AsyncStorage.setItem('token', data.token)
        props.navigation.replace("home")

      } catch (e) {
        // saving error
        console.log("Error Async Storage",e)
      }

    })
  }





  return (
    <View style={{marginTop:40}}>
    <KeyboardAvoidingView behavior="position">
      <Text style={{fontSize:35,marginLeft:18,marginTop:35,color:"#3b3b3b", }}>Welcome to</Text>
      <Text style={{fontSize:30,marginLeft:18,color:"blue"}}>Coders Never Quit</Text>
      <Text style={{
        fontSize:20, marginLeft:18, 
      }}>Login with email</Text>

      {err?
        <Text style={{fontSize:16,marginLeft:25,color:"red", }}>{err}</Text>: <Text></Text>}

        <TextInput
          label="Email"
          mode="outlined"
          theme={{ colors: { primary: "blue" } }}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />

        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          theme={{ colors: { primary: "blue" } }}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          value={password}
          onChangeText={(text)=>setPassword(text)}
        />

        <Button
          mode="contained"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 , backgroundColor:"blue"}}
          onPress={() => sendCred(props)}>
          Login
        </Button>

    <TouchableOpacity>
      <Text style={{fontSize:18, marginLeft:18, marginTop:20}}
      onPress={() => props.navigation.navigate("signup")}
      
      >
        Don't have an account ?
      </Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </View>
  );
}


