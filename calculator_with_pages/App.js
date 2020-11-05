import { StatusBar } from 'expo-status-bar';
import React, {useState} from'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

import { NavigationContainer} from'@react-navigation/native'
import { createStackNavigator} from'@react-navigation/stack'
const Stack = createStackNavigator();
function HomeScreen({navigation}) {
  //Setting up states - numbers and result
  const [result, setResult] = useState('');
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
 const [list, setList] = useState([]);



     const plus = () => {
     
      const [num1, num2] = [Number(n1), Number(n2) ]
      const res = num1 + num2 
      setResult(res)

      const txt = `${num1} + ${num2}  = ${res}`

      setList([...list, {key: String(list.length), text: txt}])
      
     }
     const minus = () => {
      const [num1, num2] = [Number(n1), Number(n2) ]
      const res = num1 - num2 
      setResult(res)

      const txt = `${num1} - ${num2}  = ${res}`

      setList([...list, {key: String(list.length), text: txt}])
      
     }

  return (
    <View style={styles.container}>
      <Text style={styles.res}>Result  = {result}</Text>
      <View style={styles.row}>
      <Text style={styles.txt}>Number 1</Text>
      <TextInput style ={styles.input}
      placeholder='number 1'
      keyboardType = 'number-pad'
      onChangeText={n1 => setN1(n1)}
      value = {n1}

      >
      </TextInput>
      </View>
      <View style={styles.row}>
      <Text style={styles.txt}>Number 2</Text>

      <TextInput style ={styles.input}
                placeholder='number 2'
              //  numeric value
            keyboardType = 'number-pad'
            onChangeText={n2 => setN2(n2)}
            value = {n2}

            ></TextInput>
            </View>
            <View style={styles.button}>

        <Button
          onPress={plus}

          title=" + "
          color="#0E9594"

/>
        <Button

          onPress={minus}

          title="  -  "
          color="#0E9594"
        />
        <Button 
        title="History"
        color="#0E9594"

        onPress={() => navigation.navigate("History", {history: [...list]})}/>
        </View>
       
    </View>
  );
}
 function HistoryScreen({route, navigation}) {
   const {history}= route.params
   console.log(history)
  return(
    <View style = {styles.container}>
        <Text style={styles.res}>History</Text>
        <FlatList data = {history} 
        renderItem={({item}) => <Text>{item.text}</Text>}/>
    </View>
  )
}
export default function App () {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Calculator" component={HomeScreen}/>
        <Stack.Screen name = "History" component={HistoryScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

//Creating styles for container, input field and buttons
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 5
  },
  txt: {
    justifyContent: 'center',
    padding: 5,
    width:100
  },
  res: {    
    fontWeight: 'bold',
},
  input: {
    justifyContent: 'center',
    borderWidth: 1,
      borderColor:  '#777',
      padding: 5,
      width: 100
  }, 
  button: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 185  
  }
});