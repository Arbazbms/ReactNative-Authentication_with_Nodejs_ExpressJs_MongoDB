import React,{useEffect,useState} from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput,Card, Title, Paragraph,Avatar } from 'react-native-paper';

export default function HomeScreen(props) {

  const [email, setEmail] = useState(); 

 fetchUser = async()=>{

  const token = await AsyncStorage.getItem("token")
  console.log("aaaaaaaaaaaaa4444444444444444a")
  fetch("http://192.168.43.198:3000/me",{
    headers:{
      Accept: "application/json",
      Authorization:`Bearer ${token}`
    }
  }).then(res=>res.json())
  .then((data)=>{
    setEmail(data.email)
  })
}

useEffect(()=>{
  fetchUser()
})

const logout = async () =>{
  AsyncStorage.removeItem("token").then(()=>{
    props.navigation.replace("login")
  })
}

  return (
    <View>
        <Text style={{fontSize:18}}>{email}</Text>
        <Button
        mode="contained"
        style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        onPress={() => logout()}>
        Logout
        </Button>

      <Card style={styles.card}>
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
    </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft:18,
    marginRight:18,
    marginTop:20
  },
});
