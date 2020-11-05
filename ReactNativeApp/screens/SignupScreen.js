import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,ToastAndroid } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpass, setcPass] = useState();
  const [err, setError]= useState('');

  // const showToast = (msg) => {
  //   ToastAndroid.show(msg,ToastAndroid.SHORT);
  // };

  const validatePassword=()=>{
    if(password === cpass)
      return true;
    else  
      return false;
  }

  sendCred= (props)=>{
    var isValid = validatePassword();
    if(isValid){

      console.log(email,password) 
      fetch("http://192.168.43.198:3000/signup",{
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
        try {
          await AsyncStorage.setItem('token', data.token)
          props.navigation.navigate("login")
        } catch (e) {
          // saving error
          console.log("Error Async Storage",e)
        }
      })
    }
    else{
      setError("Password do not match!")
    }
}



  return (
    <View style={{ marginTop: 40 }}>
      <KeyboardAvoidingView behavior="position">
        <StatusBar backgroundColor="blue" />
        <Text style={{ fontSize: 35, marginLeft: 18, marginTop: 35, color: "#3b3b3b", }}>Welcome to</Text>
        <Text style={{ fontSize: 30, marginLeft: 18, color: "blue" }}>Coders Never Quit</Text>
        <Text style={{
          fontSize: 20, marginLeft: 18,
        }}>Create new Account</Text>

        <Text>{err}</Text>

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


        <TextInput
        label="confirm password"
        mode="outlined"
        secureTextEntry={true}
        theme={{ colors: { primary: "blue" } }}
        style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        value={cpass}
        onChangeText={(text)=>setcPass(text)}
      />

        <Button
          mode="contained"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          onPress={() => sendCred(props)}>
          Signup
    </Button>

        <TouchableOpacity>
          <Text style={{ fontSize: 18, marginLeft: 18, marginTop: 20 }}
            onPress={() => props.navigation.navigate("login")}
          >
            Already have an account ?
      </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
}

